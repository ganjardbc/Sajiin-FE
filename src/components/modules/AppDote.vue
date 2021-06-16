<template>
    <div 
        id="AppDote" 
        class="fa fa-1x fa-circle" 
        :style="'color: ' + (color ? color : '#999') + '; font-size: 5px; margin-left: 5px; margin-right: 5px;'"></div>
</template>
<script>
export default {
    name: 'AppDote',
    props: {
        color: {
            type: String,
            required: false 
        }
    }
}
</script>