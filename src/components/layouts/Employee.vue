<template>
    <div id="App" class="content-sub">
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
    {label: 'Employees', icon: 'fa fa-lg fa-users', link: 'admin-employee-employee', permission: 'employees'},
    {label: 'Positions', icon: 'fa fa-lg fa-flag', link: 'admin-employee-position', permission: 'positions'},
    {label: 'Shifts', icon: 'fa fa-lg fa-clock', link: 'admin-employee-shift', permission: 'shifts'},
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