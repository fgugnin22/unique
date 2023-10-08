import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const server_URL = import.meta.env.VITE_SERVER_URL;
// {
//   "email": "axtung210@mail.ru",
//   "name": "baller",
//   "password": "Fedor_223",
//   "re_password": "Fedor_223",
//   "phone_number": 79818910218,
//   "sex": "m",
//   "birth_date": "2004-02-28"
// }
type SignUpState = {
  email: string;
  name: string;
  password: string;
  re_password: string;
  phone_number: number;
  sex: string;
  birth_date: string;
};
type UserDetails =
  | SignUpState & {
      is_staff: boolean;
      is_mod: boolean;
      is_jury: boolean;
      is_participant: boolean;
    };

export const register = createAsyncThunk(
  "users/register",
  async (UserCredentials: SignUpState, thunkAPI) => {
    const body = JSON.stringify(UserCredentials);
    try {
      const res = await fetch(`${server_URL}/auth/users/`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body,
      });

      const data = await res.json();

      if (res.status === 201) {
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const getUser = createAsyncThunk(
  "users/me",
  async (access: string, thunkAPI) => {
    try {
      const res = await fetch(`${server_URL}/auth/users/me/`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `JWT ${access}`,
        },
      });

      const data = await res.json();

      if (res.status === 200) {
        return data;
      } else {
        localStorage.clear();
        return thunkAPI.rejectWithValue(data);
      }
    } catch (err: any) {
      localStorage.clear();
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const login = createAsyncThunk(
  "users/login",
  async (
    { idNumber, password }: { idNumber: string; password: string },
    thunkAPI
  ) => {
    const body = JSON.stringify({
      idNumber,
      password,
    });
    try {
      const res = await fetch(`${server_URL}/auth/jwt/create/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      });

      const data = await res.json();

      if (res.status === 200) {
        const { dispatch } = thunkAPI;
        const { access, refresh } = data;
        localStorage.setItem("access", access);
        localStorage.setItem("refresh", refresh);
        dispatch(getUser(access));
        return data;
      } else {
        localStorage.clear();
        return thunkAPI.rejectWithValue(data);
      }
    } catch (err: any) {
      localStorage.clear();
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

interface initialUserState {
  isAuthenticated: boolean;
  userDetails: Omit<UserDetails, "password" | "re_password"> | null;
  loading: boolean;
  registered: boolean;
  activated: boolean;
  loginFail: boolean;
}
const initialState: initialUserState = {
  isAuthenticated: false,
  userDetails: null,
  loading: false,
  registered: false,
  activated: false,
  loginFail: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = false;
        state.registered = true;
      })
      .addCase(register.rejected, (state) => {
        state.loading = false;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.loginFail = false;
      })
      .addCase(login.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state) => {
        state.loading = false;
        state.loginFail = true;
      })
      .addCase(getUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userDetails = action.payload;
      })
      .addCase(getUser.rejected, (state) => {
        state.loading = false;
      });
    // .addCase(modifyUserCredentials.pending, (state) => {
    //     state.loading = true;
    // })
    // .addCase(modifyUserCredentials.fulfilled, (state, action) => {
    //     state.loading = false;
    //     state.userDetails = { ...state.userDetails, ...action.payload };
    // })
    // .addCase(modifyUserCredentials.rejected, (state) => {
    //     state.loading = false;
    // });
  },
});
// export const { resetRegistered, logout } = authSlice.actions;
export default authSlice.reducer;
