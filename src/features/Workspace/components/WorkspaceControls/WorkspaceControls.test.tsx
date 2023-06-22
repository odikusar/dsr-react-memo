import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { AnyAction, Store } from 'redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { initialTestState } from 'store/test-state';
import { WorkspaceControls } from './WorkspaceControls';

const middlewares = [thunk];

describe('<WorkspaceControls/>', () => {
  let store: Store<unknown, AnyAction>;

  beforeAll(() => {
    const mockStore = configureStore(middlewares);
    store = mockStore(initialTestState);
  });

  it('should render top level control buttons with labels', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <WorkspaceControls
            memoRow={null}
            rowsLeftCount={10}
            changeAnswerDisplayed={null}
            changeTranslationByDefault={null}
            isTranslationByDefault={false}
          />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByTestId('topLevelControls')).toHaveTextContent(
      'Show Answer'
    );
    expect(screen.getByTestId('topLevelControls')).toHaveTextContent(
      'Next Word'
    );
  });

  it('should render middle level control buttons with labels', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <WorkspaceControls
            memoRow={null}
            rowsLeftCount={10}
            changeAnswerDisplayed={null}
            changeTranslationByDefault={null}
            isTranslationByDefault={false}
          />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByTestId('middleLevelControls')).toHaveTextContent(
      'Translation by default'
    );
    expect(screen.getByTestId('middleLevelControls')).toHaveTextContent(
      'Repeat Again'
    );
  });

  it('should render bottom level control buttons with labels', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <WorkspaceControls
            memoRow={null}
            rowsLeftCount={10}
            changeAnswerDisplayed={null}
            changeTranslationByDefault={null}
            isTranslationByDefault={false}
          />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByTestId('bottomLevelControls')).toHaveTextContent(
      'Google Image'
    );
    expect(screen.getByTestId('bottomLevelControls')).toHaveTextContent(
      'Explanation'
    );
    expect(screen.getByTestId('bottomLevelControls')).toHaveTextContent(
      'Dictionary'
    );
  });
});
