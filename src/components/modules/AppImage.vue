<template>
    <div id="AppImage" class="display-flex">
        <div style="width: 100px; margin-right: 15px;">
            <input 
                v-if="this.isEnable"
                type="file" 
                placeholder="" 
                name="image" 
                id="image"
                ref="file"
                accept="image/*"
                style="display: none;"
                :disabled="visibleLoader"
                @change="previewFiles">
            <div class="image image-padding border-full">
                <img :src="this.image" alt="" />
                <div v-if="!visibleLoader">
                    <button 
                        v-if="this.image !== '' ? this.isEnable ? true : false : false" 
                        class="remove" 
                        title="remove image" 
                        @click="onRemove">
                        <i class="fa fa-1x fa-times" />
                    </button>
                </div>
                <label v-if="isEnable" for="image" style="position: absolute: bottom: 0;">
                    <div  
                        :class="'choose'" 
                        title="choose image">
                        <i class="fa fa-1x fa-pencil-alt" />
                    </div>
                </label>
            </div>
        </div>
        <div v-if="isEnable" style="width: calc(100% - 115px); padding-top: 3px;">
            <!-- <div v-if="this.isEnable" class="field-label" style="margin-bottom: 10px;">Choose / change image</div> -->
            <div class="fonts fonts-10 black" style="margin-bottom: 5px; word-wrap: break-word;">
                Name: {{ formImage.name }}
            </div>
            <div class="fonts fonts-10 black">
                Size: {{ formImage.size }}
            </div>
            <button 
                v-if="!visibleUploadButton"
                :class="'btn btn-full btn-primary'" 
                title="choose image" 
                style="margin-top: 10px; cursor: not-allowed;" 
                disabled>
                Upload
            </button>
            <button 
                v-else 
                :class="'btn btn-full ' + (visibleLoader ? 'btn-primary' : 'btn-main')" 
                title="upload image" 
                style="margin-top: 10px;" 
                :disabled="visibleLoader"
                @click="onUploadImage">
                {{ visibleLoader ? 'Please Wait ..' : 'Upload' }}
            </button>
        </div>

        <!-- <AppAlert 
            v-if="visibleLoader" 
            :isLoader="visibleLoaderAction" /> -->
    </div>
</template>
<script>
import AppAlert from './AppAlert'
export default {
    name: 'AppImage',
    data () {
        return {
            visibleLoader: false,
            visibleLoaderAction: false,
            formImage: '',
            visibleUploadButton: false
        }
    },
    mounted () {
        this.$refs.file.value = null
    },
    components: {
        AppAlert
    },
    props: {
        image: {
            type: String,
            required: true
        },
        isEnable: {
            type: Boolean,
            required: false
        },
        onChange: {
            type: Function,
            required: false
        },
        onRemove: {
            type: Function,
            required: false
        },
        onUpload: {
            type: Function,
            required: false
        }
    },
    methods: {
        previewFiles(event) {
            const file = event.target.files[0]
            this.formImage = file
            this.visibleUploadButton = true
            console.log('file', file)
        },
        onUploadImage() {
            this.onUpload(this.formImage)
            this.visibleLoader = true
            this.visibleLoaderAction = true 
        }
    },
    watch: {
        image: function (props, prevProps) {
            // if (props) {
            //     this.formImage = props
            // } else {
            //     this.formImage = []
            // }
            // console.log('image', props)
            this.$refs.file.value = null
            this.visibleUploadButton = false
            this.visibleLoader = false
            this.visibleLoaderAction = false 
        }
    }
}
</script>