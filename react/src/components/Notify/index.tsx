import {useEffect, useState} from 'react';
// import axios from 'axios';
import {Alert/*, message*/} from 'antd';

export default function Notify() {
    const [newVersion/*, setNewVersion*/] = useState(import.meta.env.version);
    const [version] = useState(import.meta.env.version);

    // 替换componentDidMount生命周期函数，但是为什么要访问这个API呢？
    useEffect(() => {
        // const versions = 'https://www.fastmock.site/mock/1529fa78fa4c4880ad153d115084a940/yapi/versions';
        // axios.get(versions).then(req => {
        //     if (req.status === 200) {
        //         setNewVersion(req.data.data[0]);
        //     } else {
        //         message.error('无法获取新版本信息！');
        //     }
        // });
    }, []);

    return (
        <div>
            {newVersion !== version &&
                <Alert message={
                    <div>
                        当前版本是：{version}&nbsp;&nbsp;可升级到: {newVersion}
                        &nbsp;&nbsp;&nbsp;
                        <a
                            target="view_window"
                            // 重定向到zapi地址
                            href="https://github.com/Starballoon/zapi#readme"
                        >
                            版本详情
                        </a>
                    </div>
                }/>
            }
        </div>
    );
}