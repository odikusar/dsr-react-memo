import { MemoRow } from 'models';
import './WorkspaceCard.scss';

export function WorkspaceCard({
  memoRow,
  isTranslationByDefault,
  isAnswerDisplayed,
}: {
  memoRow: MemoRow;
  isTranslationByDefault: boolean;
  isAnswerDisplayed: boolean;
}) {
  return (
    <div className="dsr-card-wrapper">
      <div className="dsr-card">
        <div className="dsr-card-word" data-testid="cardWord">
          {(!isTranslationByDefault || isAnswerDisplayed) && (
            <span>{memoRow?.word}</span>
          )}
        </div>
        <hr />
        <div className="dsr-card-word" data-testid="cardTranslate">
          {(isTranslationByDefault || isAnswerDisplayed) && (
            <span>{memoRow?.translate}</span>
          )}
        </div>
      </div>
    </div>
  );
}
