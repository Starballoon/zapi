import axios from 'axios';
import {createSlice} from '@reduxjs/toolkit';
import qs from 'qs';

// Actions
// const INIT_INTERFACE_DATA = 'yapi/interface/INIT_INTERFACE_DATA';
// const FETCH_INTERFACE_DATA = 'yapi/interface/FETCH_INTERFACE_DATA';
// const FETCH_INTERFACE_LIST_MENU = 'yapi/interface/FETCH_INTERFACE_LIST_MENU';
// const DELETE_INTERFACE_DATA = 'yapi/interface/DELETE_INTERFACE_DATA';
// const DELETE_INTERFACE_CAT_DATA = 'yapi/interface/DELETE_INTERFACE_CAT_DATA';
// const UPDATE_INTERFACE_DATA = 'yapi/interface/UPDATE_INTERFACE_DATA';
// const CHANGE_EDIT_STATUS = 'yapi/interface/CHANGE_EDIT_STATUS';
// const FETCH_INTERFACE_LIST = 'yapi/interface/FETCH_INTERFACE_LIST';
// const SAVE_IMPORT_DATA = 'yapi/interface/SAVE_IMPORT_DATA';
// const FETCH_INTERFACE_CAT_LIST = 'yapi/interface/FETCH_INTERFACE_CAT_LIST';
// const SAVE_INTERFACE_PROJECT_ID = 'yapi/interface/SAVE_INTERFACE_PROJECT_ID';
// const GET_INTERFACE_GROUP_LIST = 'yapi/interface/GET_INTERFACE_GROUP_LIST';

interface InterfaceState {
    curdata: object,
    list: [],
    // 记录编辑页面是否有编辑,
    editStatus: boolean,
    totalTableList: [],
    catTableList: [],
    count: 0,
    totalCount: 0
}

// Interface Initial State
const initialState: InterfaceState = {
    curdata: {},
    list: [],
    editStatus: false,
    totalTableList: [],
    catTableList: [],
    count: 0,
    totalCount: 0
};

// Interface Slice
const interfaceSlice = createSlice({
    name: 'inter',
    initialState,
    // Interface Reducers
    reducers: {
        changeEditStatusInner: (state, action) => {
            state.editStatus = action.payload;
        },
        updateInterfaceDataInner: (state, action) => {
            state.curdata = Object.assign({}, state.curdata, action.payload);
        },
        fetchInterfaceDataInner: (state, action) => {
            state.curdata = action.payload.data.data;
        },
        fetchInterfaceListMenuInner: (state, action) => {
            state.list = action.payload.data.data;
        },
        fetchInterfaceListInner: (state, action) => {
            state.totalTableList = action.payload.data.data.list;
            state.totalCount = action.payload.data.data.count;
        },
        fetchInterfaceCatListInner: (state, action) => {
            state.catTableList = action.payload.data.data.list;
            state.count = action.payload.data.data.count;
        }
    }
});

const {
    changeEditStatusInner,
    updateInterfaceDataInner,
    fetchInterfaceDataInner,
    fetchInterfaceListMenuInner,
    fetchInterfaceListInner,
    fetchInterfaceCatListInner
} = interfaceSlice.actions;

// 记录编辑页面是否有编辑
export const changeEditStatus = (status: boolean) => changeEditStatusInner(status);

// export const initInterface = () => {
// };

// 原来会返回{updata: updata, payload: true}这样的action，怀疑没搞懂payload
export const updateInterfaceData = (updata: unknown) => updateInterfaceDataInner(updata);

export const deleteInterfaceData = async (id: number) => await axios.post('/api/interface/del', {id: id});

export const saveImportData = async (data: unknown) => await axios.post('/api/interface/save', data);

export const deleteInterfaceCatData = (id: number) => axios.post('/api/interface/del_cat', {catid: id});

// Action Creators
export const fetchInterfaceData = async (interfaceId: number) =>
    fetchInterfaceDataInner(await axios.get('/api/interface/get?id=' + interfaceId));

export const fetchInterfaceListMenu = async (projectId: number) =>
    fetchInterfaceListMenuInner(await axios.get('/api/interface/list_menu?project_id=' + projectId));

const paramsSerializer = (params: unknown) => {
    return qs.stringify(params, {indices: false});
};

export async function fetchInterfaceList(params: unknown) {
    const result = await axios.get('/api/interface/list', {
        params, paramsSerializer
    });
    return fetchInterfaceListInner(result);
}

export async function fetchInterfaceCatList(params: unknown) {
    const result = axios.get('/api/interface/list_cat', {
        params, paramsSerializer
    });
    return fetchInterfaceCatListInner(result);
}

export const interfaceReducer = interfaceSlice.reducer;