<template>
    <div id="App">
        <!-- :enableSaveButton="selectedTable && selectedPayment ?  true : false" -->
        <AppSideForm
            :title="'Check Out'"
            :enableSaveButton="true"
            :onSave="onButtonSave"
            :onClose="onClose"
        >
            <div v-if="order">
                <div class="display-flex" style="margin-bottom: 15px;">
                    <div style="width: 100%;">
                        <div class="fonts fonts-10 grey">Subtotal</div>
                        <div class="fonts fonts-12 semibold orange">Rp. {{ order && order.order.total_price }}</div>
                    </div>
                    <div style="width: 30px;"></div>
                    <!-- <div style="width: 100%;">
                        <div class="fonts fonts-10 grey">PPN (0%)</div>
                        <div class="fonts fonts-12 semibold">Rp. 0</div>
                    </div> -->
                </div>
                <div style="margin-bottom: 15px;">
                    <div class="fonts fonts-10 grey">Payment Status</div>
                    <div class="fonts fonts-12 semibold">{{ order && order.order.payment_status ? 'Paid' : 'Unpaid' }}</div>
                </div>
                <div class="display-flex">
                    <div class="field-group margin margin-bottom-15-px">
                        <div class="fonts fonts-10 grey" style="margin-bottom: 5px;">Bills</div>
                        <input 
                            type="number" 
                            placeholder="" 
                            class="field field-sekunder" 
                            name="bills_price" 
                            id="bills_price" 
                            @keyup="onChangeBills"
                            v-model="order.order.bills_price">
                        <div v-if="message" class="fonts micro bold" style="color: red; margin-top: 5px;">
                            {{ message && message.bills_price && message.bills_price[0] }}
                        </div>
                    </div>
                    <div style="width: 30px;"></div>
                    <div class="field-group margin margin-bottom-15-px">
                        <div class="fonts fonts-10 grey" style="margin-bottom: 5px;">Change</div>
                        <input 
                            type="number" 
                            placeholder="" 
                            class="field field-sekunder" 
                            name="change_price" 
                            id="change_price" 
                            v-model="order.order.change_price"
                            readonly>
                        <div v-if="message" class="fonts micro bold" style="color: red; margin-top: 5px;">
                            {{ message && message.change_price && message.change_price[0] }}
                        </div>
                    </div>
                </div>
                <div class="width width-100 margin margin-bottom-20-px">
                    <div class="fonts fonts-10 grey" style="margin-bottom: 5px;">Table</div>
                    <div class="card border-full" style="padding: 10px; width: calc(100% - 20px);">
                        <div class="display-flex space-between align-center">
                            <div v-if="selectedTable" class="display-flex">
                                <div style="width: 45px; margin-right: 15px">
                                    <div class="image image-padding border border-full">
                                        <img v-if="selectedTable.image" :src="selectedTable ? (tableImageThumbnailUrl + selectedTable.image) : ''" alt="" class="post-center">
                                        <i v-else class="post-middle-absolute icn fa fa-lg fa-image"></i>
                                    </div>
                                </div>
                                <div style="width: calc(100% - 60px);">
                                    <div style="width: 100%;">
                                        <div class="fonts fonts-10 semibold black">
                                            {{ selectedTable && selectedTable.name }}
                                        </div>
                                        <div class="fonts fonts-10 grey">
                                            {{ selectedTable && selectedTable.code }} | {{ selectedTable && selectedTable.description }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div v-else>
                                <div class="fonts fonts-10 semibold" style="margin-left: 10px;">Choose visible table</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="width width-100 margin margin-bottom-20-px">
                    <div class="fonts fonts-10 grey" style="margin-bottom: 5px;">Payment</div>
                    <div class="card border-full" style="padding: 10px; width: calc(100% - 20px);">
                        <div class="display-flex space-between align-center">
                            <div v-if="selectedPayment" class="display-flex">
                                <div style="width: 45px; margin-right: 15px">
                                    <div class="image image-padding border border-full">
                                        <img v-if="selectedPayment.image" :src="selectedPayment ? (paymentImageThumbnailUrl + selectedPayment.image) : ''" alt="" class="post-center">
                                        <i v-else class="post-middle-absolute icn fa fa-lg fa-image"></i>
                                    </div>
                                </div>
                                <div class="display-flex space-between" style="width: calc(100% - 60px);">
                                    <div class="post-tops">
                                        <div class="fonts fonts-10 semibold black">
                                            {{ selectedPayment && selectedPayment.name }}
                                        </div>
                                        <div class="fonts fonts-10 grey">{{ selectedPayment && selectedPayment.description }}</div>
                                    </div>
                                </div>
                            </div>
                            <div v-else>
                                <div class="fonts fonts-10 semibold" style="margin-left: 10px;">Choose payment method</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="field-group margin margin-bottom-15-px">
                    <div class="fonts fonts-10 grey" style="margin-bottom: 0;">Notes</div>
                    <div class="fonts fonts-10 grey" style="margin-bottom: 10px;">The initial name of ordered</div>
                    <textarea 
                        name="note" 
                        id="note" 
                        class="field field-sekunder field-textarea" 
                        v-model="order.order.note"
                        readonly></textarea>
                    <div v-if="message" class="fonts micro bold" style="color: red; margin-top: 5px;">
                        {{ message && message.note && message.note[0] }}
                    </div>
                </div>
            </div>
        </AppSideForm>
    </div>
</template>
<script>
import AppSideForm from '../../modules/AppSideForm'

export default {
    name: 'App',
    data () {
        return {
            order: null,
            selectedTable: null,
            selectedPayment: null
        }
    },
    mounted () {
        this.order = this.data ? this.data : null 
        this.selectedTable = this.order.table 
        this.selectedPayment = this.order.payment 
    },
    components: {
        AppSideForm
    },
    props: {
        data: {
            required: true,
        },
        message: {
            required: true,
        },
        onSave: {
            type: Function,
            required: true 
        },
        onClose: {
            type: Function,
            required: true 
        }
    },
    methods: {
        onButtonSave () {
            const newPayload = {
                ...this.order
            }
            this.onSave(newPayload)
        },
        onChangeBills () {
            const bills = parseInt(this.order.order.bills_price)
            const ttl_price = parseInt(this.order.order.total_price)
            let ttl = (bills - ttl_price)
            this.order = {
                ...this.order,
                order: {
                    ...this.order.order,
                    bills_price: bills,
                    change_price: ttl,
                    payment_status: ttl >= 0 ? 1 : 0
                }
            }
        },
    },
    watch: {
        data: function (props) {
            if (props) {
                this.order = props 
                this.selectedTable = props.table 
                this.selectedPayment = props.payment 
            } else {
                this.order = null
                this.selectedTable = null 
                this.selectedPayment = null 
            }
        }
    }
}
</script>