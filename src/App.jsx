import { createContext, useState } from "react";
import logo from './unlimited_logo_light.png';
import './styles/App.css';
import TradingViewWidget from './TradingViewWidget';
import OrderForm from './OrderForm';
import OrderbookViewer from './OrderbookViewer';
import OrderList from './OrderList';
import Footer from './Footer';
import ConnectWallet from './ConnectWallet';

const defaultValue = {
  metamaskAccountAddress: '',
  setMetamaskAccountAddress: (newValue) => { },
}
export const GlobalAppContext = createContext(defaultValue);

function App() {
  
  const [metamaskAccountAddress, setMetamaskAccountAddress] = useState('');

  return (
    <GlobalAppContext.Provider
      value={{
        metamaskAccountAddress,
        setMetamaskAccountAddress
      }}
    >
    <div className="App">
      <header className="App-header">
        <div className="header-container">
          <img src={logo} className="App-logo" alt="logo" />
          <div className="connect-wallet">
            <ConnectWallet/>
          </div>
        </div>
      </header>
      <body>
        <div className="container">
          <div className="left-column">
            {/* <div> */}
              <TradingViewWidget />
              {/* <OrderHistory /> */}
            {/* </div> */}
          </div>
          <div className="middle-column">
            <OrderbookViewer/>
          </div>
          <div className="right-column">
            <OrderForm/>
            <OrderList/>
          </div>
        </div>
      </body>
      <footer>
        <Footer/>
      </footer>
    </div>
    </GlobalAppContext.Provider>
  );
}

export default App;
