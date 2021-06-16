<template>
    <div id="AppText">
        <h1 v-if="type === 'title'" class="title">
            <router-link v-if="routeName" :to="{name: routeName}">
                <slot />
            </router-link>
            <span v-else>
                <slot />
            </span>
        </h1>
        <h2 v-else-if="type === 'subtitle'" class="subtitle">
            <router-link v-if="routeName" :to="{name: routeName}">
                <slot />
            </router-link>
            <span v-else>
                <slot />
            </span>
        </h2>
        <p v-else-if="type === 'bold'" class="content bold">
            <router-link v-if="routeName" :to="{name: routeName}">
                <slot />
            </router-link>
            <span v-else>
                <slot />
            </span>
        </p>
        <p v-else-if="type === 'normal'" class="content normal">
            <router-link v-if="routeName" :to="{name: routeName}">
                <slot />
            </router-link>
            <span v-else>
                <slot />
            </span>
        </p>
        <p v-else class="content">
            <router-link v-if="routeName" :to="{name: routeName}">
                <slot />
            </router-link>
            <span v-else>
                <slot />
            </span>
        </p>
    </div>
</template>

<script>
export default {
    name: 'AppText',
    props: {
        type: String,
        routeName: String
    },
    data: {
        textStyle: 'content'
    }
}
</script>