import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { initialTestState } from 'store/test-state';
import { WorkspaceFiles } from './WorkspaceFiles';

const middlewares = [thunk];

describe('<WorkspaceFiles/>', () => {
  it('contains Main Wrapper', () => {
    const mockStore = configureStore(middlewares);
    let store = mockStore(initialTestState);

    render(
      <Provider store={store}>
        <WorkspaceFiles
          activeMemoFileId={null}
          memoFiles={[]}
          currentUserId={null}
          isDemoUser={true}
        />
      </Provider>
    );
    expect(screen.getAllByTestId('workspaceFilesWrapper')).toBeTruthy();
  });
});
