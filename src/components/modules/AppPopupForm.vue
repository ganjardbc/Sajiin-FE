<template>
    <div id="AppPopupForm" class="display-popup">
        <div class="card-container-popup">
            <div class="card-popup no-padding mobile bg-white box-shadow">
                <div class="width width-100 width-center width-mobile">
                    <div class="card-popoup-header display-flex align-center space-between">
                        <div style="width: calc(100% - 150px);">
                            <div class="fonts normal semibold">{{ appTitle }}</div>
                        </div>
                        <div class="display-flex align-right" style="width: 150px;">
                            <button v-if="enableSaveButton" class="btn btn-icon btn-white" @click="onSave">
                                <i class="fa fa-lw fa-save" />
                            </button>
                            <button v-if="enablePrintButton" class="btn btn-icon btn-white" @click="onPrint">
                                <i class="fa fa-lw fa-print" />
                            </button>
                            <button class="btn btn-icon btn-white" @click="onClose">
                                <i class="fa fa-lw fa-times" />
                            </button>
                        </div>
                    </div>
                    <div class="card-popup-body">
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
        enablePrintButton: {
            type: Boolean,
            required: false 
        },
        onPrint: {
            type: Function,
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