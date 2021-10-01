<template>
    <div id="AppButtonChecklist">
        <button 
            v-if="!disabled"
            :class="'btn btn-small-icon ' + (isChecked ? 'btn-main' : 'btn-sekunder')" 
            style="width: 22px; height: 22px; padding: 0; border-radius: 100%;"
            @click="onChecked">
            <i :class="'post-center ' + (isChecked ? 'fa fa-lw fa-check' : '')"></i>
        </button>
        <button v-else class="btn btn-small-icon btn-primary" style="width: 22px; height: 22px; padding: 0; border-radius: 100%; cursor: default;">
            <i class="post-center fa fa-lw fa-minus"></i>
        </button>
    </div>
</template>
<script>
export default {
    name: 'AppButtonChecklist',
    data () {
        return {
            isChecked: false
        }
    },
    props: {
        checked: {
            type: Boolean,
            required: false
        },
        onChange: {
            type: Function,
            required: false
        },
        disabled: {
            type: Boolean,
            required: false
        }
    },
    methods: {
        onChecked () {
            this.isChecked = !this.isChecked
            if (this.isChecked) {
                this.onChange(true)
            } else {
                this.onChange(false)
            }
        }
    },
    watch: {
        checked (props) {
            if (props) {
                this.isChecked = true
            } else {
                this.isChecked = false
            }
        }
    }
}
</script>