<template>

    <div>
        <div class="mt-32 w-96 mx-auto">
            <h1 class="text-center text-2xl font-bold mb-5">Edit {{ user.full_name }}</h1>
            <FormKit type="form" @submit="handleEditPermission" submit-label="Submit" id="entryform" :actions="false">





                <FormKit type="select" label="Permision List" name="permision" :options="allPermissions"
                    :value="props.user.permissions" multiple />

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
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useAuthStore } from "../stores/auth";
const authStore = useAuthStore();

const errormessage = ref('')

const file = ref(null);

const serverError = ref(false);
const message = ref('')
const Successfull = ref(false);
const allPermissions = ref([]);

const emit = defineEmits(['updatePermision', 'cancel']);



const props = defineProps({
    user: {
        type: Object,
        required: true,
    },
});


onMounted(() => {
    permissionList();
});

const handleCancel = () => {
    emit('cancel');
}


const handleEditPermission = async (formData) => {
    const token = authStore.token

    console
    try {
        const response = await axios.post(`http://localhost:8000/users/permission/${props.user._id}`, {
            permissions: formData.permision,
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })

        if (response.data && response.data.data) {
            Successfull.value = true;
            message.value = response.data.message;
            emit('updatePermision');
        }

    } catch (error) {
        console.log(error, "Error")
        Successfull.value = true;
        errormessage.value = error.response.data.message;
    }


}

const permissionList = async () => {
    const token = authStore.token

    try {
        const response = await axios.get(`http://localhost:8000/permission/all`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })


        if (response.data && response.data.data) {
            allPermissions.value = response.data.data;
        }




    } catch (error) {
        Successfull.value = true;
        errormessage.value = error.response.data.message;
    }
}



</script>