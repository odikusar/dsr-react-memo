import { createRoot } from "react-dom/client";
// import "./index.css";
// import { Provider } from "react-redux";
// import { store, persistor } from "./store";
// import { NoteBrowse } from "pages/NoteBrowse/NoteBrowse";
// import { NoteCreate } from "pages/NoteCreate/NoteCreate";
// import { Note } from "pages/Note/Note";
// import { PageNotFound } from "pages/PageNotFound/PageNotFound";
// import { Signin } from "pages/Signin/Signin";
// import { FirebaseApp } from "utils/firebase";
// import { ProtectedApp } from "./App";
// import { Header } from './components/header/header';
// import { AboutFeature } from './features/about/about';
// import { LoginFeature } from './features/login/login';
// import { WorkspaceFeature } from './features/workspace/workspace';
// // FirebaseApp.init();
import { App } from "./App";
import "./index.scss";
// const root = ReactDOM.createRoot(document.getElementById("root"));
const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <App />
  // <StrictMode>
  // <Provider store={store}>

  // </Provider>
  // </StrictMode>
);
