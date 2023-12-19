<script setup>
import { useUserStore } from 'src/stores/userStore';
import { ref } from 'vue';
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'

const $q = useQuasar()

const router = useRouter()
const userStore = useUserStore()
const email = ref('mora@gmail.com')
const password = ref('mora123')

const handleSubmit = async () => {
  try {
    console.log('validad')
    await userStore.access(email.value, password.value)
    router.push('/')
    email.value = ''
    password.value = ''
  } catch (error) {
    mostrarAlerta('Ha ocurrido un problema', error.error)
  }
}

const mostrarAlerta = (title, message) => {
  $q.dialog({
      title: title,
      message: message,
      ok: {
        color: 'negative'
    }
    })
}

</script>

<template>
  <q-page  class="row justify-center">
    <div class="col-12 col-sm-6 col-md-4">
      <h3>Login</h3>
      <q-form @submit.prevent="handleSubmit">
        <q-input lazy-rules v-model="email" type="email" label="Ingrese email" :rules="[ val => (val && /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/.test(val)) || 'Email inválido']">

        </q-input>
        <q-input lazy-rules v-model="password" type="password" label="Ingrese contraseña" :rules="[ val => val && val.length >= 6 || 'Contraseña inválida']">

        </q-input>

        <div>
          <q-btn label="login" type="submit"></q-btn>
        </div>
      </q-form>
    </div>
  </q-page>
</template>

