import React, { useState, useContext } from 'react';
import './styles/OrderTypeButtons.css';
import './styles/OrderForm.css';

// const { ethers } = require("hardhat");

function OrderForm() {
  const [limitPrice, setLimitPrice] = useState('');
  const [limitSize, setLimitSize] = useState('');
  const [fokPrice, setFokPrice] = useState('');
  const [fokSize, setFokSize] = useState('');
  const [iocPrice, setIocPrice] = useState('');
  const [iocSize, setIocSize] = useState('');
  const [marketSize, setMarketSize] = useState('');
  const [orderType, setOrderType] = useState("Market");
  const [orderSide, setOrderSideButton] = useState('Long');

  const tokenBuy = "HBAR";  // token1
  const tokenQuote = "USDC";  // token2

  const handleOrderSideClick = (orderSide) => {
    setOrderSideButton(orderSide);
  };

  const handleOrderTypeClick = (newOrderType) => {
    setOrderType(newOrderType);
  };

  /// TODO: Finish the logic below and connect it to the smart contract.
  ///       Simply call the contract using the appropriate methods
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Code to send the order goes here
    // let market;
    // if (!metamaskAccountAddress) {
    //   console.log('No wallet connected, connect your wallet!');
    // } else {
    //   market = await ethers.getContractAt("TestingMarket", "0x806AeF673874c226AB2BF1A3af9686Ed345829Ff", metamaskAccountAddress);
    // }

    // switch(orderType) {
    //   case "Market":
    //     if (orderSide === 'Long') {
    //       await market.take(marketSize * 1e18, 0);  // TO FIX: assumes 18 decimals
    //     } else {  // orderSide === 'Short'
    //       await market.take(marketSize * 1e18, 1);
    //     }
    //     break;
    //   case "Limit":
    //     if (orderSide === 'Long') {
    //       const token1Amt = limitSize * 1e18;
    //       const token2Amt = limitSize * limitPrice * 1e18;
    //       const insertPosition = 0;  // TODO: Add code to calculate this
    //       await market.makerOrder(token1Amt, token2Amt, 0, insertPosition);
    //     } else {  // orderSide === 'Short'
    //       const token1Amt = limitSize * limitPrice * 1e18;
    //       const token2Amt = limitSize * 1e18;
    //       const insertPosition = 0;  // TODO: Add code to calculate this
    //       await market.makerOrder(token1Amt, token2Amt, 1, insertPosition);
    //     }
    //     break;
    //   case "FoK":
    //     if (orderSide === 'Long') {
    //       const token1Amt = limitSize * 1e18;
    //       const token2Amt = limitSize * limitPrice * 1e18;
    //       await market.fillOrKill(token1Amt, token2Amt, 0);
    //     } else {  // orderSide === 'Short'
    //       const token1Amt = limitSize * limitPrice * 1e18;
    //       const token2Amt = limitSize * 1e18;
    //       await market.fillOrKill(token1Amt, token2Amt, 1);
    //     }
    //     break;
    //   case "IoC":
    //     if (orderSide === 'Long') {
    //       const token1Amt = limitSize * 1e18;
    //       const token2Amt = limitSize * limitPrice * 1e18;
    //       await market.immediateOrCancel(token1Amt, token2Amt, 0);
    //     } else {  // orderSide === 'Short'
    //       const token1Amt = limitSize * limitPrice * 1e18;
    //       const token2Amt = limitSize * 1e18;
    //       await market.immediateOrCancel(token1Amt, token2Amt, 1);
    //     }
    //     break;
    //   default:
    //     console.log('ERROR: Unexpected order type');
    // }
  };

  return (
    <>
    <form className="orderform" onSubmit={handleSubmit}>
      <div className="order-buttons">
        <div className="orderside-container">
            <button
                className={`long-${orderSide === 'Long' ? 'active' : ''}`}
                onClick={() => handleOrderSideClick('Long')}
            >
                Buy
            </button>
            <button
                className={`short-${orderSide === 'Short' ? 'active' : ''}`}
                onClick={() => handleOrderSideClick('Short')}
            >
                Sell
            </button>
        </div>
      </div>
      <div className="order-types">
        <div className="order-type-buttons">
          <button
              onClick={() => handleOrderTypeClick("Market")}
              className={orderType === "Market" ? "active" : ""}
          >
              Market
          </button>
          <button
              onClick={() => handleOrderTypeClick("Limit")}
              className={orderType === "Limit" ? "active" : ""}
          >
              Limit
          </button>
          <div className="dropdown">
              <button
                  className={`${orderType === "FoK" || orderType === "IoC" ? "active" : ""}`}
              >
              {orderType === "IoC" ? "IoC" : "FoK"} <i className="fa fa-caret-down"></i>
              </button>
              <div className="dropdown-content">
                  <button onClick={() => handleOrderTypeClick("FoK")}>FoK</button>
                  <button onClick={() => handleOrderTypeClick("IoC")}>IoC</button>
              </div>
          </div>
        </div>
      </div>
      {orderType === 'Limit' &&
        <div className="limit-order-form">
          <div className="num-input-container">
            <input
              type="number"
              className="num-input"
              placeholder="Price"
              value={limitPrice}
              onChange={(event) => setLimitPrice(event.target.value)}
              min="0"
            />
            <div className="token-text">{orderSide === 'Long' ? tokenQuote : tokenBuy}</div>
          </div>
          <div className="num-input-container">
            <input
              type="number"
              className="num-input"
              placeholder="Size"
              value={limitSize}
              onChange={(event) => setLimitSize(event.target.value)}
              min="0"
            />
            <div className="token-text">{orderSide === 'Long' ? tokenBuy : tokenQuote}</div>
          </div>
        </div>
      }
      {orderType === 'Market' &&
        <div className="market-order-form">
          <div className="num-input-container">
            <input
              type="number"
              className="num-input"
              placeholder="Size"
              value={marketSize}
              onChange={(event) => setMarketSize(event.target.value)}
              min="0"
            />
            <div className="token-text">{orderSide === 'Long' ? tokenBuy : tokenQuote}</div>
          </div>
        </div>
      }
      {orderType === 'FoK' &&
        <div className="fok-order-form">
          <div className="num-input-container">
            <input
              type="number"
              className="num-input"
              placeholder="Price"
              value={fokPrice}
              onChange={(event) => setFokPrice(event.target.value)}
              min="0"
            />
            <div className="token-text">{orderSide === 'Long' ? tokenQuote : tokenBuy}</div>
          </div>
          <div className="num-input-container">
            <input
              type="number"
              className="num-input"
              placeholder="Size"
              value={fokSize}
              onChange={(event) => setFokSize(event.target.value)}
              min="0"
            />
            <div className="token-text">{orderSide === 'Long' ? tokenBuy : tokenQuote}</div>
          </div>
        </div>
      }
      {orderType === 'IoC' &&
        <div className="ioc-order-form">
          <div className="num-input-container">
            <input
              type="number"
              className="num-input"
              placeholder="Price"
              value={iocPrice}
              onChange={(event) => setIocPrice(event.target.value)}
              min="0"
            />
            <div className="token-text">{orderSide === 'Long' ? tokenQuote : tokenBuy}</div>
          </div>
          <div className="num-input-container">
            <input
              type="number"
              className="num-input"
              placeholder="Size"
              value={iocSize}
              onChange={(event) => setIocSize(event.target.value)}
              min="0"
            />
            <div className="token-text">{orderSide === 'Long' ? tokenBuy : tokenQuote}</div>
          </div>
        </div>
      }
      <button className='order-submit-button' type="submit">Send Order</button>
    </form>
    </>
  );
}

export default OrderForm;
