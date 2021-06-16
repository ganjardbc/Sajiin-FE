<template>
    <div id="AppQtyField" class="display-flex border-full" style="border-radius: 5px;">
        <button 
            v-if="!disable"
            :class="quantitySelected > 0 ? 'btn btn-icon btn-main-reverse with-hover' : 'btn btn-icon btn-white'" 
            @click="onMinus">
            <i class="fa fa-lg fa-minus-circle"></i>
        </button>
        <button v-else class="btn btn-icon btn-grey" style="cursor: default;">
            <i class="fa fa-lg fa-minus-circle"></i>
        </button>
        <input 
            type="text" 
            placeholder=""
            style="width: calc(100% - 80px); border-radius: 0; text-align: center;" 
            class="field field-white" 
            :name="'quantity' + id" 
            :id="'quantity' +  id" 
            @change="onTotal"
            v-model="quantitySelected"
            :readonly="disable ? true : false">
        <button 
            v-if="!disable"
            :class="quantitySelected < maxValue ? 'btn btn-icon btn-main-reverse with-hover' : 'btn btn-icon btn-white'" 
            @click="onPlus">
            <i class="fa fa-lg fa-plus-circle"></i>
        </button>
        <button v-else class="btn btn-icon btn-grey" style="cursor: default;">
            <i class="fa fa-lg fa-plus-circle"></i>
        </button>
    </div>
</template>
<script>
export default {
    name: 'AppQtyField',
    data () {
        return {
            quantitySelected: 0,
            maxValue: 0
        }
    },
    mounted () {
        this.maxValue = this.maximumValue ? parseInt(this.maximumValue) : 1000
        this.quantitySelected = this.value ? this.value : 0
    },
    props: {
        id: {
            required: false
        },
        value: {
            required: false
        },
        maximumValue: {
            type: String,
            required: false
        },
        onChange: {
            type: Function,
            required: false
        },
        disable: {
            type: Boolean,
            required: false
        }
    },
    methods: {
        onMinus () {
            if (this.quantitySelected !== 0) {
                this.quantitySelected -= 1
                this.onChange(this.quantitySelected)
            }
        },
        onPlus () {
            if (this.quantitySelected < this.maxValue) {
                this.quantitySelected += 1
                this.onChange(this.quantitySelected)
            }
        },
        onTotal () {
            this.onChange(this.quantitySelected)
        }
    },
    watch: {
        maximumValue: function (props) {
            if (props) {
                this.maxValue = parseInt(props)
            }
        }
    }
}
</script>