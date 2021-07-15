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
    {label: 'Employees', icon: 'fa fa-lg fa-users', link: 'employee'},
    {label: 'Shifts', icon: 'fa fa-lg fa-clock', link: 'shift'},
    {label: 'Position', icon: 'fa fa-lg fa-flag', link: 'position'}
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