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
    {icon: 'fa fa-lg fa-users', label: 'Users', link: 'userlist', permission: 'users'},
    {icon: 'fa fa-lg fa-flag', label: 'Roles', link: 'role', permission: 'roles'},
    {icon: 'fa fa-lg fa-lock', label: 'Permissions', link: 'permission', permission: 'permissions'},
    {icon: 'fa fa-lg fa-tag', label: 'Bizpars', link: 'bizpar', permission: 'bizpars'},
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