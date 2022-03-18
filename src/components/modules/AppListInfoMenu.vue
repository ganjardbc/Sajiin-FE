<template>
    <div id="AppListInfo">
        <ul class="menu-info">
            <li 
                v-for="(dt, i) in dataSideBar" 
                :key="i" 
                @click="onClick">
                <router-link :to="{name: dt.link}">
                    <div class="label">{{ dt.label }}</div>
                </router-link>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name: 'AppListInfo',
    data () {
        return {
            permissions: [],
            sidebar: [],
        }
    },
    mounted() {
        const permissions = this.$cookies.get('permissions')
        this.permissions = permissions.permissions
    },
    methods: {
        onCheckPermission (prm) {
            let stt = false
            const data = this.permissions
            data && data.map((dt) => {
                if (dt.permission_name === prm) {
                    stt = true
                }
            })
            return stt
        },
    },
    computed: {
        dataSideBar() {
            let menu = []
            this.data && this.data.map((dt) => {
                const stt = this.onCheckPermission(dt.permission)
                if (stt) {
                    menu.push({
                        ...dt
                    })
                }
            })
            return menu
        }
    },
    props: {
        onClick: {
            default: null
        },
        data: {
            default: null
        }
    }
}
</script>