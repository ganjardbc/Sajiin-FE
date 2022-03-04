<template>
    <div id="App">
        <div style="padding: 15px 0;">
            <div v-if="data.order.status !== 'done' && data.order.status !== 'canceled'" style="padding-bottom: 15px;">
                <div v-for="(dt, i) in orderStatus" :key="i" class="display-flex" style="padding: 7.5px 0;">
                    <div style="width: 70px;">
                        <div :class="`image image-circle ${dt.isActive ? 'image-52px' : 'image-45px'}`" :style="`background-color: ${dt.isActive ? dt.color : '#f5f5f5'};`">
                            <i :class="`post-middle-absolute ${dt.icon}`" :style="`font-size: ${dt.isActive ? '22px' : '16px'}; color: ${dt.isActive ? dt.iconColor : '#999'};`"></i>
                        </div>
                    </div>
                    <div :style="`width: calc(100% - 70px); height: 40px; padding-top: ${dt.isActive ? '5px' : '5px'}; padding-bottom: ${dt.isActive ? '20px' : '10px'};`" :class="`${(i < (orderStatus.length - 1)) ? 'border-bottom' : ''}`">
                        <div class="post-top">
                            <div :class="`fonts ${dt.isActive ? 'fonts-11 black semibold' : 'fonts-10 grey'}`" style="line-height: 1.5;">{{ dt.title }}</div>
                            <div v-if="dt.isActive" class="fonts fonts-9 grey" style="line-height: 1.5;">{{ dt.subtitle }}</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="border-full" style="padding: 15px; margin-bottom: 15px; border-radius: 7px;">
                <div class="display-flex">
                    <div style="width: calc(100% - 75px);">
                        <div class="fonts fonts-11 semibold" style="margin-bottom: 10px;">{{ data.order.shop_name ? data.order.shop_name : '-' }}</div>
                        <div class="display-flex" style="margin-bottom: 5px;">
                            <div style="width: 30px;">
                                <i class="fa fa-lw fa-th-large" style="color: #4dc0b5;"></i>
                            </div>
                            <div style="width: calc(100% - 30px);">
                                <div class="fonts fonts-10 regular">{{ data.order.table_name ? data.order.table_name : '-' }}</div>
                            </div>
                        </div>
                        <div class="display-flex">
                            <div style="width: 30px;">
                                <i class="fa fa-lw fa-user" style="color: #4dc0b5;"></i>
                            </div>
                            <div style="width: calc(100% - 30px);">
                                <div class="fonts fonts-10 regular">{{ data.order.customer_name ? data.order.customer_name : '-' }}</div>
                            </div>
                        </div>
                    </div>
                    <div style="width: 75px;">
                        <div class="image image-padding image-radius">
                            <img v-if="data.shop.image" :src="shopImageThumbnailUrl + data.shop.image" alt="">
                            <i v-else class="post-middle-absolute fa fa-lg fa-store" style="color: #999;" />
                        </div>
                    </div>
                </div>
            </div>

            <div class="border-full" style="padding: 15px; margin-bottom: 15px; border-radius: 7px;">
                <div style="margin-bottom: 10px;">
                    <div class="fonts fonts-10 grey">
                        Note
                    </div>
                    <div class="fonts fonts-10 black semibold orange">
                        # {{ data.order.note  }}
                    </div>
                </div>

                <div class="display-flex space-between" style="margin-bottom: 10px;">
                    <div class="width width-70">
                        <div class="fonts fonts-10 grey">Product(s)</div>
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
                        <div class="fonts fonts-10 semibold black">Rp. {{ dt.subtotal }}</div>
                    </div>
                </div>
            </div>

            <div class="border-full" style="padding: 15px; margin-bottom: 15px; border-radius: 7px;">
                <div class="display-flex space-between" style="margin-bottom: 5px;">
                    <div class="width width-70">
                        <div class="fonts fonts-10 grey">Payment</div>
                    </div>
                    <div class="width width-30"></div>
                </div>
                <div v-if="data.payment" class="display-flex space-between" style="margin-bottom: 0;">
                    <div class="width width-70">
                        <div class="fonts fonts-10 black">Payment Method</div>
                    </div>
                    <div class="width width-30">
                        <div class="fonts fonts-10 black">{{ data.order.payment_name }}</div>
                    </div>
                </div>
                <div class="display-flex space-between" style="margin-bottom: 0;">
                    <div class="width width-70">
                        <div class="fonts fonts-10 black">Payment Status</div>
                    </div>
                    <div class="width width-30">
                        <div class="fonts fonts-10 black">{{ data.order.payment_status ? 'Paid' : 'Unpaid' }}</div>
                    </div>
                </div>
                <div class="display-flex space-between" style="margin-bottom: 0;">
                    <div class="width width-70">
                        <div class="fonts fonts-10 black">Total Price ({{ data.order.total_item }} Product)</div>
                    </div>
                    <div class="width width-30">
                        <div class="fonts fonts-10 black">Rp. {{ data.order.total_price }}</div>
                    </div>
                </div>
                <div class="display-flex space-between" style="margin-bottom: 15px;">
                    <div class="width width-70">
                        <div class="fonts fonts-10 black">Total Payment</div>
                    </div>
                    <div class="width width-30">
                        <div class="fonts fonts-10 black semibold">Rp. {{ data.order.total_price }}</div>
                    </div>
                </div>

                <div class="display-flex space-between" style="margin-bottom: 5px;">
                    <div class="width width-70">
                        <div class="fonts fonts-10 grey">Bills</div>
                    </div>
                    <div class="width width-30"></div>
                </div>
                <div class="display-flex space-between" style="margin-bottom: 0;">
                    <div class="width width-70">
                        <div class="fonts fonts-10 black">Bill Payment</div>
                    </div>
                    <div class="width width-30">
                        <div class="fonts fonts-10">Rp. {{ data.order.bills_price }}</div>
                    </div>
                </div>
                <div class="display-flex space-between" style="margin-bottom: 0;">
                    <div class="width width-70">
                        <div class="fonts fonts-10 black">Change</div>
                    </div>
                    <div class="width width-30">
                        <div class="fonts fonts-10 black semibold">Rp. {{ data.order.change_price }}</div>
                    </div>
                </div>
            </div>

            <div class="border-full" style="padding: 15px; border-radius: 7px;">
                <div style="margin-bottom: 15px;">
                    <div class="fonts fonts-10 grey">
                        Order ID
                    </div>
                    <div class="fonts fonts-10 semibold black">
                        {{ data.order.order_id }}
                    </div>
                </div>
                <div style="margin-bottom: 15px;">
                    <div class="fonts fonts-10 grey">
                        Order Status 
                    </div>
                    <div class="fonts fonts-10 semibold black" style="text-transform: capitalize;">
                        {{ data.order.status  }}
                    </div>
                </div>
                <div style="margin-bottom: 15px;">
                    <div class="fonts fonts-10 grey">
                        Order Date
                    </div>
                    <div class="fonts fonts-10 black semibold">
                        {{ data.order.created_at | moment("dddd, MMMM Do YYYY hh:mm") }}
                    </div>
                </div>
                <div style="margin-bottom: 0;">
                    <div class="fonts fonts-10 grey">
                        Cashier
                    </div>
                    <div class="fonts fonts-10 black semibold">
                        -
                    </div>
                </div>
            </div> 
        </div>
    </div>
