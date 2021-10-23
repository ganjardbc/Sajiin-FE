import About from '@/components/About.vue';

// layouts
import AdminLayout from '@/components/layouts/Admin.vue';
// import WebLayout from '@/components/layouts/Web.vue';
import CustomerLayout from '@/components/layouts/Customer.vue';
import AuthLayout from '@/components/layouts/Auth.vue';
import ProductLayout from '@/components/layouts/Product.vue';
import EmployeeLayout from '@/components/layouts/Employee.vue';

// admin
import Dashboard from '@/components/admin/Index.vue';
import NotFoundAdmin from '@/components/admin/404.vue';

// auth
import Login from '@/components/auth/Login.vue';
import Register from '@/components/auth/Register.vue';
import GenerateCustomer from '@/components/auth/GenerateCustomer.vue';

// web
// import Home from '@/components/web/Index.vue';
// import NotFoundWeb from '@/components/web/404.vue';
// import HowToOrders from '@/components/web/infos/HowToOrders.vue';
// import HowToJoin from '@/components/web/infos/HowToJoin.vue';
// import Pricing from '@/components/web/infos/Pricing.vue';
// import AboutUs from '@/components/web/infos/AboutUs.vue';
// import ArticlePublic from '@/components/web/articles/Index.vue';
// import ArticlePublicList from '@/components/web/articles/List.vue';
// import BenefitPublic from '@/components/web/benefits/Index.vue';
// import BenefitPublicList from '@/components/web/benefits/List.vue';

// admin
import Bizpar from '@/components/admin/bizpar/Index.vue';
import Shipment from '@/components/admin/shipment/Index.vue';
import Payment from '@/components/admin/payment/Index.vue';
import Category from '@/components/admin/category/Index.vue';
import ProductAdmin from '@/components/admin/product/Index.vue';
import Toping from '@/components/admin/toping/Index.vue';
import Customer from '@/components/admin/customer/Index.vue';
import Partner from '@/components/admin/partner/Index.vue';
import OrderList from '@/components/admin/order/Index.vue';
import OrderUnconfirmedList from '@/components/admin/order/Unconfirmed.vue';
import ArticleList from '@/components/admin/article/Index.vue';
import Feedback from '@/components/admin/feedback/Index.vue';
import Benefit from '@/components/admin/benefit/Index.vue';
import Role from '@/components/admin/role/Index.vue';
import UserList from '@/components/admin/user/Index.vue';
import CartList from '@/components/admin/cart/Index.vue';
import WisheList from '@/components/admin/wishelist/Index.vue';
import Permission from '@/components/admin/permission/Index.vue';
import Profile from '@/components/admin/profile/Index.vue';
import TableList from '@/components/admin/tables/Index.vue';
import VisitorList from '@/components/admin/visitors/Index.vue';
import Cashier from '@/components/admin/cashier/Index.vue';
// import Shops from '@/components/admin/shops/Index.vue';
import ShopForm from '@/components/admin/shops/IndexForm.vue';
import CatalogList from '@/components/admin/catalog/Index.vue';
import PositionList from '@/components/admin/position/Index.vue';
import EmployeeList from '@/components/admin/employee/Index.vue';
import EmployeeForm from '@/components/admin/employee/IndexForm.vue';
import ShiftList from '@/components/admin/shift/Index.vue';
import Notification from '@/components/admin/notification/Index.vue';
import TaskList from '@/components/admin/tasklist/Index.vue';

// customer
import CustomerMain from '@/components/customer/Index.vue';
import CustomerHome from '@/components/customer/home/Index.vue';
import CustomerProfile from '@/components/customer/profile/Index.vue';
import CustomerAccount from '@/components/customer/profile/Order.vue';
import CustomerFeedback from '@/components/customer/profile/Feedback.vue';
import CustomerWhiselist from '@/components/customer/profile/Whiselist.vue';
import CustomerNotifications from '@/components/customer/notifications/Index.vue';
import CustomerSearch from '@/components/customer/search/Index.vue';
import CustomerOrderList from '@/components/customer/orders/List.vue';
import CustomerChart from '@/components/customer/charts/Index.vue';
import CustomerOrder from '@/components/customer/orders/Index.vue';
import CustomerDetail from '@/components/customer/orders/Detail.vue';
import CustomerTracking from '@/components/customer/tracking/Index.vue';
import CustomerFinding from '@/components/customer/tracking/Finding.vue';
import CustomerProduct from '@/components/customer/products/Index.vue';
import CustomerProductList from '@/components/customer/products/List.vue';
import CustomerTable from '@/components/customer/table/Index.vue';
import CustomerPayment from '@/components/customer/payment/Index.vue';
import CustomerQR from '@/components/customer/qr/Index.vue';

