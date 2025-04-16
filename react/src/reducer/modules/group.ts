import axios from 'axios';
import {createSlice} from '@reduxjs/toolkit';

// Actions
// const FETCH_GROUP_LIST = 'yapi/group/FETCH_GROUP_LIST';
// const SET_CURR_GROUP = 'yapi/group/SET_CURR_GROUP';
// const FETCH_GROUP_MEMBER = 'yapi/group/FETCH_GROUP_MEMBER';
// const FETCH_GROUP_MSG = 'yapi/group/FETCH_GROUP_MSG';
// const ADD_GROUP_MEMBER = 'yapi/group/ADD_GROUP_MEMBER';
// const DEL_GROUP_MEMBER = 'yapi/group/DEL_GROUP_MEMBER';
// const CHANGE_GROUP_MEMBER = 'yapi/group/CHANGE_GROUP_MEMBER';
// const CHANGE_GROUP_MESSAGE = 'yapi/group/CHANGE_GROUP_MESSAGE';
// const UPDATE_GROUP_LIST = 'yapi/group/UPDATE_GROUP_LIST';
// const DEL_GROUP = 'yapi/group/DEL_GROUP';

interface GroupState {
    groupList: [],
    currGroup: {
        group_name: string,
        group_desc: string,
        custom_field1: {
            name: string,
            enable: boolean
        },
    },
    field: {
        name: string,
        enable: false
    },
    member: [],
    role: string
}

// Group Initial State
const initialState: GroupState = {
    groupList: [],
    currGroup: {
        group_name: '',
        group_desc: '',
        custom_field1: {
            name: '',
            enable: false
        }
    },
    field: {
        name: '',
        enable: false
    },
    member: [],
    role: ''
};

// Group Slice
const groupSlice = createSlice({
    name: 'group',
    initialState,
    // Group Reducers
    reducers: {
        fetchGroupMsgInner: (state, action) => {
            const {role, data} = action.payload.data.data;
            state.role = role;
            state.currGroup = data;
            state.field.name = data.custom_field1.name;
            state.field.enable = data.custom_field1.enable;
        },
        updateGroupListInner: (state, action) => {
            state.groupList = action.payload;
        },
        fetchGroupMemberListInner: (state, action) => {
            state.member = action.payload.data.data;
        },
        fetchGroupListInner: (state, action) => {
            state.groupList = action.payload.data.data;
        },
        setCurrGroupInner: (state, action) => {
            state.currGroup = action.payload.data.data;
        }
    }
});

const {
    fetchGroupMsgInner,
    updateGroupListInner,
    fetchGroupMemberListInner,
    fetchGroupListInner,
    setCurrGroupInner
} = groupSlice.actions;

// 获取 group 信息 (权限信息)
export const fetchGroupMsg = async (id: number) => fetchGroupMsgInner(await axios.get('/api/group/get', {params: {id}}));

// 更新左侧的分组列表
export const updateGroupList = (param: []) => updateGroupListInner(param);

// 获取分组成员列表
export const fetchGroupMemberList = (id: number) => fetchGroupMemberListInner(axios.get('/api/group/get_member_list', {params: {id}}));

// Action Creators
export const fetchGroupList = () => fetchGroupListInner(axios.get('/api/group/list'));

export const setCurrGroup = (group: {
    _id: number
}) => setCurrGroupInner(axios.get('/api/group/get', {params: {id: group._id}}));

// 以下方法不需要dispatch action
// 添加分组成员
// TODO 不用刷新状态吗？？？
export const addMember = (param: unknown) => {
    axios.post('/api/group/add_member', param);
};

// 删除分组成员
export const delMember = (param: unknown) => {
    axios.post('/api/group/del_member', param);
};

// 修改分组成员权限
export const changeMemberRole = (param: unknown) => {
    axios.post('/api/group/change_member_role', param);
};

// 修改分组信息
export const changeGroupMsg = (param: unknown) => {
    axios.post('/api/group/up', param);
};

// 删除分组
export const deleteGroup = (param: unknown) => {
    axios.post('/api/group/del', param);
};

export const groupReducer = groupSlice.reducer;