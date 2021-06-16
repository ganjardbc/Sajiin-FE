<template>
    <div id="Shop" class="display-flex">
        <div style="width: 210px; height: calc(100vh - 60px); padding-left: 20px; padding-right: 20px; overflow-y: auto; background-color: #fff;">
            <div class="fonts fonts-11 black" style="padding-left: 15px; padding-top: 20px; padding-bottom: 0;">MASTERDATA</div>
            <div style="padding-top: 5px;">
                <AppListDownMenu :data.sync="menus" :isSidebarSmall.sync="isSidebarSmall" />
            </div>
        </div>
        <div style="width: calc(100% - 250px);">
            <router-view />
        </div>
    </div>
</template>
<script>
import AppListDownMenu from '../modules/AppListDownMenu'

const menus = [
    {label: 'Shops', icon: 'fa fa-lg fa-store', link: 'shops'},
    {label: 'Categories', icon: 'fa fa-lg fa-list-alt', link: 'category'},
    {label: 'Toppings', icon: 'fa fa-lg fa-list-alt', link: 'toping'},
    {label: 'Products', icon: 'fa fa-lg fa-box', link: 'listing'},
    // {label: 'Shipments', icon: 'fa fa-lg fa-truck', link: 'shipment'},
    // {label: 'Payments', icon: 'fa fa-lg fa-calculator', link: 'payment'},
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