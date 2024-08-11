// routes setup 
import { BrowserRouter as Router } from 'react-router-dom';

// required imports
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux';
import store from './redux/store.js';
import { Toaster } from 'react-hot-toast';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <Provider store={store}>
    <Router>
      <App />
      <Toaster position='top-right'/>
    </Router>
    </Provider>
  </React.StrictMode>,
)
