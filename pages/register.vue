<template>
  <div v-if="isSuccess" class="mt-2">
    <p class="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded relative ">{{ message }}</p>
  </div>
  <div class="my-32 w-96 mx-auto">
    <h1 class="text-center text-2xl font-bold mb-5">Create an Account</h1>
    <FormKit type="form" @submit="submitRegistrationForm" submit-label="Register" id="registrationForm">
      <FormKit type="text" label="Name" name="name" validation="required" placeholder="Enter your name..." />

      <FormKit type="text" label="Email" name="email" validation="required|email" placeholder="Enter your email..." />

      <FormKit type="password" label="Password" name="password" validation="required"
        placeholder="Enter your password..." />

    </FormKit>
    <i class="text-gray-700 text-sm">
      Already have an Account ?
      <NuxtLink to="/login" class="text-blue-500 hover:text-blue-700">Login</NuxtLink>
    </i>
    <div v-if="messageFlag">
      <p class="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative ">{{ message }}</p>
    </div>

    <div v-if="successFlag">
      <p class="bg-green-100 border border-green-400 text-red-700 px-4 py-2 rounded relative ">{{ successMessage }}</p>
    </div>

  </div>
</template>

<script setup>
import { reset } from '@formkit/core'
import { useAuthStore } from "@/stores/auth";
import axios from 'axios';
const authStore = useAuthStore();
const messageFlag = ref(false)
const successFlag = ref(false)
const isSuccess = ref(false)
const message = ref('')
const successMessage = ref('')



onMounted(() => {
  if (authStore.isAuthenticated) {
    return navigateTo("/");
  }
});






const submitRegistrationForm = async (formData) => {

  try {
    console.log(formData, "DATA")

    const response = await axios.post('http://localhost:8000/users/signup', {
      full_name: formData.name,
      email: formData.email,
      permissions: ['Edit', 'View Own', 'Delete'],
      password: formData.password,
    });


    if (response.data && response.data.data) {

      successFlag.value = true;
      successMessage.value = response.data.message;


      setTimeout(() => {
        return navigateTo("/login", { replace: true });

      }, 500);

    } else {
      successFlag.value = true;
      successMessage.value = response.data.message;

    }
  } catch (error) {
    messageFlag.value = true;
    message.value = error.response.data.message;

  }
};
</script>
