<template>
    <div id="AppToast" :class="'card-toast ' + (visibleToast ? 'show' : 'hide')">
        <div class="display-flex card-toast-content">
            <div class="left display-flex">
                <div v-if="titleToast" class="ttl">{{ titleToast }}</div>
                <div v-if="subtitleToast" class="subttl" style="margin-top: 5px;">{{ subtitleToast }}</div>
            </div>
            <div class="right" @click="closeToast">
                <i class="icn fa fa-1x fa-times"></i>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

let time

export default {
    name: 'AppToast',
    data() {
        return {}
    },
    mounted () {},
    watch: {
        visibleToast (props) {
            if (props) {
                time = setTimeout(() => {
                    this.closeToast()
                }, 5000);
            }
        }
    },
    methods: {
        ...mapActions({
            setToast: 'toast/setToast'
        }),
        closeToast () {
            const payload = {
                visible: false,
            }
            this.setToast(payload)
            clearTimeout(time)
        },
    },
    computed: {
        ...mapGetters({
            visibleToast: 'toast/visible',
            titleToast: 'toast/title',
            subtitleToast: 'toast/subtitle'
        })
    }
}
</script>