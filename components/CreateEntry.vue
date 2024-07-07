<template>

    <div>
        <div class="mt-32 w-96 mx-auto">
            <h1 class="text-center text-2xl font-bold mb-5"> Create Entry</h1>
            <FormKit type="form" @submit="handleCreateEntry" submit-label="Submit" id="entryform" :actions="false">
                <FormKit type="text" label="Name" name="name" validation="required|name"
                    placeholder="Enter your Name..." />

                <!-- <FormKit type="file" label="Documents" accept="image/*" help="Select One Document" /> -->
                <input type="file" @change="handleFileChange" required accept="image/*">

                <div class="mt-4 flex justify-between">
                    <button type="button" @click="handleCancel" class="bg-gray-500 text-white px-4 py-2 rounded">
                        Cancel
                    </button>
                    <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">
                        Submit
                    </button>
                </div>
            </FormKit>

            <div v-if="Successfull">
                <p class="bg-green-100 border border-green-400 text-black-700 px-4 py-2 rounded relative ">{{ message }}
                </p>
            </div>
        </div>
    </div>


</template>



<script setup>

import axios from 'axios';
import { useAuthStore } from "../stores/auth";
const authStore = useAuthStore();

const errormessage = ref('')

const file = ref(null);

const serverError = ref(false);
const message = ref('')
const Successfull = ref(false);



const handleFileChange = (event) => {
    file.value = event.target.files[0];
};


const uploadFile = async (formData) => {
    const token = authStore.token


    const form = new FormData()
    form.append('file', file.value)

    if (file) {

        try {
            const response = await axios.post('http://localhost:8000/upload', form, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            })
            return response.data.data

        } catch (error) {
            serverError.value = true;
            message.value = error.response.data.message;
        }
    }
}


const handleCreateEntry = async (formData) => {
    const token = authStore.token
    const file = await uploadFile(formData)

    if (file) {
        try {
            const response = await axios.post('http://localhost:8000/entry/create', {
                name: formData.name,
                url: file
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })

            if (response.data && response.data.data) {
                Successfull.value = true;
                message.value = response.data.message;

            }


            setTimeout(() => {
                return navigateTo("/", { replace: true });

            }, 500);
            resetForm();



        } catch (error) {
            Successfull.value = true;
            errormessage.value = error.response.data.message;
        }
    }





}

const handleCancel = () => {
    return navigateTo("/");
}






</script>


<style>
input {
    margin-bottom: 20px;
}
</style>