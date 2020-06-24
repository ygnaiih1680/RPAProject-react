import {configureStore, createSlice} from "@reduxjs/toolkit";

const {actions, reducer} = createSlice({
    name: 'reducers',
    initialState: {modal: {open: false}, user: JSON.parse(sessionStorage.getItem('user'))},
    reducers: {
        //일반 모달 조작
        controlModal: (state, action) => {
            const {payload: modal} = action
            return {
                ...state,
                modal
            }
        },
        //로그인
        login: (state, action) => {
            const {payload: user} = action
            sessionStorage.setItem('user', JSON.stringify(user))
            return {
                ...state,
                user
            }
        },
        //로그아웃
        logout: (state, action) => {
            sessionStorage.removeItem('user')
            const {user, ...rest} = state
            return {...rest}
        },
        //전체 지원자 리스트
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
        //지원자 세부사항
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
        },
        //세부사항 조회 모달 조작
        controlDetailModal: (state, action) => {
            const {payload} = action
            return {
                ...state,
                detailModal: {
                    ...payload
                }

            }
        }
    }
});
export const {controlModal, login, logout, loadAllApply, loadApplyDetail, controlDetailModal} = actions
export default configureStore({reducer});