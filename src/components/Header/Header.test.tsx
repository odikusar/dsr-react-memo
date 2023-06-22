import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Header } from './Header';

const middlewares = [thunk];

describe('<Header/>', () => {
  it('contains Header', () => {
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
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </Provider>
    );
    const testElement = screen.getByText(/Dikusar React App/i);
    expect(testElement).toBeTruthy();
    // expect(screen.getAllByTestId('mainWrapper').length).toBe(1);
    // expect(screen.getAllByTestId('mainWrapper')).toBeTruthy();
  });
});
