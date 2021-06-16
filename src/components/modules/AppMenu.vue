<template>
    <div id="AppMenu">
        <ul class="navbar mobile">
            <li v-for="(dt, index) in datas" :key="index">
                <router-link :to="{name: dt.link}">
                    {{ dt.label }}
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'AppMenu',
    props: {
        data: {
            required: true
        }
    },
    // mounted() {
    //     console.log('data', this.data)
    // },
    data () {
        return {
            datas: this.data
        }
    } 
}
</script>