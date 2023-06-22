import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { initialTestState } from 'store/test-state';
import { WorkspaceFeature } from './Workspace';

const middlewares = [thunk];

describe('<WorkspaceFeature/>', () => {
  it('contains Main Wrapper', () => {
    const mockStore = configureStore(middlewares);
    let store = mockStore(initialTestState);

    render(
      <Provider store={store}>
        <WorkspaceFeature />
      </Provider>
    );
    expect(screen.getAllByTestId('workspaceWrapper')).toBeTruthy();
  });
});
