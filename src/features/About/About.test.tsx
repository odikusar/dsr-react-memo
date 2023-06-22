import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { AnyAction, Store } from 'redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { initialTestState } from 'store/test-state';
import { AboutFeature } from './About';

const middlewares = [thunk];

describe('<AboutFeature/>', () => {
  let store: Store<unknown, AnyAction>;

  beforeAll(() => {
    const mockStore = configureStore(middlewares);
    store = mockStore(initialTestState);
  });

  it('should render text about application', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <AboutFeature />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByTestId('aboutPage')).toHaveTextContent(
      'This application helps to work'
    );
  });
});
