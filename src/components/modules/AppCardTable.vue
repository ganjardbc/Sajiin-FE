<template>
    <div id="AppCardTable">
        <div class="display-flex wrap">
            <div v-for="(dt, index) in datas" :key="index" :style="countColumn">
                <div v-if="disableClick">
                    <div v-if="(dt.id === selectedIndex)" class="card-table active" style="cursor: default;">
                        <div class="desc">{{ dt.title }}</div>
                    </div>
                </div>
                <div 
                    v-else
                    :class="'card-table ' + (dt.status ? dt.status : (dt.id === selectedIndex) ? 'active' : '')" 
                    :title="dt.label"
                    @click="onChangeTable(dt)">
                    <div class="desc">{{ dt.title }}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import { mapGetters, mapActions } from 'vuex'

const defaultColumn = 'width: calc(100% / 6);'

export default {
    name: 'AppCardTable',
    data () {
        return {
            selectedIndex: null,
            countColumn: defaultColumn,
            datas: null,
            dataUser: null
        }
    },
    mounted () {
        this.countColumn = this.column ? 'width: calc(100% / ' + this.column + ')' : defaultColumn
        this.dataUser = this.$cookies.get('admin')
        this.onGenerateData(this.dataTable)
    },
    props: {
        disableClick: {
            type: Boolean,
            required: false
        },
        selectedTable: {
            required: false 
        },
        column: {
            required: false
        },
        onChange: {
            type: Function,
            required: false
        }
    },
    computed: {
        ...mapGetters({
            user: 'auth/admin',
            dataTable: 'table/data'
        })
    },
    methods: {
        ...mapActions({
            getData: 'data/getData'
        }),
        onChangeTable (index) {
            this.selectedIndex = index.id
            this.onChange(index)
        },
        onRefreshData () {
            const data = this.datas
            const payload = data && data.map((dt) => {
                return {
                    ...dt
                }
            })
            this.datas = payload
        },
        onGenerateData (data) {
            const payload = data && data.map((dt) => {
                return {
                    id: dt.id, 
                    title: dt.code, 
                    label: dt.name, 
                    description: dt.description, 
                    status: dt.status === 'active' ? 'inactive' : ''
                }
            })
            this.datas = payload
        }
    },
    watch: {
        dataTable (props) {
            if (props) {
                this.onGenerateData(props)
            }
        },
        selectedTable (props) {
            if (props) {
                this.selectedIndex = props.id
                this.onRefreshData()
            }
        }
    }
}
</script>