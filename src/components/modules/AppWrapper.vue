<template>
    <div id="AppWrapper" :class="[wrapper, wrapperDirection, wrapperStyle]">
        <slot />
    </div>
</template>

<script>
export default {
    name: 'AppWrapper',
    props: {
        type: String,
        isColumn: Boolean,
    },
    data () {
        return {
            wrapper: "wrapper",
            wrapperDirection: "wrapper-row",
            wrapperStyle: "wrapper-space-between"
        }
    },
    mounted () {
        // styles
        switch (this.type) {
            case "left":
                this.wrapperStyle = "wrapper-left"
                break
            case "right":
                this.wrapperStyle = "wrapper-right"
                break
            case "center":
                this.wrapperStyle = "wrapper-center"
                break
            case "start":
                this.wrapperStyle = "wrapper-start"
                break
            case "end":
                this.wrapperStyle = "wrapper-end"
                break
            case "space":
                this.wrapperStyle = "wrapper-space-between"
                break
            default:
                this.wrapperStyle = "wrapper-space-between"
                break
        }

        // direction
        this.wrapperDirection = (this.isColumn) ? "wrapper-column" : "wrapper-row"
    }
}
</script>