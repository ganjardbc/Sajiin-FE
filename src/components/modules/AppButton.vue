<template>
    <router-link 
        v-if="routeName"
        :to="{name: routeName}"
        id="AppButton" 
        :class="[btn, btnStyle, btnRadius]">
        {{ title }}
    </router-link>
    <button 
        v-else
        id="AppButton" 
        :class="[btn, btnStyle, btnRadius]"
        @click="onPress"
    >
        {{ title }}
    </button>
</template>

<script>
export default {
    name: 'AppButton',
    props: {
        title: {
            type: String,
            required: true
        },
        type: String,
        isRadius: Boolean,
        onPress: {
            type: Function,
            required: false
        },
        routeName: String
    },
    data () {
        return {
            btn: "btn",
            btnStyle: "btn-main",
            btnRadius: "btn-radius"
        }
    },
    mounted () {
        // styles
        this.btnStyle = this.type
        switch (this.type) {
            case "main":
                this.btnStyle = "btn-main"
                break
            case "primary":
                this.btnStyle = "btn-primary"
                break
            case "sekunder":
                this.btnStyle = "btn-sekunder"
                break
            case "link":
                this.btnStyle = "btn-link"
                break
            default:
                this.btnStyle = "btn-primary"
                break
        }

        // radius
        this.btnRadius = (this.isRadius) ? "btn-radius-rounded" : "btn-radius"
    }
}
</script>

<style scoped>

</style>