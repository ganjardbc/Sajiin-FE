<template>
    <div id="AppCardDashboard" style="padding: 0 10px; width: calc(100% - 20px);">
        <div 
            class="card box-shadow bg-white" 
            style="height: 350px; padding: 0; width: 100%; border-radius: 5px; margin-bottom: 15px;">
            <div class="display-flex space-between" style="height: 30px; padding: 5px 10px;">
                <div style="margin-top: 5px;">
                    <div class="fonts font-9 semibold">TITLE</div>
                </div>
                <div class="display-flex">
                    <button class="btn btn-small-icon btn-white">
                        <i class="fa fa-lw fa-retweet"></i>
                    </button>
                    <button class="btn btn-small-icon btn-white">
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
    name: 'AppCardDashboard'
}
</script>