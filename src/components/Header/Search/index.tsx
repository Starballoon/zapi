import {ReactElement} from 'react';
import axios from 'axios';
import {AutoComplete, Input} from 'antd';
import {SearchOutlined} from '@ant-design/icons';
import {changeMenuItem} from '../../../reducer/modules/menu.ts';
import './Search.scss';
import {useNavigate} from 'react-router-dom';
import {fetchGroupMsg, setCurrGroup} from '../../../reducer/modules/group.ts';
import {useAppDispatch} from '../../../utils.ts';
import {fetchInterfaceListMenu} from '../../../reducer/modules/interface.ts';

// const Option = AutoComplete.Option;

type SearchOption =
    {
        // 保留了原YApi写法，value不知道有什么用处
        value: string,
        label: ReactElement
    }
    & ({
    type: '分组',
    group: GroupVo
} | {
    type: '项目',
    project: ProjectVo
} | {
    type: '接口',
    interface: InterfaceVo
});

interface SearchState {
    groupList?: [],
    projectList: [],
    // 替代原有的dataSource
    searchOptions: SearchOption[]
}

// 搜索结果中的ProjectVo
interface ProjectVo {
    _id: string,
    name: string,
    basepath: string,
    uid: number,
    env: unknown,
    members: {
        uid: number,
        role: 'owner' | 'dev',
        username: string,
        email: string,
        email_notice: boolean
    }[],
    groupId: number,
    upTime: number,
    addTime: number
}

// 搜索结果中的模块VO
interface GroupVo {
    _id: string,
    uid: number,
    groupName: string,
    groupDesc: string,
    addTime: number,
    upTime: number
}

// 搜索结果中的接口VO
interface InterfaceVo {
    _id: string,
    uid: number,
    title: string,
    projectId: number,
    addTime: number,
    upTime: number
}

interface SearchResult {
    project?: ProjectVo[],
    group?: GroupVo[],
    interface?: InterfaceVo[]
}

function createOptions(data: SearchResult) {
    // const options: {
    //     key: string, type: string, id: string,
    //     value?: string, groupId?: string, projectId?: string
    // }[] = [];
    // data['group']?.forEach(item => {
    //     options.push({
    //             key: `分组${item._id}`,
    //             type: '分组',
    //             value: `${item.groupName}`,
    //             id: `${item._id}`,
    //         }
    //     );
    // });
    // data['project']?.forEach(item => {
    //     options.push({
    //             key: `项目${item._id}`,
    //             type: '项目',
    //             groupId: `${item.groupId}`,
    //             id: `${item._id}`,
    //         }
    //     );
    // });
    // data['interface']?.forEach(item => {
    //     options.push({
    //             key: `接口${item._id}`,
    //             type: '接口',
    //             projectId: `${item.projectId}`,
    //             id: `${item._id}`,
    //         }
    //     );
    // });
    const options: SearchOption[] = [];
    data['group']?.forEach(item => {
        options.push({
            value: `分组${item._id}`,
            label: <span>`分组: ${item.groupName}`</span>,
            type: '分组',
            group: item
        });
    });
    data['project']?.forEach(item => {
        options.push({
            value: `项目${item._id}`,
            label: <span>`项目: ${item.name}`</span>,
            type: '项目',
            project: item
        });
    });
    data['interface']?.forEach(item => {
        options.push({
            value: `接口${item._id}`,
            label: <span>`接口: ${item.title}`</span>,
            type: '接口',
            interface: item
        });
    });
    return options;
}

export default function Search({groupList}: {
    groupList?: []
}) {
    const props: SearchState = {
        groupList,
        projectList: [],
        searchOptions: []
    };
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const onSelect = async (_value: string, option: SearchOption) => {
        if (option.type === '分组') {
            dispatch(changeMenuItem('/group'));
            navigate('/group/' + option.group._id);
            dispatch(setCurrGroup({/*group_name: value, */_id: +option.group._id}));
        } else if (option.type === '项目') {
            dispatch(await fetchGroupMsg(option.project.groupId));
            navigate('/project/' + option.project._id);
        } else if (option.type === '接口') {
            dispatch(await fetchInterfaceListMenu(option.interface.projectId));
            navigate('/project/' + option.interface.projectId + '/interface/api/' + option.interface._id);
        }
    };

    // TODO 所以Redux只处理全局共享状态？
    const handleSearch = (value: string) => {
        axios.get('/api/project/search?q=' + value)
            .then(res => {
                if (res.data && res.data.errcode === 0) {
                    props.searchOptions = createOptions(res.data.data);
                } else {
                    console.log('查询项目或分组失败');
                }
            });
    };
    return (
        <div className="search-wrapper">
            <AutoComplete
                className="search-dropdown"
                options={props.searchOptions}
                style={{width: '100%'}}
                defaultActiveFirstOption={false}
                onSelect={onSelect}
                onSearch={handleSearch}
                // filterOption={(inputValue, option) =>
                //   option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                // }
            >
                {/*<Input.Search/>*/}
                <Input
                    prefix={<SearchOutlined className="srch-icon"/>}
                    placeholder="搜索分组/项目/接口"
                    className="search-input"/>
            </AutoComplete>
        </div>
    );
}