import AuthLayout from '@/components/layouts/Auth.vue';

// auth
import Login from '@/components/auth/Login.vue';
// import Register from '@/components/auth/Register.vue';
// import GenerateCustomer from '@/components/auth/GenerateCustomer.vue';
import VisitShop from '@/components/auth/VisitShop.vue';

const routes = {
    path: '/',
    component: AuthLayout,
    children: [
        {
            name: 'home',
            path: '/',
            component: Login
        },
        {
            name: 'login',
            path: '/login',
            component: Login
        },
        // {
        //     name: 'register',
        //     path: '/register',
        //     component: Register
        // },
        // {
        //     name: 'generate-customer',
        //     path: '/generate-customer/:token',
        //     component: GenerateCustomer
        // },
        {
            name: 'visit-shop',
            path: '/visit-shop/:idshop',
            component: VisitShop
        }
    ]
}

export default routes