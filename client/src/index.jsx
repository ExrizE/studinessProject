import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './context/AuthProvider'

ReactDOM.render(
        <React.StrictMode>
          <BrowserRouter>
            <AuthProvider>
              <Routes>
                <Route path="/*" element={<App />} />
              </Routes>
            </AuthProvider>
          </BrowserRouter>
        </React.StrictMode>,
   document.getElementById("root"));

reportWebVitals();
