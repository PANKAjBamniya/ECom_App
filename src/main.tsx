import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';
import './index.css'
import { store } from './store/index.ts';
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
        <ToastContainer position="top-right" />

      </BrowserRouter>
    </Provider>

  </StrictMode>,
)
