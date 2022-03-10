<template>
    <div id="AppCardDashboard" class="card-dashboard-container">
        <div 
            class="card box-shadow bg-white" 
            :style="'padding: 0; border-radius: 5px; margin-bottom: 15px; width: 100%; height:' + (height ? height : '350px') + ';'">
            <div v-if="title" class="display-flex space-between" style="height: 30px; padding: 5px 10px;">
                <div style="margin-top: 5px;">
                    <div class="fonts fonts-10 semibold">{{ title ? title : "TITLE" }}</div>
                </div>
                <div class="display-flex">
                    <button v-if="enableRefresh" class="btn btn-small-icon btn-white">
                        <i class="fa fa-lw fa-retweet"></i>
                    </button>
                    <button v-if="enableZoom" class="btn btn-small-icon btn-white">
                        <i class="fa fa-lw fa-search-plus"></i>
                    </button>
                </div>
            </div>
            <div style="height: calc(100% - 60px); overflow-y: auto; padding: 10px;">
                <slot />
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'AppCardDashboard',
    props: {
        title: {
            type: String,
            required: false
        },
        height: {
            type: String,
            required: false
        },
        enableRefresh: {
            type: Boolean,
            required: false
        },
        enableZoom: {
            type: Boolean,
            required: false
        }
    }
}
</script>