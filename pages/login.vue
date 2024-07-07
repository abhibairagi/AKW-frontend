<template>
  <div>
    <div class="mt-32 w-96 mx-auto">
      <h1 class="text-center text-2xl font-bold mb-5">User Login</h1>
      <FormKit type="form" @submit="submitLoginForm" submit-label="Login" id="loginForm">
        <FormKit type="text" label="Email" name="email" validation="required|email" placeholder="Enter your email..." />

        <FormKit type="password" label="Password" name="password" validation="required"
          placeholder="Enter your password..." />

      </FormKit>
      <i class="text-gray-700 text-sm">
        Do not have Account ?
        <NuxtLink to="/register" class="text-blue-500 hover:text-blue-700">Create an Account</NuxtLink>
      </i>
      <div v-if="serverError">
        <p class="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative ">{{ message }}</p>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

import { useAuthStore } from "@/stores/auth";
import axios from 'axios';
const authStore = useAuthStore();
const message = ref('')

const serverError = ref(false);

onMounted(() => {
  if (authStore.isAuthenticated) {
    return navigateTo("/");
  }
});


const submitLoginForm = async (formData) => {

  try {
    const response = await axios.post('http://localhost:8000/users/signin', {
      email: formData.email,
      password: formData.password,
    });

    if (response.data && response.data.data) {


      authStore.login(response.data.data.user);
      authStore.setToken(response.data.data.token);


      if (response.data.data.user.role == 'admin') {
        return navigateTo("/", { replace: true });
      }
      return navigateTo("/", { replace: true });
    } else {
      serverError.value = true;
      message.value = response.data.message;

    }
  } catch (error) {
    serverError.value = true;
    message.value = error.response.data.message;

  }
};
</script>



<style lang="css" scoped></style>
