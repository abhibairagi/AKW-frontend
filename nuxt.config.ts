// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "@formkit/nuxt",
  ],
  head: {
    link: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/icon?family=Material+Icons",
      },
    ],
  },
  //  // To fix samesite console error
  //  piniaPersistedstate: {
  //   cookieOptions: {
  //     sameSite: "strict",
  //   },
  // },
});
