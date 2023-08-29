import {Tabs} from 'antd';
import {useAppSelector} from '../../utils.ts';
import LoginForm from './LoginForm.tsx';
import RegForm from './RegForm.tsx';

// show only login when register is disabled
export default function LoginWrap() {
    // const { loginWrapActiveKey, canRegister } = this.props;
    const loginWrapActiveKey = useAppSelector(state => state.user.loginWrapActiveKey);
    const canRegister = useAppSelector(state => state.user.canRegister);
    return (
        <Tabs
            defaultActiveKey={loginWrapActiveKey}
            className="login-form"
            tabBarStyle={{border: 'none'}}
        >
            <Tabs.TabPane tab="登录" key="1">
                <LoginForm/>
            </Tabs.TabPane>
            <Tabs.TabPane tab={'注册'} key="2">
                {canRegister ? <RegForm/> : <div style={{minHeight: 200}}>管理员已禁止注册，请联系管理员</div>}
            </Tabs.TabPane>
        </Tabs>
    );
}