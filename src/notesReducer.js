import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const addNotesInternal = createAsyncThunk("notes/addNotes", async (inputText) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer YOUR_API_TOKEN");

    const raw = JSON.stringify([
        {
            "title": inputText,
            "completed": false
        }
    ]);

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    await fetch("https://crudapi.co.uk/api/v1/notes", requestOptions)
})

export const addNotes = (payload) => async (dispatch) => {
    await dispatch(addNotesInternal(payload))
    return await dispatch(fetchNotes())
} 

export const fetchNotes = createAsyncThunk("notes/fetchNotes", async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer YOUR_API_TOKEN");

    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    const resp = await fetch("https://crudapi.co.uk/api/v1/notes", requestOptions)
    return (await resp.json()).items
})

const notesSlice = createSlice({
    name: "notes",
    initialState: {
        notes: [],
        loading: false,
    },
    extraReducers: (builder) => {
        builder.addCase(fetchNotes.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(fetchNotes.fulfilled, (state, action) => {
            state.loading = false
            state.notes = action.payload
        })
        builder.addCase(fetchNotes.rejected, (state, action) => {
            state.loading = false
        })
        builder.addCase(addNotesInternal.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(addNotesInternal.fulfilled, (state, action) => {
            state.loading = false
        })
        builder.addCase(addNotesInternal.rejected, (state, action) => {
            state.loading = false
        })
    }
})

export default notesSlice.reducer