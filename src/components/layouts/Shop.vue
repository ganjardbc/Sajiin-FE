<template>
    <div id="Shop" class="content-sub">
        <div class="cs-left">
            <div class="cs-submenu">
                <AppListDownMenu 
                    :data.sync="menus" 
                    :isSidebarSmall.sync="isSidebarSmall" />
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
    {label: 'Shops', icon: 'fa fa-lg fa-store', link: 'admin-shop-shops', permission: 'shops'},
    {label: 'Payments', icon: 'fa fa-lg fa-calculator', link: 'admin-shop-payment', permission: 'payments'},
    {label: 'Tables', icon: 'fa fa-lg fa-th-large', link: 'admin-shop-table', permission: 'tables'},
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