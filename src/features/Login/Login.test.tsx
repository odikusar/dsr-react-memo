import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { AnyAction, Store } from 'redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { initialTestState } from 'store/test-state';
import { LoginFeature } from './Login';

const middlewares = [thunk];

describe('<LoginFeature/>', () => {
  let store: Store<unknown, AnyAction>;

  beforeAll(() => {
    const mockStore = configureStore(middlewares);
    store = mockStore(initialTestState);
  });

  it('should render Sign in title', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginFeature />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByTestId('loginPage')).toHaveTextContent('Sign in');
  });

  it('should render form input with Email label', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginFeature />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByTestId('loginPageEmail')).toHaveTextContent('Email');
  });

  it('should render form input with Password label', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginFeature />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByTestId('loginPagePassword')).toHaveTextContent(
      'Password'
    );
  });
});
