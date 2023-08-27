import {ReactElement} from 'react';
import {Link} from 'react-router-dom';
import {Button,/*Avatar,*/ Dropdown, MenuProps, Popover, Tag, Tooltip} from 'antd';
import {
    StarOutlined,
    PlusCircleOutlined,
    QuestionCircleOutlined,
    DownOutlined,
    UserOutlined,
    SolutionOutlined, LogoutOutlined
} from '@ant-design/icons';
import {UserState} from '../../reducer/modules/user.ts';
import Search from './Search';
import GuideBtns from '../GuideBtns';

type ToolUserState =
    Pick<UserState, 'uid' | 'role' | 'studyTip' | 'study' | 'imageUrl'>
    // 纯粹是因为这命名倒来倒去
    & { user: UserState['userName'] }
    & { msg: string | null }
    & { relieveLink: () => void, logout: () => void, groupList?: [] };

const tipFollow = (
    <div className="title-container">
        <h3 className="title">
            <StarOutlined/> 关注
        </h3>
        <p>这里是你的专属收藏夹，便于你找到自己的项目</p>
    </div>
);
const tipAdd = (
    <div className="title-container">
        <h3 className="title">
            <PlusCircleOutlined/>新建项目
        </h3>
        <p>在任何页面都可以快速新建项目</p>
    </div>
);
const tipDoc = (
    <div className="title-container">
        <h3 className="title">
            使用文档 <Tag color="orange">推荐!</Tag>
        </h3>
        <p>
            初次使用 YApi，强烈建议你阅读{' '}
            <a target="_blank" href="https://hellosean1025.github.io/yapi/" rel="noopener noreferrer">
                使用文档
            </a>
            ，我们为你提供了通俗易懂的快速入门教程，更有详细的使用说明，欢迎阅读！{' '}
        </p>
    </div>
);

const HeaderMenu: {
    [k: string]: {
        path: string,
        name: string,
        icon: ReactElement,
        adminFlag: boolean
    }
} = {
    user: {
        path: '/user/profile',
        name: '个人中心',
        icon: <UserOutlined/>,
        adminFlag: false
    },
    solution: {
        path: '/user/list',
        name: '用户管理',
        icon: <SolutionOutlined/>,
        adminFlag: true
    }
};

// TODO YApi插件插入位置
// plugin.emitHook('header_menu', HeaderMenu);

// YApi的实现
const MenuUser = (props: ToolUserState) => {
    const items: MenuProps['items'] = [];
    Object.keys(HeaderMenu).forEach(key => {
        const item = HeaderMenu[key];
        const isAdmin = props.role === 'admin';
        if (item.adminFlag == isAdmin) {
            let link;
            if (item.name === '个人中心') {
                link = <Link to={item.path + `/${props.uid}`}>{item.icon}{item.name}</Link>;
            } else {
                link = <Link to={item.path}>{item.icon}{item.name}</Link>;
            }
            items.push({key, label: link});
        }
    });
    items.push({key: '9', label: (<Button onClick={props.logout} icon={<LogoutOutlined/>}>退出</Button>)});
    return items;
};

export default function ToolUser(props: ToolUserState) {
    const imageUrl = props.imageUrl ? props.imageUrl : `/api/user/avatar?uid=${props.uid}`;
    return (
        <ul>
            <li className="toolbar-li item-search">
                <Search groupList={props.groupList}/>
            </li>
            <Popover
                overlayClassName="popover-index"
                content={<GuideBtns/>}
                title={tipFollow}
                placement="bottomRight"
                arrow={{arrowPointAtCenter: true}}
                open={props.studyTip === 1 && !props.study}
            >
                <Tooltip placement="bottom" title={'我的关注'}>
                    <li className="toolbar-li">
                        <Link to="/follow">
                            <StarOutlined className="dropdown-link" style={{fontSize: 16}}/>
                        </Link>
                    </li>
                </Tooltip>
            </Popover>
            <Popover
                overlayClassName="popover-index"
                content={<GuideBtns />}
                title={tipAdd}
                placement="bottomRight"
                arrow={{arrowPointAtCenter: true}}
                open={props.studyTip === 2 && !props.study}
            >
                <Tooltip placement="bottom" title={'新建项目'}>
                    <li className="toolbar-li">
                        <Link to="/add-project">
                            <PlusCircleOutlined className="dropdown-link" style={{fontSize: 16}}/>
                        </Link>
                    </li>
                </Tooltip>
            </Popover>
            <Popover
                overlayClassName="popover-index"
                content={<GuideBtns isLast={true} />}
                title={tipDoc}
                placement="bottomRight"
                arrow={{arrowPointAtCenter: true}}
                open={props.studyTip === 3 && !props.study}
            >
                <Tooltip placement="bottom" title={'使用文档'}>
                    <li className="toolbar-li">
                        <a target="_blank" href="https://hellosean1025.github.io/yapi" rel="noopener noreferrer">
                            <QuestionCircleOutlined className="dropdown-link" style={{fontSize: 16}}/>
                        </a>
                    </li>
                </Tooltip>
            </Popover>
            <li className="toolbar-li">
                <Dropdown
                    placement="bottomRight"
                    trigger={['click']}
                    menu={{items: MenuUser(props)}}
                >
                    <a className="dropdown-link">
                        <span className="avatar-image">
                            <img src={imageUrl}/>
                        </span>
                        {/*{props.imageUrl*/}
                        {/*    ? <Avatar src={props.imageUrl}/>*/}
                        {/*    : <Avatar src={`/api/user/avatar?uid=${props.uid}`}/>}*/}
                        <span className="name">
                            <DownOutlined/>
                        </span>
                    </a>
                </Dropdown>
            </li>
        </ul>
    );
}