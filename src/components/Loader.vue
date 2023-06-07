<template>
    <div>
        <h2 class="loader__text">Загрузка информации...</h2>
        <span class="loader"></span>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    setup () {
        

        return {}
    }
})
</script>

<style scoped>
div {
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: center;
    background-color: black;
}
.loader__text {
    margin-bottom: 0;
    align-self: center;
    width: 100%;
    color: #00a100;
    text-align: center;
}
.loader{
        display: block;
        position: relative;
        height: 12px;
        width: 80%;
        border: 1px solid #fff;
        border-radius: 10px;
        overflow: hidden;
}
.loader:after{
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 0;
        background: #FF3D00;
        animation: 5s prog ease-in infinite;
}
@keyframes prog {
    to  {   width: 100%;}
}
</style>