<template>
    <div id="Shop" class="content-sub">
        <div class="cs-left">
            <div class="cs-submenu">
                <AppListDownMenu :data.sync="menus" :isSidebarSmall.sync="isSidebarSmall" />
            </div>
        </div>
        <div class="cs-right">
            <router-view />
        </div>
    </div>
</template>
<script>
import AppListDownMenu from '../modules/AppListDownMenu'

const menus = [
    {label: 'Shop', icon: 'fa fa-lg fa-store', link: 'admin-shop-form'},
    {label: 'Products', icon: 'fa fa-lg fa-utensils', link: 'listing'},
    {label: 'Toppings', icon: 'fa fa-lg fa-box', link: 'toping'},
    {label: 'Categories', icon: 'fa fa-lg fa-list-alt', link: 'category'},
    // {label: 'Shipments', icon: 'fa fa-lg fa-truck', link: 'shipment'},
    {label: 'Payments', icon: 'fa fa-lg fa-calculator', link: 'admin-shop-payment'},
    {label: 'Tables', icon: 'fa fa-lg fa-th-large', link: 'admin-shop-table'},
    // {label: 'Job Positions', icon: 'fa fa-lg fa-flag', link: 'position'},
    // {label: 'Users', icon: 'fa fa-lg fa-users', link: 'shipment'},
    // {label: 'Order History', icon: 'fa fa-lg fa-receipt', link: 'shipment'},
    // {label: 'Reports', icon: 'fa fa-lg fa-calendar-alt', link: 'shipment'},
]

export default {
    name: 'Shop',
    data () {
        return {
            menus: menus,
            isSidebarSmall: false 
        }
    },
    components: {
        AppListDownMenu
    }
}
</script>