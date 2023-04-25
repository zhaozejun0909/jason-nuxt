<script lang="ts" setup>
    import { ref, onMounted, onUnmounted } from 'vue'

    const inputText = ref('')
    const showText = ref('')

    async function requestAction() {
        const words = inputText.value
        const aidata = await useFetch('/api/superai', {method: "POST", body: {r: words}})
        
    }
</script>

<template>
    <div>
        <input id="chatinput" class="input-input" type="text" v-model="inputText" @keyup.enter="requestAction" placeholder="您可以提问与西域旅游相关的问题..." />
        <div @click="requestAction">请求接口</div>
        <div>{{ showText }}</div>
    </div>
</template>