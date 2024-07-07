<template>
  <div>
    <h1 class="font-bold text-2xl text-center mt-6">Welcome {{ authStore.user.full_name }}</h1>
    <div v-if="checkEntries" class="centered-container">
      <p> No Entry Found</p>
      <FormKit type="button" label="Create Entry" help="" @click="handleRedirect" />
    </div>

    <Entries v-else :Entries="allEntries" @getUpdatedEntries="getEntries" />
  </div>
</template>

<script setup>

defineAsyncComponent(() => ({
  middleware: auth
}))




import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useAuthStore } from "@/stores/auth";
const authStore = useAuthStore();


const allEntries = ref([]);
const checkEntries = ref(true);





onMounted(() => {

  if (!authStore.isAuthenticated) {
    return navigateTo("/login");
  }

  getEntries();
});

const getEntries = async () => {

  const token = authStore.token

  try {
    const response = await axios.get('http://localhost:8000/entry/all', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });

    if (response.data && response.data.data) {


      if (response.data.data.length > 0) {
        allEntries.value = response.data.data
        checkEntries.value = false
      } else {
        checkEntries.value = true
      }


    } else {
      // serverError.value = true;
      // message.value = response.data.message;

    }
  } catch (error) {
    // serverError.value = true;
    // message.value = error.response.data.message;

  }

}


const handleRedirect = () => {
  return navigateTo("/entry", { replace: true });

}

</script>

<style lang="css" scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

table,
th,
td {
  /* border: 1px solid black; */
}

th,
td {
  padding: 10px;
  text-align: center;
}

th {
  background-color: #f2f2f2;
}


.centered-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80vh;
}

p {
  margin-bottom: 10px;
}
</style>
