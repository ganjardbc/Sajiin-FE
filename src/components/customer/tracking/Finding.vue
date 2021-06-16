<template>
    <div id="product">
        <div class="main-screen" style="padding-top: 20px;">
            <div class="width width-50" style="margin: auto;">
                <div class="border-full padding padding-30-px margin margin-top-30-px">
                    <AppText :type="'subtitle'">Find Order</AppText>
                    <AppText class="margin margin-bottom-30-px">Lorem ipsum dolor sit, amet consectetur.</AppText>

                    <AppText :type="'bold'">Nomor Invoice</AppText>
                    <div class="display-flex space-between margin margin-top-10-px">
                        <div style="width: calc(100% - 75px); height: 40px; margin-right: 15px;">
                            <AppForm styleType="sekunder" placeholder="1234567890" />
                        </div>
                        <AppButton
                            routeName="tracking"
                            style="width: 60px;"
                            title="CARI"
                            type="main"
                        />
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
import AppForm from '../../modules/AppForm'
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
                },
                {
                    id: 2,
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
        AppCardCharts,
        AppForm
    },
    methods: {
        onRegister () {
            console.log('REGISTER')
        }
    },
}
</script>