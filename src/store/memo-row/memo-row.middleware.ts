import {
  AnyAction,
  Dispatch,
  Middleware,
  PayloadAction,
} from '@reduxjs/toolkit';
import { FLAG_INDEX, TRANSLATE_INDEX, WORD_INDEX } from 'constants/index';
import { MemoFile, MemoRow } from 'models';
import { usePapaParse } from 'react-papaparse';
import { fetchMemoRowsFulfilled } from './memo-row.slice';

export const memoRowMiddleware: Middleware =
  (store) =>
  (next: Dispatch<AnyAction>) =>
  (action: PayloadAction<MemoFile>) => {
    if (action.type === 'memoRow/fetchMemoRows') {
      fetch(action.payload.url)
        .then((response) => response.text())
        .then((text) => {
          const { readString } = usePapaParse();
          readString<string>(text, {
            worker: true,
            download: false,
            complete: (results) => {
              const memoRows = results.data
                .filter((item) => !!item[WORD_INDEX] && !!item[TRANSLATE_INDEX])
                .map(
                  (item, index) =>
                    ({
                      id: index,
                      word: item[WORD_INDEX],
                      translate: item[TRANSLATE_INDEX],
                      flag: item[FLAG_INDEX],
                      isShown: false,
                      isSelected: false,
                    } as MemoRow)
                );

              store.dispatch(fetchMemoRowsFulfilled(memoRows));
            },
          });
        });
    }

    return next(action);
  };
