<template>
  <n-form
    ref="formRef"
    inline
    :label-width="80"
    :model="formValue"
    :rules="rules"
    size="large"
  >
    <n-form-item label="Username" path="username">
      <n-input v-model:value="formValue.username" placeholder="Username" />
    </n-form-item>
    <n-form-item label="Password" path="password">
      <n-input v-model:value="formValue.password" type="password"
    show-password-on="mousedown" placeholder="Password" />
    </n-form-item>
    <n-form-item>
      <n-button @click="handleValidateClick"> Login </n-button>
    </n-form-item>
  </n-form>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { FormInst } from "naive-ui";
import {APIEndpoints} from "@/api/APIEndpoints"
import {UserRequest} from "@/api/APITypes"

export default defineComponent({
  name: "UserLogin",
  setup() {
    const formRef = ref<FormInst | null>(null);
    const formValue:UserRequest = reactive({username:null,password:null})

    return {
      formRef,
      formValue,
      rules:{
        username:{
          required:true,
          message:'Please input your name',
          trigger:'blur'  
        },
        password:{
          required:true,
          message:'Please input your password',
          trigger:'blur'
        }
      },
      async handleValidateClick (e: MouseEvent) {
        e.preventDefault()
        formRef.value?.validate((errors) => {
          if (!errors) {
            APIEndpoints.api.user.login(formValue).then((res)=>{
              console.log(res)
            }).catch((err)=>{
              console.log(err.response.data)
            })
          } 
        }).catch((err)=>{
          console.log(err)
        })
      }
    };
  },
});
</script>

<style></style>
