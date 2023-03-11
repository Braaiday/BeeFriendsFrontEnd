import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Redux
import { Provider } from 'react-redux';
import store from './store';

// Style
import "./Style/custom.scss"
import { ThemeProvider } from './Style/ThemeContext/ThemeProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <React.StrictMode>
    <ThemeProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);