import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
} from '@mui/material';
import { DEDUCTION_COEFFICIENT, ROWS_PER_PAGE } from 'constants/index';
import { MemoRow } from 'models';
import { useEffect, useRef, useState } from 'react';
import { useAppDispatch } from 'store';
import { setMemoRowsSelection } from 'store/memo-row/memo-row.slice';
import { MemoService } from 'utils/memo.service';
import './WorkspacePagination.scss';

export function WorkspacePagination({
  rowsTotalCount,
  currentMemoRowId,
  rowsLeftCount,
  memoRows,
}: {
  rowsTotalCount: number;
  currentMemoRowId: number;
  rowsLeftCount: number;
  memoRows: MemoRow[];
}) {
  const dispatch = useAppDispatch();
  const [checkAllPages, setCheckAllPages] = useState<boolean>(true);
  const refFromRow = useRef<HTMLInputElement>(null);
  const refToRow = useRef<HTMLInputElement>(null);
  const [fromRowValue, setFromRowValue] = useState<number>(1);
  const [toRowValue, setToRowValue] = useState<number>(1);
  let [pages, setPages] = useState<boolean[]>([]);
  let [withFlag, setWithFlag] = useState<boolean>(false);

  useEffect(() => {
    handlePagesChange();
  }, [pages]);

  useEffect(() => {
    if (rowsTotalCount > 0) {
      pages = new Array(getPagesCount()).fill(true);
      setPages(pages);

      if (withFlag) {
        handleWithFlagChange(withFlag);
      }

      if (!pages.find((isSelected) => !isSelected)) {
        setCheckAllPages(true);
      }
    }
  }, [rowsTotalCount]);

  const getPagesCount = (): number => {
    return !rowsTotalCount || rowsTotalCount < ROWS_PER_PAGE
      ? 1
      : Math.ceil(rowsTotalCount / ROWS_PER_PAGE);
  };

  const handlePagesChange = () => {
    if (!!pages && pages.length) {
      const selectedPages = MemoService.getSelectedPages(pages);
      const boundaryIndexes = MemoService.getBoundaryRowsIndexes(
        selectedPages,
        rowsTotalCount,
        ROWS_PER_PAGE
      );
      const firstRowValue = boundaryIndexes.firstRowIndex + 1 || 0;
      const lastRowValue = boundaryIndexes.lastRowIndex + 1 || 0;

      setFromRowValue(firstRowValue);
      setToRowValue(lastRowValue);

      refFromRow.current.value = String(firstRowValue);
      refToRow.current.value = String(lastRowValue);

      dispatchSelection();
    }
  };

  const dispatchSelection = (): void => {
    const selectedPages = MemoService.getSelectedPages(pages);
    const selectedRowsIndexes = MemoService.getSelectedRowsIndexes(
      selectedPages,
      Number(refFromRow.current.value) - 1,
      Number(refToRow.current.value) - 1,
      ROWS_PER_PAGE
    );

    dispatch(setMemoRowsSelection({ selectedRowsIndexes, withFlag }));
  };

  const handlePageChange = (index: number, isChecked: boolean) => {
    pages[index] = isChecked;
    setPages([...pages]);
    setCheckAllPages(!pages.some((value) => value === false));
  };

  const handleCheckAllPagesChange = (isChecked: boolean) => {
    setCheckAllPages(isChecked);
    setPages(pages.map(() => isChecked));
  };

  const handleWithFlagChange = (isChecked: boolean) => {
    withFlag = isChecked;
    setWithFlag(isChecked);

    const flaggedMemoRowIds = memoRows
      .filter((memoRow) => !!memoRow.flag)
      .map((memoRow) => memoRow.id);

    const pagesWithRows = MemoService.getPagesWithRows(
      MemoService.getSelectedPages(pages),
      flaggedMemoRowIds,
      ROWS_PER_PAGE
    );

    pages = pages.map((value, id) => pagesWithRows.indexOf(id) !== -1);
    setPages(pages);

    if (pagesWithRows.length !== pages.length) {
      setCheckAllPages(false);
    }

    handlePagesChange();
  };

  const addUpRows = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    refFromRow.current.value = String(
      Number(refFromRow.current.value) + DEDUCTION_COEFFICIENT
    );

    dispatchSelection();
  };

  const deductRows = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    refToRow.current.value = String(
      Number(refToRow.current.value) - DEDUCTION_COEFFICIENT
    );

    dispatchSelection();
  };

  return (
    <>
      <Box className="dsr-pages-top-panel">
        <div>words left:</div>
        <div className="dsr-pages-counter dsr-pages-counter_first">
          {rowsLeftCount || ''}
        </div>
        <div>current index:</div>
        <div className="dsr-pages-counter">{currentMemoRowId + 1}</div>
        <div className="dsr-pages-flag">
          <FormControlLabel
            control={
              <Checkbox
                name="withFlag"
                onChange={(event) => handleWithFlagChange(event.target.checked)}
                color="primary"
              />
            }
            label="with flag"
          />
        </div>
      </Box>
      <form>
        <Box className="dsr-pages-list">
          <div className="dsr-page-item dsr-pages-caption dsr-hide-for-small">
            pages:
          </div>
          {pages.map((value, index) => (
            <FormControlLabel
              key={index}
              name="pages"
              labelPlacement="top"
              control={
                <Checkbox
                  checked={value}
                  name="checkAllPages"
                  onChange={(event) =>
                    handlePageChange(index, event.target.checked)
                  }
                />
              }
              label={index + 1}
            />
          ))}
          <FormControlLabel
            className="dsr-all-pages"
            labelPlacement="top"
            control={
              <Checkbox
                name="checkAllPages"
                checked={checkAllPages}
                onChange={(event) =>
                  handleCheckAllPagesChange(event.target.checked)
                }
              />
            }
            label="..."
          />
        </Box>
        <Box className="dsr-bounds">
          <Button
            className="dsr-bounds__btn"
            variant="outlined"
            onClick={addUpRows}
          >
            + {DEDUCTION_COEFFICIENT}
          </Button>
          <TextField
            className="dsr-bound-input"
            label="From"
            type="number"
            name="from"
            inputRef={refFromRow}
            InputLabelProps={{ shrink: true }}
            InputProps={{
              inputProps: {
                max: toRowValue,
                min: fromRowValue,
              },
            }}
            onChange={dispatchSelection}
          />

          <TextField
            className="dsr-bound-input"
            label="To"
            type="number"
            name="to"
            inputRef={refToRow}
            InputLabelProps={{ shrink: true }}
            InputProps={{
              inputProps: {
                max: toRowValue,
                min: fromRowValue,
              },
            }}
            onChange={dispatchSelection}
          />

          <Button
            className="dsr-bounds__btn"
            variant="outlined"
            onClick={deductRows}
            disabled={DEDUCTION_COEFFICIENT >= rowsLeftCount}
          >
            - {DEDUCTION_COEFFICIENT}
          </Button>
        </Box>
      </form>
    </>
  );
}
