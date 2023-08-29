import {ReactElement} from 'react';
import {Route, Routes} from 'react-router-dom';
import {Home, Login} from './container';
// const plugin = require('client/plugin.js');

export const AppRoute: { [k: string]: { path: string, component: ReactElement } } = {
    home: {
        path: '/',
        component: <Home/>
    },
    // group: {
    //     path: '/group',
    //     component: Group
    // },
    // project: {
    //     path: '/project/:id',
    //     component: Project
    // },
    // user: {
    //     path: '/user',
    //     component: User
    // },
    // follow: {
    //     path: '/follow',
    //     component: Follows
    // },
    // addProject: {
    //     path: '/add-project',
    //     component: AddProject
    // },
    login: {
        path: '/login',
        component: <Login/>
    }
};

// 增加路由钩子
// plugin.emitHook('app_route', AppRoute);

export default function AppRoutes() {
    return (
        <div className="router-container">
            <Routes>
                {Object.keys(AppRoute).map(key => {
                    const item = AppRoute[key];
                    switch (key) {
                        case 'login':
                            return <Route key={key} path={item.path} element={item.component}/>;
                        case 'home':
                            return <Route key={key} path={item.path} element={item.component}/>;
                        default:
                            return <Route key={key} path={item.path}
                                          element={/*requireAuthentication*/(item.component)}/>;
                    }
                })}
            </Routes>
        </div>
    );
}