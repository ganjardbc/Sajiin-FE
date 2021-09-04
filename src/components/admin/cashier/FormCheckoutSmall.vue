<template>
    <div id="App">
        <div class="card-check-out-fixed">
            <div class="card small-padding box-shadow bg-white">
                <div class="display-flex align-center">
                    <div style="width: 50px;">
                        <div class="image image-40px bg-main">
                            <i class="post-top icn fa fa-lw fa-shopping-cart" style="color: #fff;"></i>
                        </div>
                    </div>
                    <div style="width: calc(100% - 90px);">
                        <div class="fonts fonts-10 black">Carts</div>
                        <div class="display-flex">
                            <span class="fonts fonts-10 semibold">{{ quantity }} Products</span>
                            <span style="margin: 0 3px;">|</span>
                            <span class="fonts fonts-10 orange semibold">Rp. {{ subTotal }}</span>
                        </div>
                    </div>
                    <div style="width: 40px;">
                        <button class="btn btn-icon btn-white" @click="onClick">
                            <i class="fa fa-lw fa-arrow-right"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'App',
    data () {
        return {
            datas: [],
            subTotal: 0,
            quantity: 0
        }
    },
    mounted () {
        this.datas = this.data ? this.data : [] 
        let subTotal = 0
        let quantity = 0
        this.datas && this.datas.map((dt) => {
            subTotal += dt.subtotal
            quantity += dt.quantity
        })
        this.subTotal = subTotal
        this.quantity = quantity
    },
    props: {
        onClick: {
            type: Function,
            required: false
        },
        data: {
            required: false 
        }
    },
    watch: {
        data (props) {
            if (props) {
                this.datas = props 
                let subTotal = 0
                let quantity = 0
                this.datas && this.datas.map((dt) => {
                    subTotal += dt.subtotal
                    quantity += dt.quantity
                })
                this.subTotal = subTotal
                this.quantity = quantity
            } else {
                this.datas = null 
            }
        }
    }
}
</script>