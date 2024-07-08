import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ThemeProvider } from "@material-tailwind/react";
import { Provider } from 'react-redux';
import { Store } from './Store/Store.js';

ReactDOM.createRoot(document.getElementById('root')).render(
 <Provider store={Store}> 
 <React.StrictMode>
    <ThemeProvider >
    <App />
    </ThemeProvider>
  
  </React.StrictMode>
  </Provider>,
)
