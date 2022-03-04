<template>
    <div id="App" class="content-sub">
        <div class="cs-left">
            <AppListDownMenu :data.sync="menus" :isSidebarSmall.sync="isSidebarSmall" />
        </div>
        <div class="cs-right">
            <router-view />
        </div>
    </div>
</template>
<script>
import AppListDownMenu from '../modules/AppListDownMenu'

const menus = [
    {label: 'Products', icon: 'fa fa-lg fa-list-alt', link: 'listing'},
    {label: 'Toppings', icon: 'fa fa-lg fa-list-alt', link: 'toping'},
    {label: 'Categories', icon: 'fa fa-lg fa-list-alt', link: 'category'}
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