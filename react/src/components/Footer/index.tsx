import {ReactElement} from 'react';
import {Row, Col} from 'antd';
import {AliwangwangOutlined, GithubOutlined, TeamOutlined} from '@ant-design/icons';
import './Footer.scss';

interface FootItemState {
    title: string,
    iconType?: ReactElement,
    linkList: { itemTitle: string, itemLink: string }[]
}

const footList: FootItemState[] = [
    {
        title: 'GitHub',
        iconType: <GithubOutlined className="icon"/>,
        linkList: [
            {
                itemTitle: 'YApi 源码仓库',
                itemLink: 'https://github.com/YMFE/yapi'
            }
        ]
    },
    {
        title: '团队',
        iconType: <TeamOutlined className="icon"/>,
        linkList: [
            {
                itemTitle: 'YMFE',
                itemLink: 'https://ymfe.org'
            }
        ]
    },
    {
        title: '反馈',
        iconType: <AliwangwangOutlined className="icon"/>,
        linkList: [
            {
                itemTitle: 'Github Issues',
                itemLink: 'https://github.com/YMFE/yapi/issues'
            },
            {
                itemTitle: 'Github Pull Requests',
                itemLink: 'https://github.com/YMFE/yapi/pulls'
            }
        ]
    },
    {
        title: `Copyright © 2018-${new Date().getFullYear()} YMFE`,
        linkList: [
            {
                itemTitle: `版本: ${import.meta.env.version} `,
                itemLink: 'https://github.com/YMFE/yapi/blob/master/CHANGELOG.md'
            },
            {
                itemTitle: '使用文档',
                itemLink: 'https://hellosean1025.github.io/yapi/'
            }
        ]
    }
];


function FootItem(props: FootItemState) {
    return (
        <Col span={6}>
            <h4 className="title">
                {props.iconType && props.iconType}
                {props.title}
            </h4>
            {props.linkList.map((item, i) =>
                <p key={i}>
                    <a href={item.itemLink} className="link">
                        {item.itemTitle}
                    </a>
                </p>
            )}
        </Col>
    );
}

export default function Footer() {
    return (
        <div className="footer-wrapper">
            <Row className="footer-container">
                {footList.map((item, index) => <FootItem key={index} {...item}/>)}
            </Row>
        </div>
    );
}