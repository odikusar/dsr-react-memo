import { MemoRow } from 'models';
import { useAppDispatch } from 'store';
import {
  resetMemoRows,
  setShownMemoRowId,
} from 'store/memo-row/memo-row.slice';
import './WorkspaceControls.scss';

export function WorkspaceControls({
  memoRow,
  isTranslationByDefault,
  rowsLeftCount,
  changeAnswerDisplayed,
  changeTranslationByDefault,
}: {
  memoRow: MemoRow;
  isTranslationByDefault: boolean;
  rowsLeftCount: number;
  changeAnswerDisplayed: (value: boolean) => void;
  changeTranslationByDefault: (value: boolean) => void;
}) {
  const dispatch = useAppDispatch();

  // const { memoFiles } = props;

  // @Input() memoRow: MemoRow;
  // @Input() isPreviousMemoRowReady: boolean;
  // @Input() isTranslationByDefault: boolean;
  // @Input() rowsLeftCount: number;

  // setShownMemoRowId

  const showNext = (): void => {
    changeAnswerDisplayed(false);
    dispatch(setShownMemoRowId(memoRow.id));
    // this.memoRowFacade.isAnswerDisplayed$.next(false);
    // this.memoRowFacade.setShown(this.memoRow.id);
  };

  const showAnswer = (): void => {
    changeAnswerDisplayed(true);
    // this.memoRowFacade.isAnswerDisplayed$.next(true);
    // if (this.rowsLeftCount == 0) {
    //   this.toastr.success("Congrats that's all");
    // }
  };

  const reset = (): void => {
    dispatch(resetMemoRows());
    // this.memoRowFacade.isAnswerDisplayed$.next(true);
    // if (this.rowsLeftCount == 0) {
    //   this.toastr.success("Congrats that's all");
    // }
  };

  return (
    <div>
      <br />
      <button onClick={showNext}>Next Word</button>
      <br />
      <button onClick={showAnswer}>Show Answer</button>
      <br />
      <button onClick={reset}>Repeat Again</button>
      <br />
      <input
        type="checkbox"
        name="isTranslationByDefault"
        checked={isTranslationByDefault}
        onChange={(event) => changeTranslationByDefault(event.target.checked)}
      />
      Translation by default
      <br />
    </div>
  );
}
