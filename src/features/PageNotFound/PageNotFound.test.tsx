import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { AnyAction, Store } from 'redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { initialTestState } from 'store/test-state';
import { PageNotFoundFeature } from './PageNotFound';

const middlewares = [thunk];

describe('<PageNotFoundFeature/>', () => {
  let store: Store<unknown, AnyAction>;

  beforeAll(() => {
    const mockStore = configureStore(middlewares);
    store = mockStore(initialTestState);
  });

  it('should render sorry text', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <PageNotFoundFeature />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByTestId('sorryText')).toHaveTextContent(
      'Sorry, page not found'
    );
  });
});
