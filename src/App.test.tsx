import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { initialTestState } from 'store/test-state';
import { App } from './App';

const middlewares = [thunk];

describe('<App/>', () => {
  it('contains Main Wrapper', () => {
    const mockStore = configureStore(middlewares);
    let store = mockStore(initialTestState);

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(screen.getAllByTestId('mainWrapper')).toBeTruthy();
  });
});
