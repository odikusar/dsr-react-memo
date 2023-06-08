import { createAsyncThunk } from '@reduxjs/toolkit';
import { MemoFile } from 'models';
import { MemoFileApiService } from 'utils';

export const fetchMemoFiles = createAsyncThunk(
  'memoFile/fetchAll',
  async (currentUserId: string) => {
    const response = await MemoFileApiService.fetchAll(currentUserId);

    return response;
  }
);

export const createMemoFile = createAsyncThunk(
  'memoFile/create',
  async (memoFile: MemoFile) => {
    const response = await MemoFileApiService.create(memoFile);

    return response;
  }
);

// export const updateNote = createAsyncThunk(
//   'notes/updateNote',
//   async (note: Note) => {
//     await db.collection('notes').doc(note.id).update({ title: note.title });
//     return note;
//   }
// );

// export const deleteNote = createAsyncThunk(
//   'notes/deleteNote',
//   async (id: string) => {
//     await db.collection('notes').doc(id).delete();
//     return id;
//   }
// );
