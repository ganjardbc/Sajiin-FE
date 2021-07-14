<template>
    <div id="Product" class="display-flex">
        <div style="width: 210px; height: calc(100vh - 60px); padding-left: 20px; padding-right: 20px; overflow-y: auto; background-color: #fff;">
            <div style="padding-top: 20px;">
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
    {label: 'Employees', icon: 'fa fa-lg fa-users', link: 'employee'},
    // {label: 'Task Lists', icon: 'fa fa-lg fa-clipboard', link: 'tasklists'},
    {label: 'Shifts', icon: 'fa fa-lg fa-clock', link: 'shift'},
    {label: 'Position', icon: 'fa fa-lg fa-flag', link: 'position'}
]

export default {
    name: 'Product',
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