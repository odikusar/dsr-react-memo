import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { App } from './App';

const middlewares = [thunk];

describe('<App/>', () => {
  it('contains Main Wrapper', () => {
    const initialState: any = {
      auth: {
        user: null,
        isInitialized: false,
        isLoading: false,
        error: null,
        isAuthorized: false,
      },
      theme: { isDarkTheme: true },
      memoFile: {
        memoFiles: [],
        isLoading: false,
        error: null,
      },
      memoRow: {
        lastShownId: null,
        isLoading: false,
        memoRows: null,
      },
    };

    const mockStore = configureStore(middlewares);
    let store;
    store = mockStore(initialState);

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    // const linkElement = screen.getByText(/Dikusar React App/i);
    // expect(linkElement).toBeInTheDocument();
    // expect(screen.getAllByTestId('mainWrapper').length).toBe(1);
    expect(screen.getAllByTestId('mainWrapper')).toBeTruthy();
  });
});