</template>
<script>
import AppDote from './AppDote'

const defaultPayloadOrderStatus = [
    {title: 'Shop confirmed your order', subtitle: 'Lorem ipsum doler ismet', icon: 'fa fa-lg fa-check', color: '#38c172', iconColor: '#fff', isActive: false},
    {title: 'Your order is being cooked', subtitle: 'Lorem ipsum doler ismet', icon: 'fa fa-lg fa-fire', color: '#f6993f', iconColor: '#fff', isActive: false},
    {title: 'Delivering your order', subtitle: 'Lorem ipsum doler ismet', icon: 'fa fa-lg fa-utensils', color: '#e3342f', iconColor: '#fff', isActive: true}
]

export default {
    name: 'App',
    data () {
        return {
            orderIndex: 1,
            orderStatus: []
        }
    },
    mounted () {
        const status = this.data && this.data.order && this.data.order.status 
        this.orderIndex = status ? status === 'confirmed' ? 0 : status === 'cooking' ? 1 : status === 'delivered' ? 2 : null : null

        let newPayload = defaultPayloadOrderStatus && defaultPayloadOrderStatus.map((dt, i) => {
            const stt = (i === this.orderIndex) ? true : false 
            return {
                ...dt, 
                isActive: stt 
            }
        })

        this.orderStatus = newPayload
    },
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