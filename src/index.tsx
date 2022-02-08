import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { App } from 'App';
import QuickStart from 'components/QuickStart';
import { store } from 'redux/index';
import reportWebVitals from 'reportWebVitals';
import { I18nProvider } from 'i18n/i18nProvider';
import { getLibrary } from 'services/web3/wallet/utils';
import { Web3ReactProvider } from '@web3-react/core';
import { MoralisProvider } from 'react-moralis';
import 'antd/dist/antd.css';
import 'styles/index.css';

const APP_ID = process.env.REACT_APP_MORALIS_APPLICATION_ID;
const SERVER_URL = process.env.REACT_APP_MORALIS_SERVER_URL;

const Application = () => {
  const isServerInfo = APP_ID && SERVER_URL ? true : false;
  //Validate
  if (!APP_ID || !SERVER_URL)
    throw new Error(
      'Missing Moralis Application ID or Server URL. Make sure to set your .env file.'
    );
  if (isServerInfo)
    return (
      <MoralisProvider
        appId={APP_ID}
        serverUrl={SERVER_URL}
        initializeOnMount={true}
      >
        <StrictMode>
          <App isServerInfo />
        </StrictMode>
      </MoralisProvider>
    );
  else {
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <QuickStart />
      </div>
    );
  }
};

ReactDOM.render(
  <Provider store={store}>
    <I18nProvider>
      <Web3ReactProvider getLibrary={getLibrary}>
        <Application />
      </Web3ReactProvider>
    </I18nProvider>
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();