export const routes = [
    // web
    {
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
        ]
    },
    // {
    //     path: '/',
    //     component: WebLayout,
    //     children: [
    //         {
    //             name: '404WEB',
    //             path: '/not-found-web',
    //             component: NotFoundWeb
    //         },
    //         // main
    //         {
    //             name: 'home',
    //             path: '/',
    //             component: Home
    //         },
    //         {
    //             name: 'home2',
    //             path: '/home',
    //             component: Home
    //         },

    //         // auth
    //         {
    //             name: 'login',
    //             path: '/login',
    //             component: Login
    //         },
    //         {
    //             name: 'register',
    //             path: '/register',
    //             component: Register
    //         },
    //         {
    //             name: 'generate-customer',
    //             path: '/generate-customer/:token',
    //             component: GenerateCustomer
    //         },

    //         // articles
    //         {
    //             name: 'articles',
    //             path: '/articles',
    //             component: ArticlePublicList
    //         },
    //         {
    //             name: 'article',
    //             path: '/article/:id',
    //             components: {
    //                 webfresh: ArticlePublic
    //             }
    //         },

    //         // benefits
    //         {
    //             name: 'benefits',
    //             path: '/benefits',
    //             component: BenefitPublicList
    //         },
    //         {
    //             name: 'benefit',
    //             path: '/benefit/:id',
    //             components: {
    //                 webfresh: BenefitPublic
    //             }
    //         },

    //         // info
    //         {
    //             name: 'about',
    //             path: '/about',
    //             component: About
    //         },
    //         {
    //             name: 'how-to-orders',
    //             path: '/how-to-orders',
    //             component: HowToOrders
    //         },
    //         {
    //             name: 'how-to-join',
    //             path: '/how-to-join',
    //             component: HowToJoin
    //         },
    //         {
    //             name: 'pricing',
    //             path: '/pricing',
    //             component: Pricing 
    //         },
    //         {
    //             name: 'about-us',
    //             path: '/about-us',
    //             component: AboutUs
    //         }
    //     ]
    // },

    // admin
    {
        path: '/private',
        component: AdminLayout,
        children: [
            {
                name: 'dashboard',
                path: '/admin-dashboard',
                component: Dashboard
            },
            {
                name: 'profile',
                path: '/admin-profile',
                component: Profile
            },

            // admin
            {
                name: 'shop',
                path: '/admin-form-shop',
                component: ShopForm
            },
            {
                name: 'employeeform',
                path: '/admin-form-employee',
                component: EmployeeForm
            },
            {
                name: 'cashier',
                path: '/admin-cashier',
                component: Cashier
            },
            {
                name: 'bizpar',
                path: '/admin-bizpar',
                component: Bizpar
            },
            {
                name: 'customer',
                path: '/admin-customer',
                component: Customer
            },
            {
                name: 'partner',
                path: '/admin-partner',
                component: Partner
            },
            {
                name: 'orderlist',
                path: '/admin-order-list',
                component: OrderList
            },
            {
                name: 'order-unconfirmed-list',
                path: '/admin-order-unconfirmed-list',
                component: OrderUnconfirmedList
            },
            {
                name: 'articlelist',
                path: '/admin-article-list',
                component: ArticleList
            },
            {
                name: 'feedback',
                path: '/admin-feedback',
                component: Feedback
            },
            {
                name: 'benefitlist',
                path: '/admin-benefit',
                component: Benefit
            },
            {
                name: 'role',
                path: '/admin-role',
                component: Role
            },
            {
                name: 'permission',
                path: '/admin-permission',
                component: Permission
            },
            {
                name: 'userlist',
                path: '/admin-user-list',
                component: UserList
            },
            {
                name: 'wishelist',
                path: '/admin-wishelist',
                component: WisheList
            },
            {
                name: 'cartList',
                path: '/admin-cart-list',
                component: CartList
            },
            {
                name: 'table',
                path: '/admin-tables',
                component: TableList
            },
            {
                name: 'visitor',
                path: '/admin-visitors',
                component: VisitorList
            },
            {
                name: 'shipment',
                path: '/admin-shipments',
                component: Shipment
            },
            {
                name: 'payment',
                path: '/admin-payments',
                component: Payment
            },
            {
                name: 'notification',
                path: '/admin-notifications',
                component: Notification
            },
            {
                name: 'tasklist',
                path: '/admin-tasklist',
                component: TaskList
            },

            // info
            {
                name: '404',
                path: '/admin-not-found',
                component: NotFoundAdmin
            },

            // layout
            {
                name: 'admin-product',
                path: '/admin-product',
                component: ProductLayout,
                redirect: '/admin-product/listings',
                children: [
                    {
                        name: 'category',
                        path: 'categories',
                        component: Category
                    },
                    {
                        name: 'toping',
                        path: 'topings',
                        component: Toping
                    },
                    {
                        name: 'listing',
                        path: 'listings',
                        component: ProductAdmin
                    },
                    {
                        name: 'catalog',
                        path: 'catalogs',
                        component: CatalogList
                    }
                ]
            },

            // layout
            {
                name: 'admin-employee',
                path: '/admin-employee',
                component: EmployeeLayout,
                redirect: '/admin-employee/employees',
                children: [
                    {
                        name: 'employee',
                        path: 'employees',
                        component: EmployeeList
                    },
                    {
                        name: 'shift',
                        path: 'shifts',
                        component: ShiftList
                    },
                    {
                        name: 'position',
                        path: 'positions',
                        component: PositionList
                    }
                ]
            },

            // {
            //     name: 'admin-shop',
            //     path: '/admin-shop',
            //     component: ShopLayout,
            //     redirect: '/admin-shop/shops',
            //     children: [
            //         {
            //             name: 'shops',
            //             path: 'shops',
            //             component: Shops
            //         },
            //         {
            //             name: 'category',
            //             path: 'categories',
            //             component: Category
            //         },
            //         {
            //             name: 'toping',
            //             path: 'topings',
            //             component: Toping
            //         },
            //         {
            //             name: 'listing',
            //             path: 'listing',
            //             component: ProductAdmin
            //         },
            //         {
            //             name: 'position',
            //             path: 'positions',
            //             component: PositionList
            //         }
            //     ]
            // }
        ]
    },

    // customer
    {
        path: '/customer',
        component: CustomerLayout,
        children: [
            {
                name: 'customer-home',
                path: 'home',
                component: CustomerHome
            },
            {
                name: 'customer-main',
                path: 'main',
                component: CustomerMain
            },
            {
                name: 'customer-table',
                path: 'tables',
                component: CustomerTable
            },
            {
                name: 'customer-payment',
                path: 'payments',
                component: CustomerPayment
            },

            // product
            {
                name: 'product',
                path: 'product/:id',
                component: CustomerProduct
            },
            {
                name: 'product-list',
                path: 'product-list',
                component: CustomerProductList
            },

            // notification
            {
                name: 'customer-notifications',
                path: 'notifications',
                component: CustomerNotifications
            },

            // charts
            {
                name: 'customer-chart',
                path: 'carts',
                component: CustomerChart
            },

            // orders
            {
                name: 'order', 
                path: 'order',
                component: CustomerOrder
            },
            {
                name: 'order-detail', 
                path: 'order-detail/:id',
                component: CustomerDetail
            },
            {
                name: 'tracking',
                path: 'order-tracking',
                component: CustomerTracking
            },
            {
                name: 'tracking-finding',
                path: 'order-tracking-finding',
                component: CustomerFinding
            },

            // search
            {
                path: 'search',
                name: 'customer-search',
                component: CustomerSearch
            },

            {
                name: 'customer-order-list',
                path: 'order-list',
                component: CustomerOrderList
            },

            {
                name: 'customer-feedback',
                path: 'feedback',
                component: CustomerFeedback
            },
            {
                name: 'customer-whiselist',
                path: 'whiselist',
                component: CustomerWhiselist
            },

            // account
            {
                path: 'account',
                name: 'customer-profile',
                component: CustomerProfile,
            },
            {
                name: 'customer-order',
                path: 'orders',
                component: CustomerAccount
            },

            // modules
            {
                path: 'customer-qr',
                name: 'customer-qr',
                component: CustomerQR
            }
        ]
    }
];