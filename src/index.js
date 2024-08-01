import React from 'react';
import App from './App';
import './styles/index.css';
import store from 'provider/store';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import 'react-phone-input-2/lib/style.css';
import 'react-datepicker/dist/react-datepicker.css';
import { StyledSnackbarProvider } from 'styles/global';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StyledSnackbarProvider
    autoHideDuration={4000}
    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
  >
    <Provider store={store}>
      <App />
    </Provider>
  </StyledSnackbarProvider>
);
