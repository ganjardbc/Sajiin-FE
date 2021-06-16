<template>
    <div id="App">
        <div style="padding: 15px 0;">
            <div style="margin-bottom: 15px;">
                <div class="fonts fonts-10 grey">
                    ID
                </div>
                <div class="fonts fonts-10 semibold orange">
                    {{ data.order.order_id }}
                </div>
            </div>
            <div style="margin-bottom: 15px;">
                <div class="fonts fonts-10 grey">
                    Status 
                </div>
                <div class="fonts fonts-10 semibold orange" style="text-transform: capitalize;">
                    {{ data.order.status  }}
                </div>
            </div>
            <div style="margin-bottom: 15px;">
                <div class="fonts fonts-10 grey">
                    Order Date
                </div>
                <div class="fonts fonts-10 black semibold orange">
                    {{ data.order.created_at | moment("dddd, MMMM Do YYYY hh:mm") }}
                </div>
            </div>
            <div v-if="data && data.customer" style="margin-bottom: 15px;">
                <div class="fonts fonts-10 grey">
                    Customer
                </div>
                <div class="fonts fonts-10 black semibold orange">
                    {{ data.customer.name }}
                </div>
            </div>
            <div style="margin-bottom: 15px;">
                <div class="fonts fonts-10 grey">
                    Note
                </div>
                <div class="fonts fonts-10 black semibold orange">
                    # {{ data.order.note  }}
                </div>
            </div>

            <div class="border-top" style="padding-top: 15px; padding-bottom: 0;">
                <div class="display-flex space-between" style="margin-bottom: 10px;">
                    <div class="width width-70">
                        <div class="fonts fonts-10 grey">Product</div>
                    </div>
                    <div class="width width-30">
                        <div class="fonts fonts-10 grey">Price</div>
                    </div>
                </div>

                <div v-for="(dt, index) in data.details" :key="index" class="display-flex space-between" style="margin-bottom: 15px;">
                    <div class="width width-70 display-flex">
                        <div style="width: 60px; margin-right: 15px;">
                            <div class="image image-padding">
                                <img :src="productImageThumbnailUrl + dt.product_image" alt="" class="post-center">
                            </div>
                        </div>
                        <div style="width: calc(100% - 75px);">
                            <div class="fonts fonts-10 semibold black">
                                {{ dt.product_name }}
                            </div>
                            <div class="fonts fonts-9 grey">
                                {{ dt.quantity }} {{ dt.product_detail }} x Rp {{ dt.price }}
                            </div>
                            <div v-if="dt.product_toping" class="fonts fonts-9 grey">
                                {{ dt.quantity }} {{ dt.product_toping }} x Rp. {{ dt.toping_price }}
                            </div>
                        </div>
                    </div>
                    <div class="width width-30">
                        <div class="fonts fonts-10 semibold orange">Rp. {{ dt.subtotal }}</div>
                    </div>
                </div>
            </div>

            <div class="border-top" style="padding-top: 15px; padding-bottom: 15px;">
                <div class="display-flex space-between" style="margin-bottom: 10px;">
                    <div class="width width-70">
                        <div class="fonts fonts-10 grey">Payment</div>
                    </div>
                    <div class="width width-30"></div>
                </div>
                <div class="display-flex space-between" style="margin-bottom: 5px;">
                    <div class="width width-70">
                        <div class="fonts fonts-10 black">Total Price ({{ data.order.total_item }} Product)</div>
                    </div>
                    <div class="width width-30">
                        <div class="fonts fonts-10 black semibold">Rp. {{ data.order.total_price }}</div>
                    </div>
                </div>
                <div class="display-flex space-between" style="margin-bottom: 5px;">
                    <div class="width width-70">
                        <div class="fonts fonts-10 black">PPN (0%)</div>
                    </div>
                    <div class="width width-30">
                        <div class="fonts fonts-10 black semibold">Rp. 0</div>
                    </div>
                </div>
                <div class="display-flex space-between" style="margin-bottom: 5px;">
                    <div class="width width-70">
                        <div class="fonts fonts-10 black">Total Payment</div>
                    </div>
                    <div class="width width-30">
                        <div class="fonts fonts-10 semibold orange">Rp. {{ data.order.total_price }}</div>
                    </div>
                </div>
                <div v-if="data.payment" class="display-flex space-between" style="margin-bottom: 0;">
                    <div class="width width-70">
                        <div class="fonts fonts-10 black">Payment Method</div>
                    </div>
                    <div class="width width-30">
                        <div class="fonts fonts-10 black semibold">{{ data.payment && data.payment.name }}</div>
                    </div>
                </div>
            </div>

            <div class="border-top" style="padding-top: 15px; padding-bottom: 15px;">
                <div class="display-flex space-between" style="margin-bottom: 10px;">
                    <div class="width width-70">
                        <div class="fonts fonts-10 grey">Bills</div>
                    </div>
                    <div class="width width-30"></div>
                </div>
                <div class="display-flex space-between" style="margin-bottom: 5px;">
                    <div class="width width-70">
                        <div class="fonts fonts-10 black">Bill Payment</div>
                    </div>
                    <div class="width width-30">
                        <div class="fonts fonts-10 semibold">Rp. {{ data.order.bills_price }}</div>
                    </div>
                </div>
                <div class="display-flex space-between" style="margin-bottom: 5px;">
                    <div class="width width-70">
                        <div class="fonts fonts-10 black">Change</div>
                    </div>
                    <div class="width width-30">
                        <div class="fonts fonts-10 semibold">Rp. {{ data.order.change_price }}</div>
                    </div>
                </div>
                <div class="display-flex space-between" style="margin-bottom: 0;">
                    <div class="width width-70">
                        <div class="fonts fonts-10 black">Payment Status</div>
                    </div>
                    <div class="width width-30">
                        <div class="fonts fonts-10 black semibold">{{ data.order.payment_status ? 'Paid' : 'Unpaid' }}</div>
                    </div>
                </div>
            </div>

            <div v-if="data.table" class="border-top" style="padding-top: 15px;">
                <div class="display-flex space-between" style="margin-bottom: 10px;">
                    <div class="width width-70">
                        <div class="fonts fonts-10 grey">Table</div>
                    </div>
                    <div class="width width-30"></div>
                </div>
                <div class="display-flex space-between">
                    <div class="width width-70 display-flex">
                        <div style="width: 60px; margin-right: 15px;">
                            <div class="image image-padding">
                                <img :src="tableImageThumbnailUrl + data.table.image" alt="" class="post-center">
                            </div>
                        </div>
                        <div style="width: calc(100% - 75px);">
                            <div class="fonts fonts-11 semibold black">
                                {{ data.table.name }}
                            </div>
                            <div class="fonts fonts-9 grey">
                                {{ data.table.code }} | {{ data.table.description }}
                            </div>
                        </div>
                    </div>
                    <div class="width width-30"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import AppDote from './AppDote'

export default {
    name: 'App',
    components: {
        AppDote
    },
    props: {
        data: {
            required: true
        }
    }
}
</script>