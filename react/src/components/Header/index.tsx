import {useState} from 'react';
import {
    logoutActions/*, checkLoginState as _checkLoginState, loginTypeAction*/
} from '../../reducer/modules/user.ts';
import {changeMenuItem} from '../../reducer/modules/menu.ts';
import {ApiResult, useAppDispatch, useAppSelector} from '../../utils.ts';
import './Header.scss';
import {message} from 'antd';
import {Header} from 'antd/es/layout/layout';
import {Link, useNavigate} from 'react-router-dom';
import LogoSVG from '../LogoSVG';
import Breadcrumb from '../Breadcrumb';
import ToolUser from './ToolUser.tsx';

export default function HeaderComponent() {
    // const router = undefined;
    const user = useAppSelector(state => state.user.userName);
    const [msg] = useState<string | null>(null);
    const uid = useAppSelector(state => state.user.uid);
    const role = useAppSelector(state => state.user.role);
    const login = useAppSelector(state => state.user.isLogin);
    const studyTip = useAppSelector(state => state.user.studyTip);
    const study = useAppSelector(state => state.user.study);
    const imageUrl = useAppSelector(state => state.user.imageUrl);
    // const history = undefined;
    // const location = undefined;

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    // const linkTo = e => {
    //     if (e.key !== '/doc') {
    //         dispatch(changeMenuItem(e.key));
    //         if (!login) {
    //             message.info('请先登录', 1);
    //         }
    //     }
    // };

    const relieveLink = () => dispatch(changeMenuItem(''));

    const logout = () => {
        // 无语，为啥{a: string, b: Promise}这种对象在js里可以直接then，又不是Promise<{}>
        const action = logoutActions();
        action.payload.then(res => {
            const {errcode, errmsg} = (res as {
                data: ApiResult
            }).data;
            if (errcode == 0) {
                navigate('/');
                dispatch(changeMenuItem(''));
                message.success('退出成功! ');
            } else {
                message.error(errmsg);
            }
            dispatch(action);
        }).catch(err => message.error(err));
    };

    // const handleLogin = e => {
    //     e.preventDefault();
    //     dispatch(loginTypeAction('1'));
    // };
    //
    // const handleReg = e => {
    //     e.preventDefault();
    //     dispatch(loginTypeAction('2'));
    // };
    //
    // const checkLoginState = () => {
    //     dispatch(innerThen(_checkLoginState, res => {
    //         const {errcode} = (res as { data: ApiResult }).data;
    //         if (errcode !== 0) {
    //             // history.push('/');
    //         }
    //     }, err => {
    //         console.log(err as string);
    //         return Promise.reject(err);
    //     }));
    // };

    return (
        <Header className="header-box m-header">
            <div className="content g-row">
                <Link onClick={relieveLink} to="/group" className="logo">
                    <div className="href">
                        <span className="img">
                            <LogoSVG length="32px"/>
                        </span>
                    </div>
                </Link>
            </div>
            <Breadcrumb/>
            <div className="user-toolbar" style={{position: 'relative', zIndex: studyTip > 0 ? 3 : 1}}>
                {login && <ToolUser
                    {...{studyTip, study, user, msg, uid, role, imageUrl, relieveLink, logout}}/>}
            </div>
        </Header>
    );
}