<template>
    <div>
        <h1 v-if="type == 'view'" class="font-bold text-2xl text-center mt-6">Welcome {{ authStore.user.full_name }}
        </h1>
        <div v-if="checkUser" class="centered-container">
            <p> No User Found</p>
        </div>
        <table border="2" v-if="type == 'view'">
            <thead>
                <tr>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Permissions</th>
                    <th>Edit</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(user, index) in allUsers" :key="index">
                    <td>{{ user.full_name }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.permissions }}</td>
                    <td @click="handleEditUserPermisison(user)"> <i class="svg_icon"><svg
                                xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                                fill="#5f6368">
                                <path
                                    d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
                            </svg></i></td>


                </tr>

            </tbody>
        </table>

        <EditPermission v-if="type == 'edit'" :user="editUser" @cancel="handleCancel" @updatePermision="getUsers" />




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


const allUsers = ref([]);
const type = ref('view');
const editUser = ref({});


const checkUser = ref(true);




onMounted(() => {

    if (authStore.user.role !== 'admin') {
        return navigateTo("/");
    }

    getUsers();
});

const getUsers = async () => {

    const token = authStore.token

    try {
        const response = await axios.get('http://localhost:8000/users/all', {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        });

        if (response.data && response.data.data) {


            if (response.data.data.length > 0) {
                allUsers.value = response.data.data
                checkUser.value = false
            }

            handleCancel()

        }
    } catch (error) {


    }

}

const handleCancel = async () => {
    type.value = 'view'
    editUser.value = {}
}

const handleEditUserPermisison = (user) => {
    type.value = 'edit'
    editUser.value = user
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


.svg_icon {
    display: flex;
    justify-content: center;
    align-items: center;
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
