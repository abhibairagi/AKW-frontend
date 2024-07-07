<template>

    <div>
        <div v-if="Successfull">
            <p class="bg-green-100 border border-green-400 text-black-700 px-4 py-2 rounded relative ">{{ message }}
            </p>
        </div>
        <div class="container" v-if="type == 'view'">
            <button @click="handleRedirect" class="right-button">Create Entry</button>
        </div>
        <table border="2" v-if="type == 'view'">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>File</th>
                    <th>Edit</th>
                    <th>Delete</th>

                </tr>
            </thead>
            <tbody>
                <tr v-for="(entry, index) in Entries" :key="index">
                    <td>{{ entry.name }}</td>
                    <td @click="openImage(entry.url)" class="Underline view-image"><i class="svg_icon"><svg
                                xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                                fill="#5f6368">
                                <path
                                    d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm40-80h480L570-480 450-320l-90-120-120 160Zm-40 80v-560 560Z" />
                            </svg>View Image</i></td>
                    <td @click="handleeditEntry(entry)"> <i class="svg_icon"><svg xmlns="http://www.w3.org/2000/svg"
                                height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
                                <path
                                    d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
                            </svg></i></td>
                    <td @click="deleteEntry(entry._id)"> <i class="svg_icon"><svg xmlns="http://www.w3.org/2000/svg"
                                height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
                                <path
                                    d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                            </svg></i></td>
                </tr>

            </tbody>
        </table>

        <EditEntry v-if="type == 'edit'" :entry="entryDetail" @updateEntries="getAllEntries" @cancel="handleCancel" />

    </div>
</template>


<script setup>

import { defineProps } from 'vue';
import { useAuthStore } from "../stores/auth";
import axios from 'axios';
const authStore = useAuthStore();
const message = ref('')
const entryDetail = ref({})
const emit = defineEmits(['getUpdatedEntries']);
const type = ref('view')


const Successfull = ref(false);



const props = defineProps({
    Entries: {
        type: Array,
        required: true,
    },
});

onMounted(() => {
    // console.log(props.Entries);
});


const openImage = (url) => {
    window.open(`http://localhost:8000/storage/${url}`, '_blank');
}


const permissionChecker = async (permission) => {
    const token = authStore.token

    try {
        const response = await axios.post(`http://localhost:8000/users/checker/${permission}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })

        // console.log(response.data && response.data.data, "DATA")

        if (response.data && response.data.data) {
            return response.data && response.data.data
        } else {
            message.value = response.data.message;
            Successfull.value = true;
            return false
        }

    } catch (error) {
        message.value = error.response.data.message;
        Successfull.value = true;
        return false
    }
}


const deleteEntry = async (id) => {
    const token = authStore.token


    const checker = await permissionChecker('Delete')


    if (checker) {
        try {
            const response = await axios.post(`http://localhost:8000/entry/delete/${id}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })


            if (response && response.data) {
                message.value = response.data.message;
                Successfull.value = true;
            }

            getAllEntries()



        } catch (error) {
            Successfull.value = true;
            message.value = error.response.data.message;
        }
    }



}


const handleeditEntry = async (entry) => {


    if (await permissionChecker('Edit')) {
        type.value = 'edit'
        entryDetail.value = entry

    }

}


const handleCancel = () => {
    type.value = 'view'
    entryDetail.value = {}
}


const getAllEntries = () => {
    emit('getUpdatedEntries');


    setTimeout(() => {
        type.value = 'view'
        entryDetail.value = {}
    }, 500);

}

const handleRedirect = () => {
    return navigateTo("/Entry", { replace: true });
}




</script>

<style>
.container {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 10px;
    /* padding: 20px; */
}

.right-button {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.right-button:hover {
    background-color: #0056b3;
}

.view-image {
    /* text-decoration: underline;
    color: blue; */
    cursor: pointer;
}


.svg_icon {
    display: flex;
    justify-content: center;
    align-items: center;
}

table {
    width: 100%;
    border-collapse: collapse;
}

svg {
    text-align: center;
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
</style>