import './Breadcrumb.scss';
import {useAppSelector} from '../../utils.ts';
import {Breadcrumb} from 'antd';
import {Link} from 'react-router-dom';

export default function BreadcrumbNavigation() {
    const breadcrumb = useAppSelector(state => state.user.breadcrumb);
    return (
        <div className="breadcrumb-container">
            <Breadcrumb>
                {breadcrumb.map((item, index) => {
                    if (item.href) {
                        return (
                            <Breadcrumb.Item key={index}>
                                <Link to={item.href}>{item.name}</Link>
                            </Breadcrumb.Item>
                        );
                    } else {
                        return (
                            <Breadcrumb.Item key={index}>
                                {item.name}
                            </Breadcrumb.Item>
                        );
                    }
                })}
            </Breadcrumb>
        </div>
    );
}