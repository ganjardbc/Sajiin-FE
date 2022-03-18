<template>
    <div id="App" class="content-sub">
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
    {label: 'Products', icon: 'fa fa-lg fa-utensils', link: 'listing', permission: 'products'},
    {label: 'Toppings', icon: 'fa fa-lg fa-box', link: 'toping', permission: 'toppings'},
    {label: 'Categories', icon: 'fa fa-lg fa-list-alt', link: 'category', permission: 'categories'},
]

export default {
    name: 'App',
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