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
        path: '/',
        component: loadable(() => import('../pages/Home/Home')),
    },
];

export default routes;
