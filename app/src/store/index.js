import { configureStore } from "@reduxjs/toolkit";
import tableReduser from "./slices/table";

export default configureStore({
  reducer: {
    table: tableReduser,
  },
});
