import TextField from "@mui/material/TextField";
import style from "./Login.module.scss";

export function LoginFeature() {
  return (
    <div className={style.container}>
      login
      <br />
      <TextField label="The First" variant="filled" id="margin-none" />
    </div>
  );
}
