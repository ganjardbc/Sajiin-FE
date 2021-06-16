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
    {label: 'Products', icon: 'fa fa-lg fa-box', link: 'listing'},
    {label: 'Toppings', icon: 'fa fa-lg fa-list-alt', link: 'toping'},
    {label: 'Categories', icon: 'fa fa-lg fa-list-alt', link: 'category'},
    // {label: 'Catalogs', icon: 'fa fa-lg fa-list-alt', link: 'catalog'},
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