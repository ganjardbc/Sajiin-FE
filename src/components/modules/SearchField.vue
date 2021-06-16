<template>
    <div 
        :class="'field-search ' + (enableResponsive ? 'field-search-mobile ' : '') + (disableBorder ? 'border-bottom' : 'border-full')" 
        :style="'border-radius: ' + (disableBorder ? '0' : '5px') + '; height: 37px; overflow: hidden;'">
        <input 
            type="search" 
            :placeholder="placeholder ? placeholder : 'Search..'"
            style="width: calc(100% - 40px); border-radius: 0;" 
            class="field field-white" 
            name="search" 
            :id="id ? id : 'search'" 
            required
            v-model="search">
        <button class="btn btn-icon btn-white" @click="onSearch">
            <i class="fa fa-lw fa-search"></i>
        </button>
    </div>
</template>
<script>
export default {
    data () {
        return {
            search: ''
        }
    },
    mounted () {
        this.search = this.value ? this.value : ''
    },
    props: {
        id: {
            type: String,
            required: false
        },
        enableResponsive: {
            type: Boolean,
            required: false
        },
        disableBorder: {
            type: Boolean,
            required: false
        },
        value: {
            type: String,
            required: false
        },
        placeholder: {
            type: String,
            required: false
        },
        onChange: {
            type: Function,
            required: false
        }
    },
    methods: {
        onTotal () {
            this.onChange(this.search)
        },
        onSearch () {
            this.onChange(this.search)
        }
    },
    watch: {
        maximumValue: function (props) {
            if (props) {
                this.search = parseInt(props)
            }
        }
    }
}
</script>