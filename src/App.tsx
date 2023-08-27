import {useEffect, useState} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import {Alert} from 'antd';
import {useAppSelector} from './utils.ts';
import {Footer, Header, Loading, Notify} from './components';
import {GUEST_STATUS} from './reducer/modules';
import {AppRoute} from './routes.ts';
import {checkLoginState} from './reducer/modules/user.ts';

/**
 * TODO 最终检查是否有必要保留
 * 一个检查浏览器是否采用Chromium内核的警告信息
 */
const alertContent = () => {
    const ua = window.navigator.userAgent;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const isChrome = ua.indexOf('Chrome') && (window as any).chrome;
    if (!isChrome) {
        return (
            <Alert
                style={{zIndex: 99}}
                message={'Part of zapi functions only supports browsers with chromium kernel'}
                banner
                closable
            />
        );
    }
};

// react-router 6.x暂时还不支持原有的getUserConfirmation覆盖window.confirm的功能
// const showConfirm = (_msg: string, _callback: () => void) => {
//     // 自定义 window.confirm
//     // http://reacttraining.cn/web/api/BrowserRouter/getUserConfirmation-func
//     const container = document.createElement('div');
//     document.body.appendChild(container);
//     // ReactDOM.render(<MyPopConfirm msg={msg} callback={callback} />, container);
// };

export default function App() {
    const [login] = useState(0);
    const loginState = useAppSelector(state => state.user.loginState);
    const curUserRole = useAppSelector(state => state.user.role);

    useEffect(() => {
        checkLoginState();
    }, []);

    if (loginState !== login) {
        return <Loading visible/>;
    } else {
        return (
            <BrowserRouter /*getUserConfirmation={showConfirm}*/>
                <div className="g-main">
                    <div className="router-main">
                        {/* TODO 历史遗留内容 */}
                        {curUserRole === 'admin' && <Notify/>}
                        {alertContent()}
                        {loginState !== GUEST_STATUS && <Header/>}
                        <div className="router-container">
                            {Object.keys(AppRoute).map(key => {
                                const item = AppRoute[key];
                                switch (key) {
                                    case 'login':
                                        return <Route key={key} path={item.path} element={item.component}/>;
                                    case 'home':
                                        return <Route key={key} path={item.path} element={item.component}/>;
                                    default:
                                        return <Route
                                            key={key}
                                            path={item.path}
                                            element={/*requireAuthentication*/(item.component)}
                                        />;
                                }
                            })}
                        </div>
                        <Footer/>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}
