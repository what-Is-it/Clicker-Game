<script setup lang="ts">
import WelcomeLayout from './layouts/WelcomeLayout.vue'
import GameLayout from './layouts/GameLayout.vue'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()
const layout = computed(() => {
    if (route.meta.layout === 'welcome') {
        return WelcomeLayout
    } else if (route.meta.layout === 'game') {
        return GameLayout
    }
})
</script>

<template>
    <transition name="fade" mode="out-in"><component :is="layout"/></transition>
</template>

<style scoped>
</style>
