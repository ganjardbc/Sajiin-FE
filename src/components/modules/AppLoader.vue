<template>
    <div id="AppLoader" class="display-flex center align-center" style="width: calc(100% - 40px); margin: auto; padding: 20px;">
        <div style="width: 25px;">
            <i class="fa fa-lw fa-spinner fa-spin" />
        </div>
        <div class="fonts micro bold">
            {{ title ? title : 'Please wait..' }}
        </div>
    </div>
</template>

<script>
export default {
    name: 'AppLoader',
    props: {
        title: {
            type: String,
            required: false
        }
    }
}
</script>