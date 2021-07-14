<template>
    <div id="App">
        <div v-for="(dt, i) in data" :key="i" :class="'display-flex display-mobile wrap ' + ((i % 2 !== 0) ? 'row-reverse' : '')" style="padding-top: 24px; padding-bottom: 32px;">
            <div class="width width-50 width-mobile">
                <div class="width width-70 width-mobile width-center" style="margin-bottom: 15px;">
                    <div class="image image-padding bg-white">
                        <img style="height: 100%; width: auto;" :src="dt.image" alt="">
                    </div>
                </div>
            </div>
            <div class="width width-50 width-mobile">
                <div class="post-top post-none-mobile width width-90 width-mobile">
                    <h1 class="fonts fonts-28 black bold no-line-height" style="margin-bottom: 15px;">{{ dt.title }}</h1>
                    <p class="fonts fonts-12 grey" style="margin-bottom: 30px;">{{ dt.description }}</p>
                    <button class="btn btn-main-reverse">
                        Read More <i class="icn icn-right fa fa-lg fa-arrow-right" />
                    </button>
                </div>
            </div>
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