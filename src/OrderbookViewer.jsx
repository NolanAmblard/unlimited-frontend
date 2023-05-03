import React, { useState, useEffect } from 'react';
import './styles/OrderbookViewer.css';

function OrderbookViewer() {
  const [orderBook, setOrderbook] = useState({
    bids: [],
    asks: []
  });
  const [midPrice, setMidPrice] = useState();

  // Example data to emulate video
  const exampleData = {
    bids: [
      { price: 0.0610, size: 52 },
      { price: 0.0609, size: 23 },
      { price: 0.0608, size: 31 },
      { price: 0.0607, size: 6 },
      { price: 0.0606, size: 2 },
      { price: 0.0605, size: 3 },
      { price: 0.0604, size: 1 },
    ],
    asks: [
      { price: 0.0612, size: 100 },
      { price: 0.0613, size: 25 },
      { price: 0.0614, size: 10 },
      { price: 0.0615, size: 5 },
      { price: 0.0616, size: 37 },
      { price: 0.0617, size: 1 },
      { price: 0.0618, size: 2 },
      { price: 0.0619, size: 1 }
    ]
  };  

  // TODO: Add smart contract event listener for orders (this should also update the orderlist)
  //       Use this to update the frontend orderbook code and give user cost estimates

  useEffect(() => {
    // TODO: Connect to smart contract to load current orderbook when page loads

    setOrderbook(exampleData);
    const firstBid = exampleData.bids[0] ? exampleData.bids[0].price : 0;
    const firstAsk = exampleData.asks[0] ? exampleData.asks[0].price : 0;
    const midPoint = (firstBid + firstAsk) / 2;
    console.log(midPoint);
    setMidPrice(midPoint);
  }, []);

  const calculateMaxSize = () => {
    const bidOrders = orderBook.bids;
    const askOrders = orderBook.asks;
    const maxBidOrder = Math.max(...bidOrders.map(order => order.size));
    const maxAskOrder = Math.max(...askOrders.map(order => order.size));
    return maxBidOrder > maxAskOrder ? maxBidOrder : maxAskOrder;
  }

  const renderRow = (items, type) => {
    const maxSize = calculateMaxSize();
    const rowStyle = {
      display: 'table-row',
    };
    const cellStyle = {
      display: 'table-cell',
      height: '30px',
      width: '10%',
      position: 'relative',
      alignItems: 'center',
      backgroundColor: '#181C27',
      border: '1px solid #2A2E39'
    };
    // #363C4E #181C27 //
    return items.map((item, index) => {
      const size = item.size;
      const percentage = size / maxSize;
      const fillStyle = {
        position: 'absolute',
        top: '0',
        bottom: '0',
        right: '0',
        width: `${percentage * 100}%`,
        backgroundColor: type === 'ask' ? 'rgba(255, 0, 0)' : 'rgba(0, 255, 0)',
        opacity: 0.3,
      };
      const rectStyle = {
        backgroundColor: type === 'ask' ? 'rgba(255, 0, 0, 1)' : 'rgba(0, 255, 0, 1)',
        position: 'relative',
      };
      const priceLabelStyle = {
        position: 'absolute',
        left: '5px',
        top: '0',
        bottom: '0',
        fontSize: '12px',
        lineHeight:'30px',
        color: type === 'ask' ? 'rgba(255, 0, 0, 1)' : 'rgba(0, 255, 0, 1)',
      };
      const sizeLabelStyle = {
        position: 'absolute',
        right: '5px',
        top: '0',
        bottom: '0',
        fontSize: '12px',
        lineHeight:'30px',
        color: type === 'ask' ? 'rgba(255, 0, 0, 1)' : 'rgba(0, 255, 0, 1)',
      };
      return (
        <tr key={index} style={rowStyle}>
          <td style={cellStyle}>
            <div style={fillStyle}></div>
            <div style={rectStyle}></div>
            <div style={priceLabelStyle}>{item.price?.toFixed(4)}</div>
            <div style={sizeLabelStyle}>{item.size?.toFixed(2)}</div>
          </td>
        </tr>
      );
    });
  };

const renderTitleRow = () => {
    const rowStyle = {
      display: 'table-row',
    };
    const cellStyle = {
      display: 'table-cell',
      height: '15px',
      position: 'relative',
      color: 'white',
    };
    const priceLabelStyle = {
      position: 'absolute',
      left: '5px',
      fontSize: '10px',
      lineHeight: '0px',
    };
    const sizeLabelStyle = {
      position: 'absolute',
      right: '5px',
      fontSize: '10px',
      lineHeight: '0px',
    };
    return(
    <tr style={rowStyle}>
      <td style={cellStyle}>
        <div style={priceLabelStyle}>Price</div>
        <div style={sizeLabelStyle}>Qty</div>
      </td>
    </tr>
    );
  }

  const tableStyle = {
    borderCollapse: 'collapse',
  };

  return (
    <table style={tableStyle}>
      <tbody>
        <h3 className="orderbook-title">Orderbook</h3>
        {renderTitleRow()}
        {renderRow(orderBook.asks.slice(0,7).reverse(), 'ask')}
        <p className="midpoint-price">{midPrice?.toFixed(5)}</p>
        {renderRow(orderBook.bids.slice(0,7), 'bid')}
      </tbody>
    </table>
  );
}

export default OrderbookViewer;