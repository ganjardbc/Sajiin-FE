<template>
    <div class="main-screen" style="padding-top: 40px;">
        <div class="width width-50 width-mobile width-center content-center">
            <h2 class="fonts fonts-28 bold black no-line-height">Plans to fit your fleet operation</h2>
            <div style="margin-top: 15px; margin-bottom: 15px;">
                <div class="bottom-line" style="margin: auto;"></div>
            </div>
            <p class="fonts fonts-12 grey center">
                14-day free trial. Simple, scalable pricing. No credit card required.
            </p>
        </div>
        <div class="width width-80 width-mobile width-center display-flex display-mobile wrap" style="padding-top: 32px;">
            <div v-for="(dt, i) in pricing" :key="i" class="width width-50 width-mobile">
                <div style="padding: 15px;" class="no-margin-padding">
                    <div :class="'card border-full ' + (dt.type === 'recommended' ? 'box-shadow' : '')" style="margin-bottom: 15px;">
                        <div style="position: absolute; top: 0; left: 0; width: 100%; height: 10px;" :class="(dt.type === 'recommended' ? 'bg-main' : 'bg-white')"></div>
                        <div style="padding: 15px;">
                            <h1 class="fonts fonts-24 black bold">{{ dt.title }}</h1>
                            <div class="fonts fonts-11 grey">{{ dt.description }}</div>
                            <div style="margin-top: 10px; margin-bottom: 5px;">
                                <div v-if="dt.secondPrice" class="fonts fonts-16 grey" style="text-decoration: line-through;">{{ dt.secondPrice }}</div>
                                <div class="fonts fonts-26 black semibold">{{ dt.price }}</div>
                            </div>
                            <div v-if="dt.isRecomended" class="display-flex" style="padding-top: 5px;">
                                <div class="card-capsule active">
                                    <i class="fa fa-lw fa-star" />
                                    Recommended
                                </div>
                            </div>
                            <div style="padding-top: 50px; padding-bottom: 50px;">
                                <div v-for="(sb, j) in dt.data" :key="j" class="display-flex" style="padding-top: 10px; padding-bottom: 10px;">
                                    <div style="width: 30px; padding-top: 3px;">
                                        <i class="fonts green far fa-lg fa-check-circle" />
                                    </div>
                                    <div style="width: calc(100% - 30px)">
                                        <div class="fonts fonts-11 black">{{ sb.title }}</div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <button class="btn btn-main btn-full">
                                    Choose Packet
                                </button>
                            </div>
                        </div>
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
            pricing: [
                // {icon: 'fa fa-lg fa-circle', price: 'Free', title: 'Free Trial', isRecomended: false, type: 'reguler', data: [
                //     {title: 'Amplop Digital'},
                //     {title: 'Hitung Mundur Acara'},
                //     {title: 'Quotes'},
                //     {title: 'Background Music'},
                //     {title: 'Masa Aktif Undangan 2 Hari'}
                // ]},
                {icon: 'fa fa-lg fa-circle', price: 'Rp 80.000', secondPrice: 'Rp 90.000', title: 'Pro', description: 'For fleets that outsource all maintenance and repairs to external shops', isRecomended: false, type: 'reguler', data: [
                    {title: 'Google Maps'},
                    {title: 'Amplop Digital'},
                    {title: 'Hitung Mundur Acara'},
                    {title: 'Short Link'},
                    {title: 'Slider Cover'},
                    {title: 'Quotes'},
                    {title: 'Background Music'},
                    {title: 'Masa Aktif Undangan 1 Tahun'}
                ]},
                {icon: 'fa fa-lg fa-circle', price: 'Rp 175.000', secondPrice: 'Rp 200.000', title: 'Advanced', description: 'For fleets that handle some maintenance in-house or keep parts on hand', isRecomended: true, type: 'recommended', data: [
                    {title: 'Google Maps'},
                    {title: 'Amplop Digital'},
                    {title: 'Hitung Mundur Acara'},
                    {title: 'Short Link'},
                    {title: 'Buku Tamu'},
                    {title: 'Galeri Foto'},
                    {title: 'Nama Tamu'},
                    {title: 'Menampilkan Video (Youtube)'},
                    {title: 'Slider Cover'},
                    {title: 'Quotes'},
                    {title: 'Background Music'},
                    {title: 'Kostum Tema'},
                    {title: 'Masa Aktif Undangan 1 Tahun'}
                ]}
            ]
        }
    }
}
</script>
