import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import './index.css'
import ContextProvider from './components/Util/global.context.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
     <ContextProvider>
       <App/>
    </ContextProvider>
  </BrowserRouter>
)
