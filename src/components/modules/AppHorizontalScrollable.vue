<template>
    <div id="AppHorizontalScrollable" class="display-flex align-center">
        <div>
            <button class="btn btn-circle btn-white" @click="toLeft(path ? path : 'nav-topic')">
                <i class="fa fa-lg fa-angle-left" />
            </button>
        </div>
        <div 
            class="horizontal-scroll" 
            :style="`height: ${customHeight ? customHeight : '50px'};`"
            :id="path ? path : 'nav-topic'">
            <div class="display-flex left">
                <slot />
            </div>
        </div>
        <div>
            <button class="btn btn-circle btn-white" @click="toRight(path ? path : 'nav-topic')">
                <i class="fa fa-lg fa-angle-right" />
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AppHorizontalScrollable',
    props: {
        path: {
            required: false
        },
        customHeight: {
            required: false
        },
        isScrollable: {
            type: Boolean,
            required: false,
            default: false
        },
        isFull: {
            type: Boolean,
            required: false,
            default: false
        },
    },
    methods: {
        toLeft: function (path) {
			var wd = $('#'+path).width()
			var sc = $('#'+path).scrollLeft()
			if (sc >= 0) {
				$('#'+path).animate({scrollLeft: (sc - wd)}, 500)
			}
		},
		toRight: function (path) {
			var wd = $('#'+path).width()
			var sc = $('#'+path).scrollLeft()
			if (true) {
				$('#'+path).animate({scrollLeft: (sc + wd)}, 500)
			}
		}
    },
}
</script>