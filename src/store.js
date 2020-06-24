import {configureStore, createSlice} from "@reduxjs/toolkit";

const {actions, reducer} = createSlice({
    name: 'reducers',
    initialState: {modal: {open: false}, user: JSON.parse(sessionStorage.getItem('user'))},
    reducers: {
        controlModal: (state, action) => {
            const {payload: modal} = action
            return {
                ...state,
                modal
            }
        },
        login: (state, action) => {
            const {payload: user} = action
            sessionStorage.setItem('user', JSON.stringify(user))
            return {
                ...state,
                user
            }
        },
        logout: (state, action) => {
            sessionStorage.removeItem('user')
            const {user, ...rest} = state
            return {...rest}
        },
        loadAllApply: (state, action) => {
            const {payload: list} = action
            return {
                ...state,
                apply: {
                    list,
                    detail: {}
                }
            }
        },
        loadApplyDetail: (state, action) => {
            const {payload: {id, ...r}} = action
            const {apply: {detail, ...aRest}, ...rest} = state
            return {
                ...rest,
                apply: {
                    ...aRest,
                    detail: {
                        ...detail,
                        [id]: {...r}
                    }
                }
            }
        }
    }
});
export const {controlModal, login, logout, loadAllApply, loadApplyDetail} = actions
export default configureStore({reducer});