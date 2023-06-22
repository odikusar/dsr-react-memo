import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { AnyAction, Store } from 'redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { initialTestState } from 'store/test-state';
import { WorkspacePagination } from './WorkspacePagination';

const middlewares = [thunk];

describe('<WorkspacePagination/>', () => {
  let store: Store<unknown, AnyAction>;

  beforeAll(() => {
    const mockStore = configureStore(middlewares);
    store = mockStore(initialTestState);
  });

  it('should render panel with labels', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <WorkspacePagination
            rowsTotalCount={10}
            currentMemoRowId={1}
            rowsLeftCount={1}
            memoRows={[]}
          />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByTestId('pagesTopPanel')).toHaveTextContent(
      'words left:'
    );
    expect(screen.getByTestId('pagesTopPanel')).toHaveTextContent(
      'current index:'
    );
    expect(screen.getByTestId('pagesTopPanel')).toHaveTextContent('with flag');
  });
});
