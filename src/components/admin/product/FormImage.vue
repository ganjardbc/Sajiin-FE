<template>
    <div id="FormImage">
        <AppLoader v-if="visibleLoader" />

        <div v-else>
            <div class="card box-shadow" v-for="(dt, index) in datas" :key="index">
                <div class="display-flex">
                    <div class="width width-60-px">
                        <div class="image image-45px">
                            <img :src="productImageThumbnailUrl + dt.image" alt="SAJI-IN" />
                        </div>
                    </div>
                    <div>
                        <div class="display-flex margin margin-bottom-5-px">
                            <div class="fonts micro black width width-100-px">ID</div>
                            <div class="fonts micro black semibold">{{ dt.id }}</div>
                        </div>
                        <div class="display-flex margin margin-bottom-5-px">
                            <div class="fonts micro black width width-100-px">Image ID</div>
                            <div class="fonts micro black semibold">{{ dt.prodimage_id }}</div>
                        </div>
                        <div class="display-flex margin margin-bottom-10-px">
                            <div class="fonts micro black width width-100-px">Description</div>
                            <div class="fonts micro black semibold">{{ dt.description }}</div>
                        </div>
                    </div>
                </div>
                <div v-if="enableButton" class="display-flex space-between margin margin-bottom-0-px">
                    <div></div>
                    <div class="display-flex content-right">
                        <button class="btn btn-small-icon btn-sekunder" @click="onEdit(index)">
                            <i class="fa fa-1x fa-pencil-alt"></i>
                        </button>
                        <button class="btn btn-small-icon btn-sekunder" @click="onShowHideDelete(index)">
                            <i class="fa fa-1x fa-trash-alt"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <AppPopupForm
            v-if="visiblePopup"
            :title="isCreate ? 'Create Image' : 'Edit Image'"
            :enableSaveButton="true"
            :onClose="onClose"
            :onSave="onShowHideSave"
        >
            <div class="field-group margin margin-bottom-15-px">
                <div class="field-label">ID</div>
                <input 
                    type="text" 
                    placeholder="" 
                    class="field field-sekunder" 
                    name="id" 
                    id="id" 
                    v-model="payload.id"
                    readonly>
            </div>
            <div class="field-group margin margin-bottom-15-px">
                <div class="field-label">IMAGE ID</div>
                <input 
                    type="text" 
                    placeholder="" 
                    class="field field-sekunder" 
                    name="prodimage_id" 
                    id="prodimage_id" 
                    v-model="payload.prodimage_id"
                    readonly>
                <div v-if="formMessage" class="fonts micro semibold" style="color: red; margin-top: 5px;">
                    {{ formMessage && formMessage.prodimage_id && formMessage.prodimage_id[0] }}
                </div>
            </div>
            <div v-if="isCreate ? true : false" class="field-group margin margin-bottom-15-px">
                <div class="field-label">IMAGE</div>
                <input 
                    type="file" 
                    placeholder="" 
                    name="image" 
                    id="image"
                    ref="file"
                    accept="image/*"
                    @change="previewFiles">
                <div v-if="formMessage" class="fonts micro semibold" style="color: red; margin-top: 5px;">
                    {{ formMessage && formMessage.image && formMessage.image[0] }}
                </div>
            </div>
            <div class="field-group margin margin-bottom-15-px">
                <div class="field-label">DESCRIPTION</div>
                <textarea 
                    name="description" 
                    id="description" 
                    class="field field-sekunder field-textarea" 
                    v-model="payload.description"></textarea>
                <div v-if="formMessage" class="fonts micro semibold" style="color: red; margin-top: 5px;">
                    {{ formMessage && formMessage.description && formMessage.description[0] }}
                </div>
            </div>
        </AppPopupForm>

        <AppAlert 
            v-if="visibleAlertDelete" 
            :isLoader="visibleLoaderAction"
            :title="'This action will remove data permanently, delete this data ?'" 
            :onClose="onShowHideDelete" 
            :onSave="removeData" />
        
        <AppAlert 
            v-if="visibleAlertSave" 
            :isLoader="visibleLoaderAction"
            :title="'Proceed this data ?'" 
            :onClose="onShowHideSave" 
            :onSave="saveData" />
    </div>
</template>

<script>
import axios from 'axios'
import AppPopupForm from '../../modules/AppPopupForm'
import AppAlert from '../../modules/AppAlert'
import AppLoader from '../../modules/AppLoader'

