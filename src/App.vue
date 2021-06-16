<template>
    <div id="app">
        <Admin />
    </div>
</template>

<script>
import Web from './components/layouts/Web'
import Admin from './components/layouts/Admin'
import io from 'socket.io-client'

export default {
    name: 'App',
    components: {
        Web,
        Admin
    },
    created () {
        var socket = io.connect(socketUrl)
        console.log('socket', socket)
    }
}
</script>

<style>
    /* @import url('https://use.fontawesome.com/releases/v5.15.1/css/all.css');
    @import url('./assets/sass/app.css'); */
</style>