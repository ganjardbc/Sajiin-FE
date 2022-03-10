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
    // {label: 'Products', icon: 'fa fa-lg fa-list-alt', link: 'listing'},
    // {label: 'Toppings', icon: 'fa fa-lg fa-list-alt', link: 'toping'},
    // {label: 'Categories', icon: 'fa fa-lg fa-list-alt', link: 'category'},
    // {icon: 'fa fa-lg fa-user', label: 'Profile', link: 'profile'},
    {icon: 'fa fa-lg fa-tag', label: 'Bizpars', link: 'bizpar'},
    {icon: 'fa fa-lg fa-lock', label: 'Permissions', link: 'permission'},
    {icon: 'fa fa-lg fa-flag', label: 'Roles', link: 'role'},
    {icon: 'fa fa-lg fa-users', label: 'Users', link: 'userlist'},
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