const payload = {
    id: '',
    prodimage_id: '',
    image: '',
    description: '',
    product_id: 0
}

export default {
    name: 'FormImage',
    data () {
        return {
            visibleAlertDelete: false,
            visibleAlertSave: false,
            visibleLoader: false,
            visibleLoaderAction: false,
            isCreate: true,
            visiblePopup: false,
            payload: {...payload},
            datas: [],
            formMessage: []
        }
    },
    mounted () {
        this.getData(this.selectedProductId)
    },
    components: {
        AppLoader,
        AppPopupForm,
        AppAlert
    },
    props: {
        selectedId: {
            required: true
        },
        selectedProductId: {
            required: true
        },
        enableButton: {
            required: false,
            type: Boolean
        },
        enablePopup: {
            required: false,
            type: Boolean
        }
    },
    methods: {
        previewFiles(event) {
            const file = event.target.files[0]
            this.payload = {
                ...this.payload,
                image: file
            }
        },
        onShowHideDelete (index = null) {
            this.visibleAlertDelete = !this.visibleAlertDelete
            this.payload = this.datas[index] ? this.datas[index] : payload
            this.formMessage = []
        },
        onShowHideSave () {
            this.visibleAlertSave = !this.visibleAlertSave
            this.formMessage = []
        },
        onClose: function () {
            this.visiblePopup = false
            this.isCreate = true
            this.payload = {...payload}
            this.formMessage = []
        },
        onEdit: function (index) {
            this.visiblePopup = true
            this.isCreate = false
            this.payload = this.datas[index] ? this.datas[index] : payload
            this.formMessage = []
        },
        async removeData () {
            this.visibleLoaderAction = true

            const token = 'Bearer '.concat(this.$cookies.get('token'))
            const id = this.payload.prodimage_id
            const payload = {
                prodimage_id: id
            }

            const rest = await axios.post('/api/productImage/delete', payload, { headers: { Authorization: token } })

            if (rest && rest.status === 200) {
                this.onShowHideDelete()
                this.onClose()
                this.visibleLoaderAction = false

                const data = rest.data
                if (data.status === 'ok') {
                    this.getData(this.selectedProductId)
                } else {
                    alert('Proceed failed')
                }
            } else {
                alert('Proceed failed')
                this.visibleLoaderAction = false
            }
        },
        async saveData () {
            this.visibleLoaderAction = true

            const token = 'Bearer '.concat(this.$cookies.get('token'))
            const payload = {...this.payload, product_id: this.selectedId}
            const url = this.isCreate ? '/api/productImage/post' : '/api/productImage/update' 

            const time = new Date().getTime()
            const newPayload = this.isCreate ? {
                ...payload,
                prodimage_id: 'PI-' + time.toString()
            } : {
                ...payload
            }

            let formData = new FormData();
            formData.append('prodimage_id', newPayload.prodimage_id);
            formData.append('image', newPayload.image);
            formData.append('description', newPayload.description);
            formData.append('product_id', newPayload.product_id);

            const rest = await axios.post(url, formData, { headers: { Authorization: token, 'Content-Type': 'multipart/form-data' } })

            if (rest && rest.status === 200) {
                this.onShowHideSave()
                this.visibleLoaderAction = false

                const data = rest.data.data
                if (data.length !== 0) {
                    this.onClose()
                    this.getData(this.selectedProductId)
                } else {
                    this.formMessage = rest.data.message
                }
            } else {
                alert('Proceed failed')
                this.visibleLoaderAction = false
            }
        },
        async getData (id) {
            this.visibleLoader = true 

            const token = 'Bearer '.concat(this.$cookies.get('token'))
            const payload = {
                limit: 1000,
                offset: 0,
                product_id: id
            }

            const rest = await axios.post('/api/productImage/getAll', payload, { headers: { Authorization: token } })

            if (rest && rest.status === 200) {
                const data = rest.data.data
                this.datas = data
                this.visibleLoader = false
            } else {
                this.visibleLoader = false
            }
        },
    },
    watch: {
        selectedProductId: function (props, prevProps) {
            if (props) {
                this.getData(props)
            }
        },
        enablePopup: function (props, prevProps) {
            if (!this.visiblePopup) {
                this.visiblePopup = true
            } else {
                this.visiblePopup = false
            }
        }
    }
}
</script>