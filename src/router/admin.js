import AdminLayout from '@/components/layouts/Admin.vue';
import ProductLayout from '@/components/layouts/Product.vue';
import ShopLayout from '@/components/layouts/Shop.vue';
import SettingLayout from '@/components/layouts/Setting.vue';
import EmployeeLayout from '@/components/layouts/Employee.vue';
import Dashboard from '@/components/admin/Index.vue';
import NotFoundAdmin from '@/components/admin/404.vue';
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
import Shops from '@/components/admin/shops/Index.vue';
import ShopForm from '@/components/admin/shops/IndexForm.vue';
import CatalogList from '@/components/admin/catalog/Index.vue';
import PositionList from '@/components/admin/position/Index.vue';
import EmployeeList from '@/components/admin/employee/Index.vue';
import EmployeeForm from '@/components/admin/employee/IndexForm.vue';
import ShiftList from '@/components/admin/shift/Index.vue';
import Notification from '@/components/admin/notification/Index.vue';
import TaskList from '@/components/admin/tasklist/Index.vue';

const routes = {
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
            name: 'admin-employee-form',
            path: '/admin-employee-form',
            component: EmployeeForm
        },
        {
            name: 'cashier',
            path: '/admin-cashier',
            component: Cashier
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
            name: 'admin-tasklist',
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

        // employee
        {
            name: 'admin-employee',
            path: '/admin-employee',
            component: EmployeeLayout,
            redirect: '/admin-employee/employees',
            children: [
                {
                    name: 'admin-employee-employee',
                    path: 'employees',
                    component: EmployeeList
                },
                {
                    name: 'admin-employee-shift',
                    path: 'shifts',
                    component: ShiftList
                },
                {
                    name: 'admin-employee-position',
                    path: 'positions',
                    component: PositionList
                },
            ]
        },

        // shop
        {
            name: 'admin-shop',
            path: '/admin-shop',
            component: ShopLayout,
            redirect: '/admin-shop/shops',
            children: [
                {
                    name: 'admin-shop-shops',
                    path: 'shops',
                    component: Shops
                },
                {
                    name: 'admin-shop-form',
                    path: 'form',
                    component: ShopForm
                },
                {
                    name: 'admin-shop-payment',
                    path: 'payments',
                    component: Payment
                },
                {
                    name: 'admin-shop-table',
                    path: 'tables',
                    component: TableList
                },
            ]
        },
        {
            name: 'admin-setting',
            path: '/admin-setting',
            component: SettingLayout,
            redirect: '/admin-setting/user-list',
            children: [
                // {
                //     name: 'profile',
                //     path: 'profile',
                //     component: Profile
                // },
                {
                    name: 'bizpar',
                    path: 'bizpar',
                    component: Bizpar
                },
                {
                    name: 'role',
                    path: 'role',
                    component: Role
                },
                {
                    name: 'permission',
                    path: 'permission',
                    component: Permission
                },
                {
                    name: 'userlist',
                    path: 'user-list',
                    component: UserList
                },
            ]
        }
    ]
}

export default routes 