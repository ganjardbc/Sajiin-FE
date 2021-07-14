<template>
    <div id="AppCapsuleMenu" style="position: relative;">
        <div class="display-flex">
            <div @click="onShow" :class="'card-capsule ' + status + ' ' + (visiblePopup ? 'box box-shadow' : '')" style="cursor: pointer; padding-top: 7px; padding-bottom: 3px; border-radius: 4px;">
                {{ title ? title : 'Menu' }} <i class="fa fa-lw fa-caret-down" />
            </div>
        </div>
        <div v-if="visiblePopup" class="card border-full box-shadow" style="position: absolute; top: 30px; right: 0; width: 150px; z-index: 10; padding: 0 0; border-radius: 5px; background-color: #fff; max-height: 200px; overflow-y: auto;">
            <ul class="menu-list hover with-icon">
                <li v-for="(dt, index) in data" :key="index" class="ml-list">
                    <div class="ml-link" :style="dt.icon ? 'cursor: pointer; padding: 5px 0;' : 'cursor: pointer; padding: 10px;'" @click="onHide(index)">
                        <div v-if="dt.icon" class="ml-icon">
                            <i :class="dt.icon" />
                        </div>
                        <div class="ml-label" style="width: 100%;">
                            <div class="post-top">{{ dt.label }}</div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    name: 'AppCapsuleMenu',
    data () {
        return {
            visiblePopup: false
        }
    },
    props: {
        status: {
            type: String,
            required: false
        },
        title: {
            type: String,
            required: false
        },
        data: {
            required: true
        },
        onChange: {
            type: Function,
            required: false
        }
    },
    methods: {
        onHide (index) {
            this.visiblePopup = false
            this.onChange(index)
        },
        onShow () {
            this.visiblePopup = !this.visiblePopup
        }
    }
}
</script>