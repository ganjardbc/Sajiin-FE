<template>
    <div id="App">
        <button v-if="!enableDetail" :class="'btn btn-main ' + (isFull ? 'btn-full' : '') + ' box-shadow'" style="margin-left: 0; margin-right: 10px;" @click="onButtonTable">
            {{ selectedTable && selectedTable.name ? selectedTable.name : 'Choose Visible Table'}} <i :class="'icn fa fa-lg fa-plus-circle'" />
        </button>

        <div v-else class="card box-shadow" style="margin-bottom: 15px; padding: 10px; width: calc(100% - 20px);">
            <div v-if="selectedTable" class="display-flex space-between">
                <div style="width: 45px; margin-right: 15px">
                    <div class="image image-padding border border-full" style="background-color: rgba(0, 0, 0, 0)">
                        <i v-if="!selectedTable.image" class="post-middle-absolute fa fa-lg fa-image" style="font-size: 22px; color: #999;" />
                        <img v-else alt="" :src="selectedTable ? (tableImageThumbnailUrl + selectedTable.image) : ''" />
                    </div>
                </div>
                <div style="width: calc(100% - 100px);">
                    <div class="post-top">
                        <div class="fonts fonts-10 semibold black">
                            {{ selectedTable && selectedTable.name ? selectedTable.name : 'Choose Visible Table' }}
                        </div>
                        <div class="fonts fonts-10 grey">{{ selectedTable && selectedTable.description }}</div>
                    </div>
                </div>
                <div style="width: 40px;">
                    <!-- <button class="post-top btn btn-icon btn-main-reverse with-hover" @click="onButtonTable">
                        <i class="fa fa-lg fa-arrow-right" />
                    </button> -->
                    <router-link :to="{name: 'customer-table'}">
                        <button class="btn btn-icon btn-main-reverse with-hover">
                            <i class="fa fa-lg fa-arrow-right" />
                        </button>
                    </router-link>
                </div>
            </div>
        </div>

        <FormTable
            :data.sync="selectedTable"
            :enablePopup="openCreateTable"
            :onChange="(data) => onChangeTable(data)"
        />
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import FormTable from './FormTable'

const table = {
    id: '',
    table_id: '',
    image: '',
    name: '',
    code: '',
    description: '',
    status: '',
    is_available: ''
}

export default {
    name: 'App',
    data () {
        return {
            openCreateTable: false,
            selectedTable: {...table},
        }
    },
    mounted () {
        const tableData = this.$cookies.get('table')
        this.selectedTable = tableData ? tableData : table
    },
    components: {
        FormTable,
    },
    props: {
        enableDetail: {
            type: Boolean,
            required: false
        },
        isFull: {
            type: Boolean,
            required: false
        },
        onChange: {
            type: Function,
            required: false
        }
    },
    computed: {
        ...mapGetters({
            user: 'auth/user',
            table: 'table/data'
        })
    },
    methods: {
        ...mapActions({
            setTable: 'table/setData'
        }),
        onButtonTable () {
            this.openCreateTable = !this.openCreateTable
        },
        onChangeTable (data) {
            this.selectedTable = data
            this.$cookies.set('table', data)
            this.setTable(this.selectedTable)
            this.onChange(data)
        },
    }
}
</script>