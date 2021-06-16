<template>
    <div id="AppPopupForm" class="display-popup">
        <div class="card-container-popup">
            <div class="card-popup bg-white box-shadow">
                <div class="width width-100 width-center width-mobile">
                    <div class="display-flex justify-content">
                        <div style="width: calc(100% - 90px); margin-top: 8px;">
                            <div class="fonts normal semibold">{{ appTitle }}</div>
                        </div>
                        <div class="display-flex align-right" style="width: 150px;">
                            <button v-if="enableSaveButton" class="btn btn-icon btn-white" @click="onSave">
                                <i class="fa fa-lw fa-save" />
                            </button>
                            <button class="btn btn-icon btn-white" @click="onClose">
                                <i class="fa fa-lg fa-times" />
                            </button>
                        </div>
                    </div>
                    <div style="max-height: calc(100vh - 200px); overflow-y: auto; padding-right: 2px;">
                        <slot />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AppPopupForm',
    data () {
        return {
            appTitle: ''
        }
    },
    mounted () {
        this.appTitle = this.title ? this.title : 'Form'
    },
    props: {
        title: {
            type: String,
            required: false
        },
        enableRadius: {
            type: Boolean,
            required: false
        },
        enableSaveButton: {
            type: Boolean,
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
    }
}
</script>