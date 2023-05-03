import React from 'react';
import './styles/OrderList.css';

function OrderList() {

  // TODO: Add smart contract event listener for orders
  // Add orders to list if the address in the event matches the connected address
  // In the future add a database to store past trades for a user?

  return (
    <div className="orderlist">
      <h3 className="orderlist-title">Order History</h3>
      <table>
        <thead className="orderlist-table-head">
          <tr>
            <th>ID</th>
            <th>Time UTC</th>
            <th>Side</th>
            <th>Price</th>
            <th>Size</th>
          </tr>
        </thead>
        <tbody>
          {/* Example data added to emulate video */}
          <tr>
            <td>1</td>
            <td>12:01</td>
            <td>B</td>
            <td>0.061</td>
            <td>7</td>
          </tr>
          <tr>
            <td>2</td>
            <td>12:03</td>
            <td>S</td>
            <td>0.0622</td>
            <td>11</td>
          </tr>
          <tr>
            <td>3</td>
            <td>12:07</td>
            <td>B</td>
            <td>0.065</td>
            <td>48</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default OrderList;
