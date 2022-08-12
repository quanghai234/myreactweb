import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import {createStore,combineReducers} from 'redux';
import CardRedux from './reducer/card';
import { ToastContainer } from 'react-toastify';
import { persistStore,persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import App from './App';
import WishListRedux from './reducer/wishlist';


const persistConfig={
  key:'persist-key',
  storage
}

const rootReducer = combineReducers({cart:CardRedux,wishlist:WishListRedux})

const persistedReducer = persistReducer(persistConfig,rootReducer)

const store = createStore(persistedReducer)

const persistor = persistStore(store)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    <Provider store={store}>
      <PersistGate persistor={persistor}>

        <BrowserRouter>

          <ToastContainer
          autoClose={2000}/>
          <App />
        
        </BrowserRouter>

      </PersistGate>
    </Provider>
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
