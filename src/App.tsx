// import React from 'react';
// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
// import { ProtectedApp } from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header } from "./components/Header/Header";
import { AboutFeature } from "./features/About/About";
import { LoginFeature } from "./features/Login/Login";
import { WorkspaceFeature } from "./features/Workspace/Workspace";
// FirebaseApp.init();

// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { setNoteList } from "store/notes/notes-slice";
// import { WithAuthRequired } from "./hoc/withAuthRequired";
import { AuthOnly } from "./hoc/AuthOnly";
import { GuestOnly } from "./hoc/GuestOnly";
// export const ProtectedApp = WithAuthRequired(App);
export function App() {
  // const dispatch = useDispatch();
  // const navigate = useNavigate();

  // async function fetchNotes() {
  //   const noteList = await NoteAPI.fetchAll();
  //   dispatch(setNoteList(noteList));
  // }

  // useEffect(() => {
  //   fetchNotes();
  // }, []);

  return (
    <BrowserRouter>
      <div className="dsr-main-wrapper">
        <Header />
        <div className="dsr-content-wrapper">
          <Routes>
            <Route path="/about" element={<AboutFeature />} />
            <Route element={<GuestOnly />}>
              <Route path="/login" element={<LoginFeature />} />
            </Route>
            <Route element={<AuthOnly />}>
              <Route path="/" element={<WorkspaceFeature />} />
            </Route>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

// export const ProtectedApp = withAuthRequired(App);
