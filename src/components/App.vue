<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    name: 'App',
    data () {
        return {}
    },
    mounted () {
        const data = this.$cookies.get('user');
        const token = this.$cookies.get('token');
        if (data && token) {
            const payload = {
                id: data.id,
                name: data.name,
                email: data.email,
                token: token
            }
            this.$socket.emit('admin', payload)
        }
    },
    methods: {
        ...mapActions({
            setToast: 'toast/setToast'
        }),
        makeToast (title) {
            const payload = {
                visible: true,
                title: title
            }
            this.setToast(payload)
        },
    },
    sockets: {
        connect: function () {
            this.makeToast('Connected to Socket')
        },
        // adminList: function (data) {
        //     console.log('adminList', data)
        // }
    }
}
</script>
<style>
    @import url('https://use.fontawesome.com/releases/v5.15.3/css/all.css');
</style>