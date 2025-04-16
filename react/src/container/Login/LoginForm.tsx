import {useEffect, useState} from 'react';
import {Button, Form, Input, message, Radio, RadioChangeEvent} from 'antd';
import {useNavigate} from 'react-router-dom';
import {LockOutlined, UserOutlined} from '@ant-design/icons';
import {ApiResult, useAppDispatch, useAppSelector} from '../../utils.ts';
import {loginActions, loginLdapActions} from '../../reducer/modules/user.ts';
import './Login.scss';

const formItemStyle = {
    marginBottom: '.16rem'
};

const changeHeight = {
    height: '.42rem'
};

export default function LoginForm() {
    // const loginData = useAppSelector(state => state.user);
    const isLDAP = useAppSelector(state => state.user.isLDAP);
    const [loginType, setLoginType] = useState<string>('ldap');
    const [form] = Form.useForm();
    const emailRule =
        loginType === 'ldap' ? {} : {
            required: true,
            message: '请输入正确的email!',
            pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{1,})+$/
        };

    useEffect(() => {
        //Qsso.attach('qsso-login','/api/user/login_by_token')
        // console.log('isLDAP', isLDAP);
    });

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleSubmit = () => {
        form.validateFields({validateOnly: true}).then(values => {
            const action =
                isLDAP && loginType === 'ldap' ? loginLdapActions(values) : loginActions(values);
            action.payload.then(res => {
                const {errcode} = (res as { data: ApiResult }).data;
                if (errcode === 0) {
                    navigate('/group');
                    message.success('登录成功! ');
                    dispatch(action);
                }
            });
        });
    };

    const handleFormLayoutChange = (e: RadioChangeEvent) => {
        setLoginType(e.target.value);
    };

    return (
        <Form form={form}>
            {/* 登录类型 (普通登录／LDAP登录) */}
            {isLDAP && (
                <Form.Item>
                    <Radio.Group defaultValue="ldap" onChange={handleFormLayoutChange}>
                        <Radio value="ldap">LDAP</Radio>
                        <Radio value="normal">普通登录</Radio>
                    </Radio.Group>
                </Form.Item>
            )}

            {/* 用户名 (Email) */}
            <Form.Item style={formItemStyle} name="email" rules={[emailRule]}>
                <Input style={changeHeight} prefix={<UserOutlined style={{fontSize: 13}}/>} placeholder="Email"/>
            </Form.Item>

            {/* 密码 */}
            <Form.Item style={formItemStyle} name="password" rules={[{required: true, message: '请输入密码!'}]}>
                <Input
                    style={changeHeight} prefix={<LockOutlined style={{fontSize: 13}}/>}
                    type="password" placeholder="Password"/>
            </Form.Item>

            {/* 登录按钮 */}
            <Form.Item style={formItemStyle} name="">
                <Button
                    style={changeHeight}
                    type="primary"
                    onClick={handleSubmit}
                    // htmlType="submit"
                    className="login-form-button"
                >
                    登录
                </Button>
            </Form.Item>

            {/*<div className="qsso-breakline">*/}
            {/*    <span className="qsso-breakword">或</span>*/}
            {/*</div>*/}
            {/*<Button style={changeHeight} id="qsso-login" type="primary" className="login-form-button" size="large"*/}
            {/*        ghost>QSSO登录</Button>*/}
        </Form>
    );
}