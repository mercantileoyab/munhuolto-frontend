import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Load draft from sessionStorage if available
const savedDraft = sessionStorage.getItem('reservationDraft');
const initialDraftRaw = savedDraft ? JSON.parse(savedDraft) : {};
const initialDraft = {
    date: null,
    workshop: null,
    car: null,
    customer: null,
    services: [],
    note: null,
    mileage: null,
    // ...initialDraftRaw // overwrite defaults with any saved values
};

export const submitReservation = createAsyncThunk(
    'reservation/submit',
    async (reservationData, { getState }) => {
        // Get mileage from draft and add it to car.mileage before sending
        const state = getState();
        const draft = state.reservation.draft;
        const dataToSend = {
            ...reservationData,
            car: {
                ...reservationData.car,
                mileage: draft.mileage // <-- Add mileage to car
            }
        };

        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/reservations`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSend),
        });
        if (!response.ok) {
            throw new Error('Failed to submit reservation');
        }
        return await response.json();
    }
);

const initialState = {
    draft: initialDraft,
    items: [],
    loading: false,
    error: null,
};

const reservationSlice = createSlice({
    name: 'reservation',
    initialState,
    reducers: {
        setDraft(state, action) {
            state.draft = { ...state.draft, ...action.payload };
            sessionStorage.setItem('reservationDraft', JSON.stringify(state.draft));
        },
        clearDraft(state) {
            state.draft = {
                date: null,
                workshop: null,
                car: null,
                customer: null,
                services: [],
                note: null,
                mileage: null, // <-- Added mileage
            };
            sessionStorage.removeItem('reservationDraft');
        },
        addItem(state, action) {
            state.items.push(action.payload);
        },
        removeItem(state, action) {
            state.items = state.items.filter(item => item.id !== action.payload.id);
        },
        initDraft(state) {
            state.draft = {
                date: null,
                workshop: null,
                car: null,
                customer: null,
                services: [],
                note: null,
                mileage: null, // <-- Added mileage
            };
            sessionStorage.removeItem('reservationDraft');
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(submitReservation.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(submitReservation.fulfilled, (state, action) => {
                state.loading = false;
                // state.items.push(action.payload);
                state.draft = {
                    date: null,
                    workshop: null,
                    car: null,
                    customer: null,
                    services: [],
                    note: null,
                    mileage: null, // <-- Added mileage
                };
                sessionStorage.removeItem('reservationDraft');
                // state.draft = action.payload; // <-- Set draft to the returned reservation object
                // sessionStorage.setItem('reservationDraft', JSON.stringify(state.draft));
            })
            .addCase(submitReservation.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { setDraft, clearDraft, addItem, removeItem, initDraft } = reservationSlice.actions;
export default reservationSlice.reducer;