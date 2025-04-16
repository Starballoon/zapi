import {createSlice} from '@reduxjs/toolkit';

// Actions
// const CHANGE_MENU_ITEM = 'yapi/menu/CHANGE_MENU_ITEM';

interface MenuState {
    curKey: string;
}

// Reducer
const initialState: MenuState = {
    curKey: '/' + window.location.hash.split('/')[1]
};

// Menu Slice
const menuSlice = createSlice({
    name: 'menu',
    initialState,
    // Menu Reducers
    reducers: {
        changeMenuItemInner: (state, action) => {
            state.curKey = action.payload;
        }
    }
});

export const {changeMenuItemInner} = menuSlice.actions;

export const changeMenuItem = (newKey: string) => changeMenuItemInner(newKey);

// Menu Reducer
export const menuReducer = menuSlice.reducer;