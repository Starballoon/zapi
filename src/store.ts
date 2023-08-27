import {configureStore} from '@reduxjs/toolkit';
import {userReducer} from './reducer/modules/user.ts';
import {menuReducer} from './reducer/modules/menu.ts';
import {groupReducer} from './reducer/modules/group.ts';
import {interfaceReducer} from './reducer/modules/interface.ts';

export const store = configureStore({
    reducer: {
        user: userReducer,
        menu: menuReducer,
        group: groupReducer,
        inter: interfaceReducer
    },
});

// 全局根状态
export type RootState = ReturnType<typeof store.getState>;
// 推断类型
export type AppDispatch = typeof store.dispatch;