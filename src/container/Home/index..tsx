import {useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {Button} from 'antd';
// import {changeMenuItem} from '../../reducer/modules/menu.ts';
import {/*useAppDispatch, */useAppSelector} from '../../utils.ts';
import HomeGuest from './HomeGuest';
import './Home.scss';

// export interface Intro {
//     title: string,
//     description: string,
//     detail: { title: string, description: string, iconType: string }[],
//     img: string
// }
//
// const defaultIntroList: Intro[] = [{
//     title: '接口管理',
//     description: '满足你的所有接口管理需求。不再需要为每个项目搭建独立的接口管理平台和编写离线的接口文档，其权限管理和项目日志让协作开发不再痛苦。',
//     detail: [
//         {title: '团队协作', description: '多成员协作，掌握项目进度', iconType: 'team'},
//         {title: '权限管理', description: '设置每个成员的操作权限', iconType: 'usergroup-add'},
//         {title: '项目日志', description: '推送项目情况，掌握更新动态', iconType: 'schedule'}
//     ],
//     img: './image/demo-img.jpg'
// }, {
//     title: '接口测试',
//     description: '一键即可得到返回结果。根据用户的输入接口信息如协议、URL、接口名、请求头、请求参数、mock规则生成Mock接口，这些接口会自动生成模拟数据。',
//     detail: [
//         {title: '编辑接口', description: '团队开发时任何人都可以在权限许可下创建、修改接口', iconType: 'tags-o'},
//         {title: 'mock请求', description: '创建者可以自由构造需要的数据，支持复杂的生成逻辑', iconType: 'fork'}
//     ],
//     img: './image/demo-img.jpg'
// }];

export default function Home() {
    // const introList:Intro[] = [];
    const login = useAppSelector(state => state.user.isLogin);

    const navigate = useNavigate();
    useEffect(() => {
        if (login) {
            navigate('/group/261');
        }
    }, []);

    // const dispatch = useAppDispatch();
    // const toStart = () => {
    //     dispatch(changeMenuItem('/group'));
    // };

    return (
        <div className="home-main">
            <HomeGuest /*{...{introList}}*//>
            <div className="row-tip">
                <div className="container">
                    <div className="tip-title">
                        <h3 className="title">准备好使用了吗？</h3>
                        <p className="desc">注册账号尽请使用吧，查看使用文档了解更多信息</p>
                    </div>
                    <div className="tip-btns">
                        <div className="btn-group">
                            <Link to="/login">
                                <Button type="primary" className="btn-home btn-login">
                                    登录 / 注册
                                </Button>
                            </Link>
                            <Button className="btn-home btn-home-normal">
                                <a target="_blank" rel="noopener noreferrer"
                                   href="https://hellosean1025.github.io/yapi">
                                    使用文档
                                </a>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}