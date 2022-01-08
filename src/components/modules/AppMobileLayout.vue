<template>
    <div id="AppMobileLayout" class="card-full-popup">
        <div class="navbar-header">
            <div class="navbar-header-content">
                <div class="display-flex">
                    <button class="btn btn-icon btn-white" @click="onBack">
                        <i class="fa fa-lg fa-arrow-left"></i>
                    </button>
                    <div style="margin-left: 10px; margin-right: 10px;">
                        <div class="post-top">
                            <div class="fonts fonts-12 semibold black">
                                {{ title ? title : 'Title' }}
                            </div>
                        </div>
                    </div>
                    <div style="position: absolute; right: 10px;">
                        <slot name="right-button" />
                    </div>
                </div>
            </div>
        </div>
        <div class="main-screen" id="body">
            <slot />
        </div>
    </div>
</template>
<script>
export default {
    name: 'AppMobileLayout',
    props: {
        title: {
            type: String,
            required: false
        },
    },
    methods: {
        onBack () {
            this.$router.back()
        }
    }
}
</script>