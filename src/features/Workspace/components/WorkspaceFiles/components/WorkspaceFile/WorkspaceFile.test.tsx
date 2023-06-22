import { render, screen } from '@testing-library/react';
import { MemoFile } from 'models';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { initialTestState } from 'store/test-state';
import { WorkspaceFile } from './WorkspaceFile';

const middlewares = [thunk];

describe('<WorkspaceFile/>', () => {
  it('contains Main Wrapper', () => {
    const mockStore = configureStore(middlewares);
    const store = mockStore(initialTestState);

    const mockedMemoFile: MemoFile = {
      id: null,
      userId: null,
      name: 'test',
      initialName: 'test.csv',
      url: 'test',
    };

    render(
      <Provider store={store}>
        <WorkspaceFile
          isActive={false}
          memoFile={mockedMemoFile}
          chooseMemoFile={null}
          deleteMemoFile={null}
          uploadMemoFile={null}
        />
      </Provider>
    );
    expect(screen.getAllByTestId('workspaceFileWrapper')).toBeTruthy();
  });
});
