import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import encadrantService from "./encadrantService";

// --- Thunks ---

export const getProfile = createAsyncThunk('encadrant/get', async (_, thunkAPI) => {
    try {
        return await encadrantService.getProfile();
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data?.error || "Unknown Error");
    }
});

export const updateProfile = createAsyncThunk('encadrant/update', async (data, thunkAPI) => {
    try {
        return await encadrantService.updateProfile(data);
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data?.error || "Unknown Error");
    }
});

export const getEntreprises = createAsyncThunk('encadrant/entreprises/get', async (_, thunkAPI) => {
    try {
        return await encadrantService.getEntreprises();
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data?.error || "Unknown Error");
    }
});

export const acceptEntrepriseRequest = createAsyncThunk('encadrant/entreprises/accept', async (id, thunkAPI) => {
    try {
        return await encadrantService.acceptEntrepriseRequest(id);
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data?.error || "Unknown Error");
    }
});

export const declineEntrepriseRequest = createAsyncThunk('encadrant/entreprises/decline', async (id, thunkAPI) => {
    try {
        return await encadrantService.declineEntrepriseRequest(id);
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data?.error || "Unknown Error");
    }
});

export const getStages = createAsyncThunk('encadrant/stages/get', async (_, thunkAPI) => {
    try {
        return await encadrantService.getStages();
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data?.error || "Unknown Error");
    }
});

export const addNotePedagogique = createAsyncThunk('entreprise/stages/addNotePedagogique', async (data, thunkAPI) => {
    try {
        return await encadrantService.addNotePedagogique(data.id, data.note);
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data?.error || "Unknown Error");
    }
});

// --- Slice ---

export const encadrantSlice = createSlice({
    name: 'encadrant',
    initialState: {
        profile: null,
        entreprises: [],
        isLoading: false,
        stages: []
    },

    extraReducers: (builder) => builder
        // Get Profile
        .addCase(getProfile.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getProfile.fulfilled, (state, action) => {
            state.profile = action.payload.profile;
            state.isLoading = false;
        })
        .addCase(getProfile.rejected, (state) => {
            state.profile = null;
            state.isLoading = false;
        })

        // Update Profile
        .addCase(updateProfile.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(updateProfile.fulfilled, (state, action) => {
            state.profile = action.payload.profile;
            state.isLoading = false;
        })
        .addCase(updateProfile.rejected, (state) => {
            state.isLoading = false;
        })

        // Get Entreprises
        .addCase(getEntreprises.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getEntreprises.fulfilled, (state, action) => {
            state.entreprises = action.payload.entreprises;
            state.isLoading = false;
        })
        .addCase(getEntreprises.rejected, (state) => {
            state.entreprises = [];
            state.isLoading = false;
        })

        // Accept Entreprise Request
        .addCase(acceptEntrepriseRequest.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(acceptEntrepriseRequest.fulfilled, (state, action) => {
            state.isLoading = false;
            // Update local status to 'accepted'
            state.entreprises = state.entreprises.map(e =>
                e.id_entreprise === action.payload.ids.entreprise_id 
                    ? { ...e, status: 'accepted' } 
                    : e
            );
        })
        .addCase(acceptEntrepriseRequest.rejected, (state) => {
            state.isLoading = false;
        })

        // Decline Entreprise Request
        .addCase(declineEntrepriseRequest.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(declineEntrepriseRequest.fulfilled, (state, action) => {
            state.isLoading = false;
            // Update local status to 'declined'
            state.entreprises = state.entreprises.map(e =>
                e.id_entreprise === action.payload.ids.entreprise_id 
                    ? { ...e, status: 'declined' } 
                    : e
            );
        })
        .addCase(declineEntrepriseRequest.rejected, (state) => {
            state.isLoading = false;
        })

        // Get Stages
        .addCase(getStages.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getStages.fulfilled, (state, action) => {
            state.stages = action.payload.stages;
            state.isLoading = false;
        })
        .addCase(getStages.rejected, (state) => {
            state.stages = [];
            state.isLoading = false;
        })

        // Add Note Pedagogique
        .addCase(addNotePedagogique.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(addNotePedagogique.fulfilled, (state, action) => {
                state.isLoading = false;
                const index = state.stages.findIndex(stage => stage.stage_id === action.payload.stage.stage_id);
                if (index !== -1) {
                    state.stages[index] = {
                        ...state.stages[index],
                        ...action.payload.stage 
                    };
                }
            })
        .addCase(addNotePedagogique.rejected, (state) => {
            state.isLoading = false;
        })
});

export default encadrantSlice.reducer;