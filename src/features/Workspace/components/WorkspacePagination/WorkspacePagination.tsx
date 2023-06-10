import { ROWS_PER_PAGE } from 'constants/index';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from 'store';
import { setMemoRowsSelection } from 'store/memo-row/memo-row.slice';
import { MemoService } from 'utils/memo.service';
import './WorkspacePagination.scss';

export function WorkspacePagination({
  rowsTotalCount,
  currentMemoRowId,
  rowsLeftCount,
}: {
  rowsTotalCount: number;
  currentMemoRowId: number;
  rowsLeftCount: number;
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

  let [pages, setPages] = useState<boolean[]>([]);
  let [checkAllPages, setCheckAllPages] = useState<boolean>(true);
  let [withFlag, setWithFlag] = useState<boolean>(false);

  const getPagesCount = (): number => {
    return !rowsTotalCount || rowsTotalCount < ROWS_PER_PAGE
      ? 1
      : Math.ceil(rowsTotalCount / ROWS_PER_PAGE);
  };

  const onFormChange = () => {
    if (pages && pages.length) {
      // console.log(getValues());
      // console.log(pages);
      const selectedPages = MemoService.getSelectedPages(pages);

      const boundaryIndexes = MemoService.getBoundaryRowsIndexes(
        selectedPages,
        rowsTotalCount,
        ROWS_PER_PAGE
      );

      const selectedRowsIndexes = MemoService.getSelectedRowsIndexes(
        selectedPages,
        boundaryIndexes.firstRowIndex, //formValue.from - 1,
        boundaryIndexes.lastRowIndex, //formValue.to - 1,
        ROWS_PER_PAGE
      );
      // console.log(selectedRowsIndexes);
      dispatch(setMemoRowsSelection({ selectedRowsIndexes, withFlag }));
    }
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

    setWithFlag(withFlag);
    onFormChange();
  };

  useEffect(() => {
    onFormChange();
  }, [pages]);

  // useEffect(() => {
  //   const subscription = watch(() => onFormChange());
  //   return () => subscription.unsubscribe();
  // }, [watch]);

  useEffect(() => {
    if (rowsTotalCount > 0) {
      setPages(new Array(getPagesCount()).fill(true));

      // console.info(pages);
      // console.info(rowsTotalCount);
    }
  }, [rowsTotalCount]);

  const rainbow = 'red orange yellow green blue indigo violet'.split(' ');

  return (
    <div style={{ padding: '10px', margin: '10px', border: '1px solid white' }}>
      <div>
        words left: {rowsLeftCount || ''} current index: {currentMemoRowId + 1}
      </div>
      <div>pages: {getPagesCount()}</div>
      <div>
        <form>
          <input
            type="checkbox"
            checked={checkAllPages}
            {...register('checkAllPages')}
            onChange={(event) =>
              handleCheckAllPagesChange(event.target.checked)
            }
          />
          {/* {watchShowAge && (
            <input type="number" {...register('age', { min: 50 })} />
          )} */}
          <div></div>
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
          <br />
          <br />
          <input
            type="checkbox"
            {...register('withFlag')}
            onChange={(event) => handleWithFlagChange(event.target.checked)}
          />{' '}
          With Flag
          <br />
          <br />
        </form>
      </div>
    </div>
  );
}
