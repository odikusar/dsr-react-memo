import { Box, Button, Checkbox, FormControlLabel } from '@mui/material';
import {
  DICTIONARY_LINK,
  EXPLANATION_LINK,
  GOOGLE_IMAGE_LINK,
} from 'constants/index';
import { MemoRow } from 'models';
import { toast } from 'react-toastify';
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

  const showNext = (): void => {
    if (!rowsLeftCount) {
      return;
    }

    changeAnswerDisplayed(false);
    dispatch(setShownMemoRowId(memoRow.id));
  };

  const showAnswer = (): void => {
    changeAnswerDisplayed(true);

    if (rowsLeftCount <= 1) {
      toast.success("Congrats that's all");
    }
  };

  const reset = (): void => {
    dispatch(resetMemoRows());
    changeAnswerDisplayed(false);
  };

  const openDictionary = (): void => {
    openInNewTab(`${DICTIONARY_LINK}${memoRow.word}`);
  };

  const openExplanation = (): void => {
    openInNewTab(`${EXPLANATION_LINK}${memoRow.word}`);
  };

  const openImage = (): void => {
    openInNewTab(`${GOOGLE_IMAGE_LINK}${memoRow.word}`);
  };

  const openInNewTab = (href: string): void => {
    Object.assign(document.createElement('a'), {
      target: '_blank',
      href,
    }).click();
  };

  return (
    <>
      <Box className="dsr-control-row" data-testid="topLevelControls">
        <Button
          className="dsr-control-btn dsr-link-btn"
          variant="outlined"
          onClick={showAnswer}
        >
          Show Answer
        </Button>
        <Button
          className="dsr-control-btn dsr-link-btn dsr-control-btn__next"
          variant="outlined"
          onClick={showNext}
        >
          Next Word
        </Button>
      </Box>
      <Box className="dsr-control-row" data-testid="middleLevelControls">
        <FormControlLabel
          control={
            <Checkbox
              name="isTranslationByDefault"
              checked={isTranslationByDefault}
              onChange={(event) =>
                changeTranslationByDefault(event.target.checked)
              }
              color="primary"
            />
          }
          label="Translation by default"
        />
        <Button
          className="dsr-control-btn dsr-link-btn"
          variant="outlined"
          onClick={reset}
        >
          Repeat Again
        </Button>
      </Box>
      <Box className="dsr-control-row" data-testid="bottomLevelControls">
        <Button
          variant="outlined"
          className="dsr-control-btn dsr-link-btn"
          onClick={openImage}
        >
          Google Image
        </Button>

        <Button
          variant="outlined"
          className="dsr-control-btn dsr-link-btn"
          onClick={openExplanation}
        >
          Explanation
        </Button>

        <Button
          variant="outlined"
          className="dsr-control-btn dsr-link-btn"
          onClick={openDictionary}
        >
          Dictionary
        </Button>
      </Box>
    </>
  );
}
