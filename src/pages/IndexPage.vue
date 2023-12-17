<template>
  <q-page padding>
    <q-btn @click="access" color="teal">Ingresar</q-btn>
    <q-btn @click="createLink" color="amber">Crear Link</q-btn>
    {{ token }} - {{ expiresIn }}
  </q-page>
</template>

<script setup>
import { api } from 'src/boot/axios.js'
import { ref } from 'vue'

const token = ref('')
const expiresIn = ref('')

const access = async () => {
  try {
    const res = await api.post(`/auth/login`, {
      email: "mora@gmail.com",
      password: "mora123"
    })

    token.value = res.data.token
    expiresIn.value = res.data.expiresIn

  } catch (error) {
    console.log(error)
  }
}

const refreshToken = async () => {
  try {
    const res = await api.get(`/auth/refresh`)
    token.value = res.data.token
    expiresIn.value = res.data.expiresIn
    setTime()
  } catch (error) {
    console.log(error)
  }
}
refreshToken()

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

const setTime = () => {
  setTimeout(() => {
    refreshToken()
  }, expiresIn.value * 1000 - 10000)
}

</script>
