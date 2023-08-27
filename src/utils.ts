import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from './store.ts';

// 替代useDispatch，为了调度thunk中间件
export const useAppDispatch: () => AppDispatch = useDispatch;
// 替代useSelector，不用手动标注状态
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// 处理Redux Action成员变量为Promise的情况
export function innerThen(
    actionCreator: () => { payload: Promise<unknown>, type: string },
    onfulfilled?: ((value: unknown) => unknown) | null,
    onrejected?: ((reason: unknown) => PromiseLike<never>) | null,
) {
    const action = actionCreator();
    action.payload.then(onfulfilled).catch(onrejected);
    return action;
}

export interface ApiResult {
    errcode: number,
    errmsg: string
}