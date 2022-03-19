<template>
    <div id="App">
        <div class="display-flex" style="margin-bottom: 15px;">
            <div style="width: 100%;">
                <div class="fonts fonts-10 grey">Subtotal</div>
                <div class="fonts fonts-12 semibold orange">Rp. {{ order.order.total_price }}</div>
            </div>
            <div style="width: 30px;"></div>
        </div>
        <div style="margin-bottom: 15px;">
            <div class="fonts fonts-10 grey">Payment Status</div>
            <div class="fonts fonts-12 semibold">{{ order.order.payment_status ? 'Paid' : 'Unpaid' }}</div>
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
                <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                    {{ formMessage && formMessage.bills_price && formMessage.bills_price[0] }}
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
                <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                    {{ formMessage && formMessage.change_price && formMessage.change_price[0] }}
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
                    <div style="width: 40px;">
                        <button class="btn btn-icon btn-main-reverse with-hover" @click="onTable">
                            <i class="fa fa-lg fa-arrow-right" />
                        </button>
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
                    <div style="width: 40px;">
                        <button class="btn btn-icon btn-main-reverse with-hover" @click="onPayment">
                            <i class="fa fa-lg fa-arrow-right" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="field-group margin margin-bottom-15-px">
            <div class="fonts fonts-10 grey" style="margin-bottom: 0;">Notes</div>
            <div class="fonts fonts-10 grey" style="margin-bottom: 10px;">You can put the initial name order</div>
            <textarea 
                name="note" 
                id="note" 
                class="field field-sekunder field-textarea" 
                v-model="order.order.note"></textarea>
            <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                {{ formMessage && formMessage.note && formMessage.note[0] }}
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'App',
    props: {
        order: {
            default: null
        },
        formMessage: {
            default: null
        },
        selectedTable: {
            default: null
        },
        selectedPayment: {
            default: null
        },
        onChangeBills: {
            default: null
        },
        onTable: {
            default: null
        },
        onPayment: {
            default: null
        }
    },
}
</script>