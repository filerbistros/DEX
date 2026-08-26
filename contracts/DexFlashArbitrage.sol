// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title DexFlashArbitrage
 * @dev Production Flash Loan Arbitrage Contract for Aave V3 + Uniswap V3 / Camelot / Aerodrome / PancakeSwap
 * 
 * Execution Flow (Single Atomic Transaction):
 * 1. Request Flash Loan from Aave V3 Pool (0 upfront capital required).
 * 2. executeOperation() callback is triggered by Aave.
 * 3. Swap Token A -> Token B on DEX 1 (e.g. Camelot / Aerodrome).
 * 4. Swap Token B -> Token A on DEX 2 (e.g. Uniswap v3 / PancakeSwap) at a higher price.
 * 5. Verify that ReturnAmount >= LoanAmount + FlashLoanFee + MinProfitTarget.
 * 6. Repay Flash Loan to Aave V3.
 * 7. Transfer pure net profit to Owner wallet.
 * 
 * SAFETY FEATURE:
 * If the spread collapses before execution, the transaction automatically REVERTS.
 * You never lose your funds; only a tiny gas fee (~$0.02 on L2) is consumed.
 */

interface IERC20 {
    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function transfer(address recipient, uint256 amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
}

interface IPoolAddressesProvider {
    function getPool() external view returns (address);
}

interface IPool {
    function flashLoanSimple(
        address receiverAddress,
        address asset,
        uint256 amount,
        bytes calldata params,
        uint16 referralCode
    ) external;
}

interface IUniversalRouter {
    function exactInputSingle(
        address tokenIn,
        address tokenOut,
        uint24 fee,
        address recipient,
        uint256 amountIn,
        uint256 amountOutMinimum,
        uint160 sqrtPriceLimitX96
    ) external returns (uint256 amountOut);
}

contract DexFlashArbitrage {
    address public immutable owner;
    IPoolAddressesProvider public immutable addressesProvider;

    event ArbitrageExecuted(
        address indexed asset,
        uint256 amountBorrowed,
        uint256 feePaid,
        uint256 netProfit
    );

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call");
        _;
    }

    constructor(address _addressProvider) {
        owner = msg.sender;
        addressesProvider = IPoolAddressesProvider(_addressProvider);
    }

    /**
     * @notice Initiates a flash loan arbitrage
     * @param asset The token to borrow (e.g., WETH, USDC, USDT)
     * @param amount The loan size (e.g., 10,000 USDC)
     * @param params Encoded routing instructions (DEX routers, fees, target min profit)
     */
    function requestFlashLoan(
        address asset,
        uint256 amount,
        bytes calldata params
    ) external onlyOwner {
        address pool = addressesProvider.getPool();
        IPool(pool).flashLoanSimple(
            address(this),
            asset,
            amount,
            params,
            0
        );
    }

    /**
     * @notice Aave V3 Flash Loan Callback
     */
    function executeOperation(
        address asset,
        uint256 amount,
        uint256 premium,
        address initiator,
        bytes calldata params
    ) external returns (bool) {
        require(msg.sender == addressesProvider.getPool(), "Unauthorized Aave caller");
        require(initiator == address(this), "Unauthorized initiator");

        uint256 totalRepay = amount + premium;

        // Decode custom execution instructions
        (
            address router1,
            address router2,
            address intermediateToken,
            uint24 poolFee1,
            uint24 poolFee2,
            uint256 minProfitRequired
        ) = abi.decode(params, (address, address, address, uint24, uint24, uint256));

        // Step 1: Approve DEX 1 Router
        IERC20(asset).approve(router1, amount);

        // Step 2: Buy intermediate token on DEX 1
        uint256 intermediateAmount = IUniversalRouter(router1).exactInputSingle(
            asset,
            intermediateToken,
            poolFee1,
            address(this),
            amount,
            0,
            0
        );

        // Step 3: Approve DEX 2 Router
        IERC20(intermediateToken).approve(router2, intermediateAmount);

        // Step 4: Sell back to base asset on DEX 2
        uint256 finalAmount = IUniversalRouter(router2).exactInputSingle(
            intermediateToken,
            asset,
            poolFee2,
            address(this),
            intermediateAmount,
            totalRepay + minProfitRequired, // Will revert if profit target is not met!
            0
        );

        require(finalAmount >= totalRepay + minProfitRequired, "Arbitrage not profitable: Slippage revert");

        // Step 5: Approve repayment to Aave
        IERC20(asset).approve(address(addressesProvider.getPool()), totalRepay);

        // Step 6: Transfer pure profit to owner
        uint256 netProfit = finalAmount - totalRepay;
        IERC20(asset).transfer(owner, netProfit);

        emit ArbitrageExecuted(asset, amount, premium, netProfit);
        return true;
    }

    /**
     * @notice Emergency withdrawal of any stuck ERC20 tokens
     */
    function emergencyWithdrawToken(address token) external onlyOwner {
        uint256 balance = IERC20(token).balanceOf(address(this));
        IERC20(token).transfer(owner, balance);
    }

    /**
     * @notice Emergency withdrawal of native ETH
     */
    function emergencyWithdrawETH() external onlyOwner {
        payable(owner).transfer(address(this).balance);
    }

    receive() external payable {}
}
