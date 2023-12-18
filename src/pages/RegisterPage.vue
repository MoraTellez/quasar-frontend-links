<script setup>
import { useUserStore } from 'src/stores/userStore';
import { ref } from 'vue';
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'

const $q = useQuasar()

const router = useRouter()
const userStore = useUserStore()
const email = ref('')
const password = ref('')
const repassword = ref('')

const handleSubmit = async () => {
  try {
    console.log('validad')
    await userStore.register(email.value, password.value, repassword.value)
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
      <h3>Register</h3>
      <q-form @submit.prevent="handleSubmit">
        <q-input v-model="email" type="email" label="Ingrese email" :rules="[ val => (val && /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/.test(val)) || 'Email inválido']">
        </q-input>
        <q-input v-model="password" type="password" label="Ingrese contraseña" :rules="[ val => val && val.length >= 6 || 'Contraseña inválida']">
        </q-input>
        <q-input v-model="repassword" type="password" label="Confirme contraseña" :rules="[ val => val && val === password || 'La contraseñá no coincide']">
        </q-input>

        <div>
          <q-btn label="login" type="submit"></q-btn>
        </div>
      </q-form>
    </div>
  </q-page>
</template>

