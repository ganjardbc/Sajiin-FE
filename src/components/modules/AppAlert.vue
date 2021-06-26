<template>
    <div id="AppAlert" class="display-popup-normal">
        <div class="card-alert box-shadow post-middle">
            <div v-if="!isLoader" class="display-flex justify-content align-center">
                <div style="width: 100%;">
                    <div class="fonts micro semibold">{{ label ? label : 'Alert' }}</div>
                </div>
                <button class="btn btn-small-icon btn-white" @click="onClose">
                    <i class="fa fa-lw fa-times"></i>
                </button>
            </div>
            <div class="content-center">
                <div class="padding padding-top-30-px padding-bottom-30-px">
                    <i :class="isLoader ? 'fa fa-2x fa-spinner fa-spin' : 'fa fa-2x fa-info-circle'" style="font-size: 48px;"></i>
                </div>
                <div v-if="isLoader" class="margin margin-bottom-30-px">
                    <div class="fonts micro semibold width width-90 width-center">
                        Please Wait ..
                    </div>
                </div>
                <div v-else class="margin margin-bottom-30-px">
                    <div class="fonts micro semibold width width-90 width-center margin margin-bottom-5-px">
                        {{ title ? title : 'This action will take permanently to datas, are you sure ?' }}
                    </div>
                    <div v-if="subtitle" class="fonts fonts-10 grey width width-90 width-center">
                        {{ subtitle }}
                    </div>
                </div>
                <div v-if="!isLoader" class="display-flex justify-content">
                    <button class="btn btn-main btn-full margin margin-right-5-px" @click="onSave">
                        Yes, continue
                    </button>
                    <button class="btn btn-grey btn-full margin margin-left-5-px" @click="onClose">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'AppAlert',
    props: {
        isLoader: {
            type: Boolean,
            required: false
        },
        label: {
            type: String,
            required: false
        },
        title: {
            type: String,
            required: false
        },
        subtitle: {
            type: String,
            required: false
        },
        onSave: {
            type: Function,
            required: false
        },
        onClose: {
            type: Function,
            required: false
        }
    },
}
</script>