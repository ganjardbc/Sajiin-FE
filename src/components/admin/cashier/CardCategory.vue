<template>
    <div id="App" style="padding: 10px;">
        <div 
            :class="'card small-padding box-shadow ' + (data.statusTab ? 'selected' : 'bg-white')" 
            style="cursor: pointer; text-align: center; width: 150px;"
            @click="onClickCard(data)">
            <div class="image image-padding">
                <VueLoadImage v-if="data.image">
                    <img slot="image" :src="categoryImageThumbnailUrl + data.image" alt="">
                    <div slot="preloader">
                        <i class="post-middle-absolute fa fa-lg fa-spin fa-spinner" style="color: #999;"></i>
                    </div>
                </VueLoadImage>
                <i v-else class="post-middle-absolute fa fa-lg fa-image" style="color: #999;" />
            </div>
            <div :class="`fonts fonts-9 semibold ${data.statusTab ? 'black' : 'grey'}`" style="word-wrap: break-word; margin-top: 10px;">{{ data.name }}</div>
        </div>
    </div>
</template>
<script>
import VueLoadImage from 'vue-load-image'

export default {
    name: 'App',
    components: {
        VueLoadImage
    },
    props: {
        data: {
            required: true 
        },
        onClick: {
            required: false 
        }
    },
    methods: {
        onClickCard (data) {
            this.onClick(data)
        }
    }
}
</script>