<template>
    <div id="AppListDownMenu">
        <ul :class="(isSidebarSmall 
                ? 'content-scroll menu-list hover with-icon small' 
                : 'content-scroll menu-list hover with-icon ' + (enableGridView ? 'display-flex wrap' : '')
            )">
            <li v-for="(dt, index) in data" :key="index" :class="'ml-list ' + (enableGridView ? 'fixed-column-3' : '')">
                <router-link v-if="!dt.menu" :to="{name: dt.link}" class="ml-link">
                    <div class="ml-icon">
                        <i :class="dt.icon" />
                    </div>
                    <div class="ml-label">
                        <div class="label">
                            {{ dt.label }}
                        </div>
                    </div>
                    <div class="val-container">
                        <div v-if="dt.value > 0" class="ml-value">
                            <div class="post-center">{{ dt.value }}</div>
                        </div>
                    </div>
                </router-link>
                <div v-if="dt.menu" class="submenu">
                    <div class="sublist">
                        <div class="sublabel">
                            {{ dt.label }}
                        </div>
                    </div>
                    <ul v-if="dt.menu.length > 0" class="subcontent">
                        <li v-for="(sb, index) in dt.menu" :key="index" class="ml-list">
                            <router-link :to="{name: sb.link}" class="ml-link">
                                <div class="ml-icon">
                                    <i :class="sb.icon" />
                                </div>
                                <div class="ml-label">
                                    {{ sb.label }}
                                </div>
                                <div class="val-container">
                                    <div v-if="sb.value > 0" class="ml-value">
                                        <div class="post-center">{{ sb.value }}</div>
                                    </div>
                                </div>
                            </router-link>
                        </li>
                    </ul>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name: 'AppListDownMenu',
    data () {
        return {
            datas: this.data
        }
    },
    props: {
        enableGridView: {
            type: Boolean,
            required: false
        },
        disableResponsive: {
            type: Boolean,
            required: false
        },
        isSidebarSmall: {
            type: Boolean,
            required: false
        },
        data: {
            required: true
        }
    },
    watch: {
        data: function (props, prevProps) {
            if (props) {
                this.datas = props
            } else {
                this.datas = []
            }
        }
    }
}
</script>