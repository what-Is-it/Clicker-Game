<template>
<Loader v-if="loading"/>
<div v-else>
<pre class="print">
    </pre>
    <div class="link"><router-link to="/game">Начать игру</router-link></div>
</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, Ref, ref } from 'vue'
import Loader from '../components/Loader.vue'
import init from '../anim'
import typeText from '../utils/print'

export default defineComponent({
    setup () {
        const loading: Ref<boolean> = ref(true)

        onMounted(async ()=>{
            await setTimeout(()=>{
                loading.value = false
            }, 5000)
            await setTimeout(()=>{
                init(),
                typeText()
            }, 5000)
            
        })
        
        return {loading}
    },
    components: {Loader}
})
</script>

<style scoped>

</style>