<template>

    <div>
        <div class="mt-32 w-96 mx-auto">
            <h1 class="text-center text-2xl font-bold mb-5">Edit Entry</h1>
            <FormKit type="form" @submit="handleEditEntry" submit-label="Submit" id="entryform" :actions="false">
                <FormKit type="text" label="Name" name="name" validation="required|name"
                    placeholder="Enter your Name..." :value="entry.name" />

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
const emit = defineEmits(['updateEntries', 'cancel']);



const props = defineProps({
    entry: {
        type: Object,
        required: true,
    },
});

const handleCancel = () => {
    emit('cancel');
}


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


const handleEditEntry = async (formData) => {
    const token = authStore.token
    const file = await uploadFile(formData)


    if (file) {
        try {
            const response = await axios.post(`http://localhost:8000/entry/edit/${props.entry._id}`, {
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
                emit('updateEntries');



            }



            reset('entryform')

        } catch (error) {
            console.log(error, "Error")
            Successfull.value = true;
            errormessage.value = error.response.data.message;
        }
    }

}



</script>