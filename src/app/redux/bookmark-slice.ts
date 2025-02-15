import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BookmarkState {
  type: "chore" | "event";
  isAnimating: boolean;
}

const initialState: BookmarkState = {
  type: "chore",
  isAnimating: false,
};

const bookmarkSlice = createSlice({
  initialState,
  name: "bookmarkSlice",
  reducers: {
    setBookmarkValue(state, action: PayloadAction<"chore" | "event">) {
      state.type = action.payload;
      console.log("incoming : ", action.payload);
      console.log("activeType:", action.payload);
    },
    setAnimating(state, action: PayloadAction<boolean>) {
      state.isAnimating = action.payload;
    },
  },
});

export default bookmarkSlice;
export const { setBookmarkValue, setAnimating } = bookmarkSlice.actions;
