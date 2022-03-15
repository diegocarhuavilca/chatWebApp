<template>
  <div class="home">
    <user-login class="user-login"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import UserLogin from '@/components/User/UserLogin.vue'

export default defineComponent({
  name: 'Home',
  components: {
    UserLogin
  },
});
</script>

<style lang="scss" scoped>
.user-login{
  display: flex;
  flex-direction: column;
  align-items: center ;
}
</style>
