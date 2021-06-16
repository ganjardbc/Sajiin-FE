<template>
    <div id="App" style="padding: 10px;">
        <div class="card box-shadow bg-white" style="text-align: center;">
            <div class="image image-padding">
                <img v-if="data.image" :src="categoryImageThumbnailUrl + data.image" alt="">
                <i v-else class="post-middle-absolute fa fa-lg fa-image" style="color: #999;" />
            </div>
            <div class="fonts fonts-9 semibold black" style="margin-top: 20px;">{{ data.name }}</div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'App',
    props: {
        data: {
            required: true 
        }
    }
}
</script>