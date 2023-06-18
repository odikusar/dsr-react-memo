import { DEDUCTION_COEFFICIENT, ROWS_PER_PAGE } from 'constants/index';
import { MemoRow } from 'models';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
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
  const {
    register,
    watch,
    getValues,
    formState: { errors },
    handleSubmit,
  } = useForm();

  // const watchShowAge = watch('showAge', false); // you can supply default value as second argument
  // const watchAllFields = watch(); // when pass nothing as argument, you are watching everything

  const [checkAllPages, setCheckAllPages] = useState<boolean>(true);
  const refFromRow = useRef<HTMLInputElement>(null);
  const refToRow = useRef<HTMLInputElement>(null);
  let [pages, setPages] = useState<boolean[]>([]);
  let [withFlag, setWithFlag] = useState<boolean>(false);
  // const [fromRowValue, setFromRowValue] = useState<number>(1);
  // const [toRowValue, setToRowValue] = useState<number>(1);

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
    if (pages && pages.length) {
      const selectedPages = MemoService.getSelectedPages(pages);

      const boundaryIndexes = MemoService.getBoundaryRowsIndexes(
        selectedPages,
        rowsTotalCount,
        ROWS_PER_PAGE
      );

      refFromRow.current.value = String(boundaryIndexes.firstRowIndex + 1);
      refToRow.current.value = String(boundaryIndexes.lastRowIndex + 1);

      sendSelection();
    }
  };

  const sendSelection = (): void => {
    const selectedPages = MemoService.getSelectedPages(pages);

    const selectedRowsIndexes = MemoService.getSelectedRowsIndexes(
      selectedPages,
      Number(refFromRow.current.value),
      Number(refToRow.current.value),
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

  const addUpRows = (e: any) => {
    e.preventDefault();
    refFromRow.current.value = String(
      Number(refFromRow.current.value) + DEDUCTION_COEFFICIENT
    );

    sendSelection();
  };

  const deductRows = (e: any) => {
    e.preventDefault();
    refToRow.current.value = String(
      Number(refToRow.current.value) - DEDUCTION_COEFFICIENT
    );

    sendSelection();
  };

  return (
    <div style={{ padding: '10px', margin: '10px', border: '1px solid white' }}>
      <div>
        words left: {rowsLeftCount || ''} current index: {currentMemoRowId + 1}
      </div>
      <div>
        <form>
          {pages.map((value, index) => (
            <label key={index}>
              <input
                type="checkbox"
                name="pages"
                checked={value}
                {...register(`pages.${index}`)}
                onChange={(event) =>
                  handlePageChange(index, event.target.checked)
                }
              />
              {index + 1}
            </label>
          ))}
          &nbsp;
          <input
            type="checkbox"
            checked={checkAllPages}
            {...register('checkAllPages')}
            onChange={(event) =>
              handleCheckAllPagesChange(event.target.checked)
            }
          />
          ... &nbsp;
          <input
            type="checkbox"
            name="withFlag"
            {...register('withFlag')}
            onChange={(event) => handleWithFlagChange(event.target.checked)}
          />
          With Flag
          <br />
          <button onClick={addUpRows}>+10</button>
          <input
            type="number"
            name="from"
            min={refFromRow?.current?.value}
            ref={refFromRow}
            onChange={sendSelection}
          />
          <input
            type="number"
            name="to"
            max={refToRow?.current?.value}
            ref={refToRow}
            onChange={sendSelection}
          />
          <button onClick={deductRows}>-10</button>
          <br />
        </form>
      </div>
    </div>
  );
}
