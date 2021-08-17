<template>
    <div id="App" style="padding: 10px;">
        <div 
            :class="'card small-padding box-shadow ' + (data.statusTab ? 'selected' : 'bg-white')" 
            style="cursor: pointer; text-align: center;"
            @click="onClickCard(data)">
            <div class="image image-padding bg-white border-full">
                <img v-if="data.image" :src="categoryImageThumbnailUrl + data.image" alt="">
                <i v-else class="post-middle-absolute fa fa-lg fa-image" style="color: #999;" />
            </div>
            <div class="fonts fonts-9 semibold black" style="margin-top: 10px;">{{ data.name }}</div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'App',
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