<template>
    <div id="App" class="display-flex display-mobile">
        <div v-for="(dt, i) in data" :key="i" style="width: 100%;">
            <div class="margin margin-left-15-px margin-right-15-px no-margin-padding">
                <div class="card box-shadow">
                    <div class="width width-100 width-center">
                        <div class="image image-half-padding bg-white">
                            <img class="img" :src="dt.image" alt="">
                        </div>
                    </div>
                    <div class="width width-100">
                        <div style="padding: 30px 0;" class="border-bottom">
                            <p class="fonts fonts-13 grey" style="margin-bottom: 10px;">"{{ dt.quote }}"</p>
                            <button class="btn btn-main-reverse">
                                Read More <i class="icn icn-right fa fa-lg fa-arrow-right" />
                            </button>
                        </div>
                        <div style="padding-top: 30px; padding-bottom: 15px;">
                            <div class="fonts fonts-11 grey">{{ dt.name }}</div>
                            <div class="fonts fonts-11 grey semibold">{{ dt.job }}</div>
                        </div>
                    </div>
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