import CustomerLayout from '@/components/layouts/Customer.vue';
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

const routes = {
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

export default routes