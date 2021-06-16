<template>
    <div id="AppToast">
        <div v-if="datas.length > 0" class="card-toast-message-container">
            <div v-for="(dt, i) in datas" :key="i">
                <div :class="'card-toast-message ' + (dt.visible ? 'show' : 'hide')">
                    <div class="display-flex card-toast-message-content">
                        <div class="left display-flex">
                            <div class="sign" style="width: 25px;">
                                <i class="icn far fa-lg fa-check-circle"></i>
                            </div>
                            <div style="width: calc(100% - 25px);">
                                <div v-if="dt.title" class="ttl">{{ dt.title ? dt.title : 'title' }}</div>
                                <div v-if="dt.subtitle" class="subttl" style="margin-top: 5px;">{{ dt.subtitle ? dt.subtitle : 'subtitle' }}</div>
                            </div>
                        </div>
                        <div class="right" @click="clearToastMessage(i)">
                            <i class="icn fa fa-1x fa-times"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

const payload = {
    id: '',
    title: '',
    subtitle: ''
}

export default {
    name: 'AppToast',
    data() {
        return {
            datas: []
        }
    },
    mounted () {
        this.datas = this.data ? this.data.slice(0, 4).map((dt) => { return {...dt}}) : []
    },
    methods: {
        ...mapActions({
            setToast: 'toastmessage/setDataToast'
        }),
        // closeToastMessage (index) {
        //     let prevPayload = this.datas
        //     let newPayload = []
        //     prevPayload && prevPayload.map((dt, i) => {
        //         var stt = (index === i) ? false : true 
        //         newPayload.push({
        //             ...payload,
        //             id: dt.id,
        //             title: dt.title,
        //             subtitle: dt.subtitle,
        //             visible: stt 
        //         })
        //     })
        //     this.datas = newPayload
        // },
        clearToastMessage (index) {
            let prevPayload = this.datas
            let newPayload = []
            prevPayload && prevPayload.map((dt, i) => {
                if (index !== i) {
                    newPayload.push({
                        ...payload,
                        id: dt.id,
                        title: dt.title,
                        subtitle: dt.subtitle,
                        visible: true
                    })
                }
            })
            this.datas = newPayload
            this.setToast(this.datas)
        },
    },
    computed: {
        ...mapGetters({
            data: 'toastmessage/data'
        })
    },
    watch: {
        data (props) {
            if (props) {
                this.datas = props && props.slice(0, 4).map((dt) => { return {...dt}})
            }
        }
    },
}
</script>