import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api, setAuthHeader } from "../api/api";

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async ({ status }) => {
    setAuthHeader(localStorage.getItem("jwt"), api)
    try {
        const { data } = await api.get("/api/task", {
            params: { status }
        });
        console.log("fetch tasks", data);
        return data;
    } catch (error) {
        console.log("error", error)
        throw Error(error.response.data.error)
    }
});

export const fetchUserTasks = createAsyncThunk("tasks/fetchUserTasks", async ({ status }) => {
    setAuthHeader(localStorage.getItem("jwt"), api)
    try {
        const { data } = await api.get("/api/task/user", {
            params: { status }
        });
        console.log("fetch user tasks", data);
        return data;
    } catch (error) {
        console.log("error", error)
        throw Error(error.response.data.error)
    }
});

export const fetchTasksById = createAsyncThunk("tasks/fetchTasksById", async ({ taskId }) => {
    setAuthHeader(localStorage.getItem("jwt"), api)
    try {
        const { data } = await api.get(`/api/task/${taskId}`);
        console.log("fetch tasks by id", data);
        return data;
    } catch (error) {
        console.log("error", error)
        throw Error(error.response.data.error)
    }
});

// REMOVED the {} around taskData so it correctly receives the payload directly
export const createTask = createAsyncThunk("tasks/createTask", async (taskData) => {
    setAuthHeader(localStorage.getItem("jwt"), api)
    try {
        const { data } = await api.post(`/api/task`, taskData);
        console.log("created task", data);
        return data;
    } catch (error) {
        console.log("error", error)
        throw Error(error.response.data.error)
    }
});

export const updateTask = createAsyncThunk("tasks/updateTask", async ({ id, updatedTaskData }) => {
    setAuthHeader(localStorage.getItem("jwt"), api)
    try {
        const { data } = await api.put(`/api/task/${id}`, updatedTaskData);
        console.log("updated task", data);
        return data;
    } catch (error) {
        console.log("error", error)
        throw Error(error.response.data.error)
    }
});


export const assignedTaskToUser = createAsyncThunk("tasks/assignedTaskToUser", async ({ taskId, userId }) => {
    setAuthHeader(localStorage.getItem("jwt"), api)
    try {
        const { data } = await api.put(`/api/task/${taskId}/user/${userId}/assigned`);
        console.log("assigned task", data);
        return data;
    } catch (error) {
        console.log("error", error)
        throw Error(error.response.data.error)
    }
});

export const deleteTask = createAsyncThunk("tasks/deleteTask", async ({ taskId }) => {
    setAuthHeader(localStorage.getItem("jwt"), api)
    try {
        const { data } = await api.delete(`/api/task/${taskId}`);
        console.log("Deleted task sucessfully", data);
        return taskId;
    } catch (error) {
        console.log("error", error)
        throw Error(error.response.data.error)
    }
});

const taskSlice = createSlice({
    name: "task",
    initialState: {
        tasks: [],
        loading: false,
        error: null,
        taskDetails: null,
        userTask: []
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks = action.payload
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            })
            .addCase(fetchUserTasks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserTasks.fulfilled, (state, action) => {
                state.loading = false;
                state.userTask = action.payload
            })
            //  .addCase(fetch.fulfilled, (state, action) => {
            //     state.loading = false;
            //     state.userTask = action.payload
            // })
            .addCase(fetchUserTasks.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            })
            .addCase(createTask.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createTask.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks.push(action.payload)
            })
            .addCase(createTask.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                const updatedTask = action.payload;
                state.loading = false;
                state.tasks = state.tasks.map((task) =>
                    task.id === updatedTask.id ? { ...task, ...updatedTask } : task
                );
            })
            .addCase(assignedTaskToUser.fulfilled, (state, action) => {
                const updatedTask = action.payload;
                state.loading = false;
                state.tasks = state.tasks.map((task) =>
                    task.id === updatedTask.id ? { ...task, ...updatedTask } : task
                );
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks = state.tasks.filter((task) => task.id !== action.payload
                );
            })
    },
})

export default taskSlice.reducer;
