import loadable from '@loadable/component';

const routes = [
    {
        path: '/info/detail',
        component: loadable(() => import('./pages/DetailInfo')),
    },
    {
        path: '/info/main',
        component: loadable(() => import('./pages/MainInfo')),
    },
];

export default routes;
