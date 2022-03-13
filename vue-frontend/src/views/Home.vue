<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
        <n-button type="warning">
      Warning
    </n-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
 import { NButton } from 'naive-ui'
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

export default defineComponent({
  name: 'Home',
  components: {
    HelloWorld,
    NButton
  },
});
</script>
