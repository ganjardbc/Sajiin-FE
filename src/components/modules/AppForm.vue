<template>
    <div style="width: 100%;">
        <AppText 
            v-if="title"
            type="content" 
            style="margin-bottom: 5px;">
            <span style="font-size: 12px;">{{ title }}</span>
        </AppText>
        <input 
            id="AppForm" 
            :type="type ? type : 'text'"
            :placeholder="placeholder"
            :class="[field, fieldStyle, fieldRadius]"
        />
    </div>
</template>

<script>
import AppText from './AppText'

export default {
    name: 'AppForm',
    components: {
        AppText: AppText
    },
    props: {
        title: {
            type: String
        },
        placeholder: {
            type: String,
            required: true
        },
        type: String,
        styleType: String,
        isRadius: Boolean,
        onPress: {
            type: Function,
            // required: true
        }
    },
    data () {
        return {
            field: "field",
            fieldStyle: "field-main",
            fieldRadius: "field-radius"
        }
    },
    mounted () {
        // styles
        this.fieldStyle = this.styleType
        switch (this.styleType) {
            case "main":
                this.fieldStyle = "field-main"
                break
            case "primary":
                this.fieldStyle = "field-primary"
                break
            case "sekunder":
                this.fieldStyle = "field-sekunder"
                break
            case "link":
                this.fieldStyle = "field-link"
                break
            default:
                this.fieldStyle = "field-primary"
                break
        }

        // radius
        this.fieldRadius = (this.isRadius) ? "field-radius-rounded" : "field-radius"
    }
}
</script>

<style scoped>

</style>