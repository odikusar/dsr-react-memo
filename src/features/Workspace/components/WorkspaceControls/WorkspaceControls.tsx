import { MemoRow } from 'models';
import { useAppDispatch } from 'store';
import { setShownMemoRowId } from 'store/memo-row/memo-row.slice';
import './WorkspaceControls.scss';

export function WorkspaceControls({
  memoRow,
  isTranslationByDefault,
  rowsLeftCount,
  changeIsAnswerDisplayed,
}: {
  memoRow: MemoRow;
  isTranslationByDefault: boolean;
  rowsLeftCount: number;
  changeIsAnswerDisplayed: (value: boolean) => void;
}) {
  const dispatch = useAppDispatch();

  // const { memoFiles } = props;

  // @Input() memoRow: MemoRow;
  // @Input() isPreviousMemoRowReady: boolean;
  // @Input() isTranslationByDefault: boolean;
  // @Input() rowsLeftCount: number;

  // setShownMemoRowId

  const showNext = (): void => {
    changeIsAnswerDisplayed(false);
    dispatch(setShownMemoRowId(memoRow.id));
    // this.memoRowFacade.isAnswerDisplayed$.next(false);
    // this.memoRowFacade.setShown(this.memoRow.id);
  };

  const showAnswer = (): void => {
    changeIsAnswerDisplayed(true);
    // this.memoRowFacade.isAnswerDisplayed$.next(true);
    // if (this.rowsLeftCount == 0) {
    //   this.toastr.success("Congrats that's all");
    // }
  };

  return (
    <div>
      <button onClick={showNext}>Next Word</button>
      <br />
      <br />
      <button onClick={showAnswer}>Show Answer</button>
    </div>
  );
}
