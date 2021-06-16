<template>
    <div id="product">
        <div class="main-screen" style="padding-top: 20px;">
            <AppText :type="'subtitle'">Order Tracking</AppText>
            <div class="display-flex" style="margin-top: 20px;">
                <div class="width width-65">

                    <div class="width width-full" style="margin-bottom: 15px;">
                        <AppText style="margin-bottom: 5px;">Nomor Invoice</AppText>
                        <div class="display-flex space-between margin margin-bottom-5-px">
                            <AppText :type="'bold'">(INV/20210210/XXI/II/749859808)</AppText>
                        </div>
                    </div>
                    <div class="width width-full" style="margin-bottom: 15px;">
                        <AppText style="margin-bottom: 5px;">Penanggung Jawab</AppText>
                        <div class="display-flex space-between margin margin-bottom-5-px">
                            <AppText :type="'bold'">Admin</AppText>
                        </div>
                    </div>
                    <div class="width width-full" style="margin-bottom: 30px;">
                        <AppText style="margin-bottom: 5px;">Tanggal Pemesanan</AppText>
                        <div class="display-flex space-between margin margin-bottom-5-px">
                            <AppText :type="'bold'">10 Feb 2021, 00:58 WIB</AppText>
                        </div>
                    </div>

                    <div class="width width-full padding padding-top-30-px border-top">
                        <AppText :type="'bold'" style="margin-bottom: 15px;">Status Pesanan</AppText>
                        <div v-for="(dt, index) in status" :key="index" class="width width-full" style="margin-bottom: 30px;">
                            <div class="display-flex margin margin-bottom-15-px">
                                <div style="postion: relative; width: 45px;">
                                    <div style="width: 25px; height: 25px; border-radius: 100%; background-color: #ccc;"></div>
                                    <div style="position: relative; top: 0; left: 10px; width: 5px; height: 50px; background-color: #ccc;"></div>
                                </div>
                                <div style="postion: relative; width: calc(100% - 165px);">
                                    <AppText type="bold">{{ dt.title }}</AppText>
                                    <AppText>{{ dt.description }}</AppText>
                                    <AppText>{{ dt.date }}</AppText>
                                </div>
                                <AppButton
                                    :onPress="onRegister"
                                    style="margin: 0; width: 120px; height: 40px;"
                                    title="Verifikasi"
                                    type="primary"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="width width-35">
                    <div class="width width-90" style="margin-left: 10%;">
                        <div class="border-full padding padding-15-px">
                            <AppText :type="'bold'" style="margin-bottom: 5px;">Ringkasan Pesanan</AppText>
                            <div class="display-flex space-between margin margin-bottom-5-px">
                                <AppText>Total produk</AppText>
                                <AppText>1x</AppText>
                            </div>
                            <div class="display-flex space-between margin margin-bottom-5-px">
                                <AppText>Pengiriman</AppText>
                                <AppText>SI-CEPAT</AppText>
                            </div>
                            <div class="display-flex space-between margin margin-bottom-20-px">
                                <AppText>Pembayaran</AppText>
                                <AppText>OVO</AppText>
                            </div>

                            <div class="display-flex space-between margin margin-bottom-20-px">
                                <AppText :type="'bold'" style="margin-bottom: 5px;">Total Bayar</AppText>
                                <AppText :type="'bold'">Rp 152.000</AppText>
                            </div>

                            <AppButton
                                routeName="order-detail"
                                title="Detail Pesanan"
                                type="main"
                            />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import AppWrapper from '../../modules/AppWrapper'
import AppButton from '../../modules/AppButton'
import AppText from '../../modules/AppText'
import AppCardCharts from '../../modules/AppCardCharts'

export default {
    name: 'product',
    data () {
        return {
            icon: '',
            data: [
                {
                    id: 1,
                    title: 'Name of cake that will selling',
                    note: 'Lorem ipsum dolor sit, amet consectetur.',
                    price: 'IDR 150 K',
                    toping: 'toping 1, toping 2',
                    qty: '1 produk'
                }
            ],
            status: [
                {
                    id: 1,
                    title: 'Lorem ipsum dolor sit',
                    description: 'Lorem ipsum dolor sit, amet consectetur.',
                    date: '2 February 2021 01:37:33 PM',
                },
                {
                    id: 2,
                    title: 'Lorem ipsum dolor sit',
                    description: 'Lorem ipsum dolor sit, amet consectetur.',
                    date: '2 February 2021 01:37:33 PM',
                },
                {
                    id: 1,
                    title: 'Lorem ipsum dolor sit',
                    description: 'Lorem ipsum dolor sit, amet consectetur.',
                    date: '2 February 2021 01:37:33 PM',
                },
                {
                    id: 2,
                    title: 'Lorem ipsum dolor sit',
                    description: 'Lorem ipsum dolor sit, amet consectetur.',
                    date: '2 February 2021 01:37:33 PM',
                },
                {
                    id: 1,
                    title: 'Lorem ipsum dolor sit',
                    description: 'Lorem ipsum dolor sit, amet consectetur.',
                    date: '2 February 2021 01:37:33 PM',
                },
                {
                    id: 2,
                    title: 'Lorem ipsum dolor sit',
                    description: 'Lorem ipsum dolor sit, amet consectetur.',
                    date: '2 February 2021 01:37:33 PM',
                }
            ]
        }
    },
    components: {
        AppWrapper,
        AppButton,
        AppText,
        AppCardCharts
    },
    methods: {
        onRegister () {
            console.log('REGISTER')
        }
    },
}
</script>