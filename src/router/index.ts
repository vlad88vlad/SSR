import loadable from '@loadable/component';

const routes = [
    {
        path: '/about',
        component: loadable(() => import('../pages/About/About')),
    },
    {
        path: '/info',
        component: loadable(() => import('../pages/Info/Info')),
    },
    {
        path: '/todo/:id',
        component: loadable(() => import('../pages/TodoDetail/TodoDetail')),
    },
    {
        path: '/todo',
        component: loadable(() => import('../pages/Todo/Todo')),
    },
    {
        path: '/',
        component: loadable(() => import('../pages/Home/Home')),
    },
];

export default routes;
