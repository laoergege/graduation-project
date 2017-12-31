import App from './app';
import Index from '../../ui/pages/index';

//基本路由配置
export default [
    // index
    { 
        path: '/', 
        exact: true,
        component: App
    },
    // app
    // {
    //     path: '/',
    //     component: App,
    //     indexRoute: {
    //         component: Index
    //     }
    // }
    // login
    // 404
    // 500
]