<template>
  <nav class="">
    <div class="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <p href="/" class="text-dark font-bold text-xl"><span><svg xmlns="http://www.w3.org/2000/svg" height="24px"
                  viewBox="0 -960 960 960" width="24px" fill="#5f6368">
                  <path
                    d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm40-80h480L570-480 450-320l-90-120-120 160Zm-40 80v-560 560Z" />
                </svg></span>Pic Store</p>
          </div>
          <div class="hidden md:block">
            <div class="ml-10 flex items-baseline">
              <NuxtLink to="/users" v-if="authStore.user.role == 'admin'"
                class="ml-4 px-3 py-2 rounded-md text-sm font-medium text-black hover:text-gray-300">User permissions
              </NuxtLink>
              <!--  <NuxtLink
                to="/contact"
                class="ml-4 px-3 py-2 rounded-md text-sm font-medium text-white hover:text-gray-300"
                >Contact</NuxtLink
              >
              <NuxtLink
                to="/user/dashboard"
                class="ml-4 px-3 py-2 rounded-md text-sm font-medium text-white hover:text-gray-300"
                v-if="authStore.isAuthenticated"
                >Dashboard
              </NuxtLink> -->
            </div>
          </div>
        </div>
        <div v-if="authStore.isAuthenticated" class="hidden md:block marginleft">
          <div class="ml-4 flex items-center md:ml-6 marginleft">
            <NuxtLink @click="handlelogout" v-if="authStore.isAuthenticated"
              class="bg-dark text-dark font-bold py-2 px-4 ml-4 rounded">Logout
            </NuxtLink>

          </div>
        </div>

        <!-- <div class="md:hidden z-50">
          <button @click="isMobileMenuOpen = !isMobileMenuOpen" type="button"
            class="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            aria-controls="mobile-menu" aria-expanded="false">
            <span class="sr-only">Open main menu</span>

            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="w-6 h-6" :class="{
          hidden: isMobileMenuOpen,
          'inline-flex': !isMobileMenuOpen,
        }">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>

            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="w-6 h-6" :class="{
          hidden: !isMobileMenuOpen,
          'inline-flex': isMobileMenuOpen,
        }">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div v-if="isMobileMenuOpen" class="absolute top-0 inset-x-0 transition transform md:hidden mt-16">
            <div class="shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
              <div class="px-2 pt-2 pb-3 space-y-1">
                <NuxtLink to="/"
                  class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                  @click="isMobileMenuOpen = false">Home</NuxtLink>
                <NuxtLink to="/contact"
                  class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                  @click="isMobileMenuOpen = false">Contact</NuxtLink>
                <NuxtLink to="/user/dashboard"
                  class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                  @click="isMobileMenuOpen = false" v-if="authStore.isAuthenticated">Dashboard</NuxtLink>
              </div>
              <div v-if="!authStore.isAuthenticated">
                <div class="px-5 py-2 mb-5">
                  <NuxtLink to="/account/login"
                    class="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded w-full"
                    @click="isMobileMenuOpen = false">
                    Login
                  </NuxtLink>
                  <NuxtLink to="/account/register"
                    class="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 mt-2 rounded w-full ml-4"
                    @click="isMobileMenuOpen = false">
                    Register
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div> -->
      </div>
    </div>
  </nav>
</template>


<script setup>
import { useAuthStore } from "@/stores/auth";
const authStore = useAuthStore();
const isMobileMenuOpen = ref(false);



const handlelogout = () => {
  authStore.logout();
  return navigateTo("/login", { replace: true });

}



</script>



<style lang="css" scoped>
.router-link-active {
  background-color: chartreuse;
  color: black;
}

.profile {
  margin-right: 0px !important;
  margin-top: 10px;
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  flex-direction: column;
}

.marginleft {
  margin-left: 200px !important;
}

p {
  display: flex;
}

span {
  margin-top: 2px;
  margin-right: 5px;
}

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;

  /* border: 2px solid #ccc; */
}
</style>
