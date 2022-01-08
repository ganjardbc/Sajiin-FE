import WebLayout from '@/components/layouts/Web.vue';
import Home from '@/components/web/Index.vue';
import NotFoundWeb from '@/components/web/404.vue';
import HowToOrders from '@/components/web/infos/HowToOrders.vue';
import HowToJoin from '@/components/web/infos/HowToJoin.vue';
import Pricing from '@/components/web/infos/Pricing.vue';
import AboutUs from '@/components/web/infos/AboutUs.vue';
import ArticlePublic from '@/components/web/articles/Index.vue';
import ArticlePublicList from '@/components/web/articles/List.vue';
import BenefitPublic from '@/components/web/benefits/Index.vue';
import BenefitPublicList from '@/components/web/benefits/List.vue';

const routes = {
    path: '/',
    component: WebLayout,
    children: [
        {
            name: '404WEB',
            path: '/not-found-web',
            component: NotFoundWeb
        },
        // main
        {
            name: 'home',
            path: '/',
            component: Home
        },
        {
            name: 'home2',
            path: '/home',
            component: Home
        },

        // auth
        {
            name: 'login',
            path: '/login',
            component: Login
        },
        {
            name: 'register',
            path: '/register',
            component: Register
        },
        {
            name: 'generate-customer',
            path: '/generate-customer/:token',
            component: GenerateCustomer
        },

        // articles
        {
            name: 'articles',
            path: '/articles',
            component: ArticlePublicList
        },
        {
            name: 'article',
            path: '/article/:id',
            components: {
                webfresh: ArticlePublic
            }
        },

        // benefits
        {
            name: 'benefits',
            path: '/benefits',
            component: BenefitPublicList
        },
        {
            name: 'benefit',
            path: '/benefit/:id',
            components: {
                webfresh: BenefitPublic
            }
        },

        // info
        {
            name: 'about',
            path: '/about',
            component: About
        },
        {
            name: 'how-to-orders',
            path: '/how-to-orders',
            component: HowToOrders
        },
        {
            name: 'how-to-join',
            path: '/how-to-join',
            component: HowToJoin
        },
        {
            name: 'pricing',
            path: '/pricing',
            component: Pricing 
        },
        {
            name: 'about-us',
            path: '/about-us',
            component: AboutUs
        }
    ]
},

export default routes