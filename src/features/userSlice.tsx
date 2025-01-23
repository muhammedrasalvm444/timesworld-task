import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type User = {
  email: string;
  password: string;
};

interface UserState {
  users: User[];
  loggedInUser: User | null;
}

const initialState: UserState = {
  users: JSON.parse(localStorage.getItem("users") || "[]"),
  loggedInUser: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser(state, action: PayloadAction<User>) {
      state.users.push(action.payload);
      localStorage.setItem("users", JSON.stringify(state.users));
    },
    loginUser(state, action: PayloadAction<User>) {
      state.loggedInUser = action.payload;
      localStorage.setItem("loggedInUser", JSON.stringify(action.payload));
    },
    logoutUser(state) {
      state.loggedInUser = null;
      localStorage.removeItem("loggedInUser");
    },
  },
});

export const { addUser, loginUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
