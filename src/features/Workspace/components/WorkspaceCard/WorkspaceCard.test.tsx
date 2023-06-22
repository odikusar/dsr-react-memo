import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { AnyAction, Store } from 'redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { initialTestState } from 'store/test-state';
import { WorkspaceCard } from './WorkspaceCard';

const middlewares = [thunk];

describe('<WorkspaceCard/>', () => {
  let store: Store<unknown, AnyAction>;

  beforeAll(() => {
    const mockStore = configureStore(middlewares);
    store = mockStore(initialTestState);
  });

  it('contains memo row word', () => {
    render(
      <Provider store={store}>
        <WorkspaceCard
          memoRow={
            { translate: 'translate text', word: 'some word text' } as any
          }
          isAnswerDisplayed={true}
          isTranslationByDefault={false}
        />
      </Provider>
    );

    expect(screen.getByTestId('cardWord')).toHaveTextContent('some word text');
  });

  it('contains memo row translation', () => {
    render(
      <Provider store={store}>
        <WorkspaceCard
          memoRow={
            { translate: 'translation text', word: 'some word text' } as any
          }
          isAnswerDisplayed={true}
          isTranslationByDefault={false}
        />
      </Provider>
    );

    expect(screen.getByTestId('cardTranslate')).toHaveTextContent(
      'translation text'
    );
  });
});
