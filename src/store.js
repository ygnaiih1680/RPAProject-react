import {configureStore, createSlice} from "@reduxjs/toolkit";

const {actions, reducer} = createSlice({
    name: 'reducers',
    initialState: {modal: {open: false}},
    reducers: {
        controlModal: (state, action) => {
            const {payload: modal} = action
            return {
                ...state,
                modal
            }
        }
    }
});
export const {controlModal} = actions
export default configureStore({reducer});