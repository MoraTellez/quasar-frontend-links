<template>
  <q-page padding>
    <q-btn @click="userStore.access" color="teal">Ingresar</q-btn>
    <q-btn @click="createLink" color="amber">Crear Link</q-btn>
    <q-btn @click="userStore.logout" color="red">Cerrar sesión</q-btn>
    {{ userStore.token }} - {{ userStore.expiresIn }}
  </q-page>
</template>

<script setup>
import { useUserStore } from 'src/stores/userStore';

const userStore = useUserStore()

userStore.refreshToken()

const createLink = async () => {
  try {
    const res = await api({
      method: 'POST',
      url: '/links',
      headers: {
        Authorization: `Bearer ${token.value}`
      },
      data: {
        longLink: "https://en.wikipedia.org/wiki/Gears_of_War"
      }
    })
    console.log(res.data)
  } catch (error) {
    console.log(error)
  }
}

</script>
