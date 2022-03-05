import VisitorLayout from '@/components/layouts/Visitor.vue';
import VisitorShop from '@/components/visitor/shop/Index.vue';
import VisitorProductDetail from '@/components/visitor/product/Detail.vue';
import VisitorCart from '@/components/visitor/cart/Index.vue';
import VisitorOrder from '@/components/visitor/order/Index.vue';
import VisitorPayment from '@/components/visitor/payment/Index.vue';
import VisitorTable from '@/components/visitor/table/Index.vue';
import VisitorQR from '@/components/visitor/qr/Index.vue';

const routes = {
    path: '/visitor',
    component: VisitorLayout,
    children: [
        {
            name: 'visitor-shop',
            path: 'shop',
            component: VisitorShop 
        },
        {
            name: 'visitor-product-detail',
            path: 'product/:id',
            component: VisitorProductDetail
        },
        {
            name: 'visitor-cart',
            path: 'carts',
            component: VisitorCart
        },
        {
            name: 'visitor-create-order',
            path: 'create-order',
            component: VisitorOrder
        },
        {
            name: 'visitor-chose-payment',
            path: 'chose-payment',
            component: VisitorPayment
        },
        {
            name: 'visitor-chose-table',
            path: 'chose-table',
            component: VisitorTable
        },
        {
            path: 'visitor-qr',
            name: 'visitor-qr',
            component: VisitorQR
        }
    ]
}

export default routes 