import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { App } from './App';
import './index.scss';
import { store } from './store/store';

const container = document.getElementById('root')!;
const root = createRoot(container);
/* <StrictMode> </StrictMode> */
root.render(
  <Provider store={store}>
    <App />
    <ToastContainer />
  </Provider>
);
