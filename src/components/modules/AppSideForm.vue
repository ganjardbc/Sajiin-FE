<template>
    <div id="AppSideForm" :class="isZoomed ? 'form-side zoomed' : 'form-side'">
        <div class="fs-header display-flex justify-content">
            <div style="width: calc(100% - 90px); margin-top: 8px; margin-left: 10px;">
                <div class="fonts normal semibold">{{ title }}</div>
            </div>
            <div class="display-flex align-right" style="width: 150px;">
                <button v-if="enableCreateButton" class="btn btn-icon btn-white" @click="onCreate" title="Create">
                    <i class="fa fa-lw fa-plus" />
                </button>
                <button v-if="enableSaveButton" class="btn btn-icon btn-white" @click="onSave" title="Save">
                    <i class="fa fa-lw fa-save" />
                </button>
                <button class="btn btn-icon btn-white" @click="onZoom" :title="isZoomed ? 'Minimize' : 'Maximize'">
                    <i :class="isZoomed ? 'fa fa-lw fa-window-minimize' : 'fa fa-lw fa-window-maximize'" />
                </button>
                <button class="btn btn-icon btn-white" @click="onClose" title="Close">
                    <i class="fa fa-lw fa-arrow-right" />
                </button>
            </div>
        </div>
        <div class="fs-content">
            <slot />
        </div>
    </div>
</template>

<script>
export default {
    name: 'AppSideForm',
    data () {
        return {
            isZoomed: false
        }
    },
    props: {
        title: {
            type: String,
            required: true
        },
        enableCreateButton: {
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
        },
        onCreate: {
            type: Function,
            required: false
        }
    },
    methods: {
        onZoom () {
            this.isZoomed = !this.isZoomed
        }
    }
}
</script>