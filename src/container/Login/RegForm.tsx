import {ApiResult, useAppDispatch} from '../../utils.ts';
import {Button, Form, Input, message} from 'antd';
import {LockOutlined, MailOutlined, UserOutlined} from '@ant-design/icons';
import {RuleObject} from 'antd/es/form';
import {useState} from 'react';
import {regActions} from '../../reducer/modules/user.ts';
import {useNavigate} from 'react-router-dom';

const formItemStyle = {
    marginBottom: '.16rem'
};

const changeHeight = {
    height: '.42rem'
};
export default function RegForm() {
    // const loginData = useAppSelector(state => state.user);
    const [form] = Form.useForm();
    const [confirmDirty] = useState(false);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleSubmit = () => {
        form.validateFields().then(values => {
            const action = regActions(values);
            action.payload.then(res => {
                const {errcode} = (res as { data: ApiResult }).data;
                if (errcode === 0) {
                    navigate('/group');
                    message.success('注册成功! ');
                    dispatch(action);
                }
            });
        }).catch((errorInfo: Required<{
            errorFields?: [{ name: string[], errors: string[] }]
        }>) => {
            // 手动实现的验证错误滚动到第一个错误所在的字段，但是不确定这里是不是按顺序给的
            if (errorInfo.errorFields && errorInfo.errorFields.length > 0 && errorInfo.errorFields[0].name) {
                form.scrollToField(errorInfo.errorFields[0].name);
            }
        });
    };

    const checkPassword = (_rule: RuleObject, value: unknown, callback: (e?: string) => void) => {
        if (value && value !== form.getFieldValue('password')) {
            callback('两次输入的密码不一致啊!');
        } else {
            callback();
        }
    };

    const checkConfirm = (_rule: RuleObject, value: unknown, callback: (e?: string) => void) => {
        // TODO 所以这里到底检查不检查，还是说会有插件检查
        if (value && confirmDirty) {
            form.validateFields(['confirm'], {/*force: true*/}).catch(callback);
        } else {
            callback();
        }
    };

    return (
        <Form form={form}>
            {/* 用户名 */}
            <Form.Item style={formItemStyle} rules={[{required: true, message: '请输入用户名!'}]}>
                <Input style={changeHeight} prefix={<UserOutlined style={{fontSize: 13}}/>} placeholder="Username"/>
            </Form.Item>

            {/* Email */}
            <Form.Item style={formItemStyle} rules={[{
                required: true, message: '请输入email!',
                pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{1,})+$/
            }]}>
                <Input style={changeHeight} prefix={<MailOutlined style={{fontSize: 13}}/>} placeholder="Email"/>
            </Form.Item>

            {/* 密码 */}
            <Form.Item style={formItemStyle} rules={[
                {
                    required: true, message: '请输入密码!'
                },
                {
                    validator: checkConfirm
                }
            ]}>
                <Input
                    style={changeHeight}
                    prefix={<LockOutlined style={{fontSize: 13}}/>}
                    type="password"
                    placeholder="Password"
                />
            </Form.Item>

            {/* 密码二次确认 */}
            <Form.Item style={formItemStyle} rules={[
                {
                    required: true, message: '请再次输入密码!'
                },
                {
                    validator: checkPassword
                }
            ]}>
                <Input
                    style={changeHeight}
                    prefix={<LockOutlined style={{fontSize: 13}}/>}
                    type="password"
                    placeholder="Confirm Password"
                />
            </Form.Item>

            {/* 注册按钮 */}
            <Form.Item style={formItemStyle}>
                <Button
                    style={changeHeight}
                    type="primary"
                    onClick={handleSubmit}
                    // htmlType="submit"
                    className="login-form-button"
                >
                    注册
                </Button>
            </Form.Item>
        </Form>
    );
}