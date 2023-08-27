import {createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {AppDispatch} from '../../store.ts';

// Actions
// const LOGIN = 'yapi/user/LOGIN';
// const LOGIN_OUT = 'yapi/user/LOGIN_OUT';
// const LOGIN_TYPE = 'yapi/user/LOGIN_TYPE';
// const GET_LOGIN_STATE = 'yapi/user/GET_LOGIN_STATE';
// const REGISTER = 'yapi/user/REGISTER';
// const SET_BREADCRUMB = 'yapi/user/SET_BREADCRUMB';
// const CHANGE_STUDY_TIP = 'yapi/user/CHANGE_STUDY_TIP';
// const FINISH_STUDY = 'yapi/user/FINISH_STUDY';
// const SET_IMAGE_URL = 'yapi/user/SET_IMAGE_URL';

// Login State Enum
export const LOADING_STATUS = 0;
export const GUEST_STATUS = 1;
export const MEMBER_STATUS = 2;

export interface UserState {
    isLogin: boolean,
    canRegister: boolean,
    isLDAP: boolean,
    userName: string | null,
    uid: number | null,
    email: string,
    loginState: 0 | 1 | 2,
    // '1'是登录，'2'是注册
    loginWrapActiveKey: '1' | '2',
    role: string | null,
    type: string | null,
    breadcrumb: { name: string, href?: string }[], // TODO 为什么在这
    studyTip: 0 | 1 | 2 | 3,
    // 大概是试用模式，所以叫学习版吗
    study: boolean,
    imageUrl: string
}

// User Initial State
const initialState: UserState = {
    isLogin: false,
    canRegister: true,
    isLDAP: false,
    userName: null,
    uid: null,
    email: '',
    loginState: LOADING_STATUS,
    loginWrapActiveKey: '1',
    role: null,
    type: null,
    breadcrumb: [],
    studyTip: 0,
    study: false,
    imageUrl: ''
};

// User Slice
const userSlice = createSlice({
    name: 'user',
    initialState,
    // User Reducers
    reducers: {
        checkLoginStateInner: (state, action) => {
            state.isLogin = (action.payload.data.errcode == 0);
            state.isLDAP = action.payload.data.ladp;
            state.canRegister = action.payload.data.canRegister;
            state.role = action.payload.data.data ? action.payload.data.data.role : null;
            state.loginState = action.payload.data.errcode == 0 ? MEMBER_STATUS : GUEST_STATUS;
            state.userName = action.payload.data.data ? action.payload.data.data.username : null;
            state.uid = action.payload.data.data ? action.payload.data.data._id : null;
            state.type = action.payload.data.data ? action.payload.data.data.type : null;
            state.study = action.payload.data.data ? action.payload.data.data.study : false;
        },
        loginActionsInner: (state, action) => {
            if (action.payload.data.errcode === 0) {
                state.isLogin = true;
                state.loginState = MEMBER_STATUS;
                state.uid = action.payload.data.data.uid;
                state.userName = action.payload.data.data.username;
                state.role = action.payload.data.data.role;
                state.type = action.payload.data.data.type;
                state.study = action.payload.data.data.study;
            }
        },
        registerActionsInner: (state, action) => {
            state.isLogin = true;
            state.loginState = MEMBER_STATUS;
            state.uid = action.payload.data.data.uid;
            state.userName = action.payload.data.data.username;
            state.type = action.payload.data.data.type;
            state.study = action.payload.data.data ? action.payload.data.data.study : false;
        },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        logoutActionsInner: (state, _action) => {
            state.isLogin = false;
            state.loginState = GUEST_STATUS;
            state.userName = null;
            state.uid = null;
            state.role = null;
            state.type = null;
        },
        loginTypeActionInner: (state, action) => {
            state.loginWrapActiveKey = action.payload;
        },
        setBreadcrumbInner: (state, action) => {
            state.breadcrumb = action.payload;
        },
        setImageUrlInner: (state, action) => {
            state.imageUrl = action.payload;
        },
        changeStudyTipInner: (state) => {
            state.studyTip += 1;
        },
        finishStudyInner: (state) => {
            state.study = true;
            state.studyTip = 0;
        }
    }
});

const {
    checkLoginStateInner,
    loginActionsInner,
    registerActionsInner,
    logoutActionsInner,
    loginTypeActionInner,
    setBreadcrumbInner,
    setImageUrlInner,
    changeStudyTipInner,
    finishStudyInner
} = userSlice.actions;

// Action Creators
// 异步操作改为手写thunk函数
export const checkLoginState = () => async (dispatch: AppDispatch) => {
    dispatch(checkLoginStateInner(await axios.get('/api/user/status')));
};

export const loginActions = (data: unknown) => async (dispatch: AppDispatch) => {
    dispatch(loginActionsInner(await axios.post('/api/user/login', data)));
};
export const loginLdapActions = (data: unknown) => async (dispatch: AppDispatch) => {
    dispatch(loginActionsInner(await axios.post('/api/user/login_by_ldap', data)));
};

export const regActions = (data: { email: string, password: string, userName: string }) => async (dispatch: AppDispatch) => {
    dispatch(registerActionsInner(axios.post('/api/user/req', {
        email: data.email,
        password: data.password,
        username: data.userName
    })));
};

export const logoutActions = (): { payload: Promise<unknown>, type: string } =>
    logoutActionsInner(axios.get('/api/user/logout'));
export const loginTypeAction = (index: '1' | '2') => loginTypeActionInner(index);
export const setBreadcrumb = (data: unknown) => setBreadcrumbInner(data);
export const setImageUrl = (imageUrl: string) => setImageUrlInner(imageUrl);
export const changeStudyTip = () => changeStudyTipInner();

export const finishStudy = () => async (dispatch: AppDispatch) => {
    await axios.get('/api/user/up_study');
    dispatch(finishStudyInner());
};

// User Reducer
export const userReducer = userSlice.reducer;