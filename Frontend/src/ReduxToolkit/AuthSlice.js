// Updated AuthSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api, setAuthHeader } from "../api/api"; 

export const login = createAsyncThunk("auth/login", async (userData) => {
    try {
        const { data } = await api.post(`/auth/signin`, userData);
        localStorage.setItem("jwt", data.jwt);
        console.log("login success", data);
        return data;
    } catch (error) {
        console.log("Catch error", error);
        throw Error(error.response?.data?.error || "Login failed");
    }
});

export const register = createAsyncThunk("auth/register", async (userData) => {
    try {
        const { data } = await api.post(`/auth/signup`, userData);
        localStorage.setItem("jwt", data.jwt);
        console.log("register success", data);
        return data;
    } catch (error) {
        console.log("Catch error", error);
        throw Error(error.response?.data?.error || "Registration failed");
    }
});
 
export const logout = createAsyncThunk("auth/logout", async () => {
    try {
        localStorage.clear();
    } catch (error) {
        console.log("Catch error", error);
    }
});

export const getUserProfile = createAsyncThunk("auth/getUserProfile", async (jwt) => {
    setAuthHeader(jwt, api);
    try {
        const { data } = await api.get(`/api/user/profile`);
        console.log("User profile success", data);
        return data;
    } catch (error) {
        console.log("Catch error", error);
        throw Error(error.response?.data?.error || "Failed to fetch profile");
    }
});

export const getUserList = createAsyncThunk("auth/getUserList", async (jwt) => {
    setAuthHeader(jwt, api);
    try {
        // Fix: Changed from /api/user to /api/user/allUsers to match the Spring Boot controller
        const { data } = await api.get(`/api/user/allUsers`); 
        console.log("User list success", data);
        return data;
    } catch (error) {
        console.log("Catch error", error);
        throw Error(error.response?.data?.error || "Failed to fetch user list");
    }
});

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        loggedIn: false,
        loading: false,
        error: null,
        jwt: null,
        users: []
    },
    reducers: {},
    extraReducers: (builder) => {
     builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.jwt = action.payload.jwt;
        state.loggedIn = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.jwt = action.payload.jwt;
        state.loggedIn = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.loggedIn = true;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getUserList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserList.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getUserList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.jwt = null;
        state.users = [];
        state.error = null;
        state.loggedIn = false;
      });
    }
});

export default authSlice.reducer;