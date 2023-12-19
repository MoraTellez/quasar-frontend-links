<script setup>
import { useLinkStore } from 'src/stores/linkStore';
import { useNotify } from 'src/composables/notifyHook'
import { ref } from 'vue';
const link = ref('')
const loading = ref(false)

const useLink = useLinkStore()
const { showNotify } = useNotify()
const formAdd = ref(null)

const addLink = async () => {
  loading.value = true
  try {
    await useLink.createLink(link.value)
    showNotify('Link agregado con éxito', 'positive', )
    link.value = ''
    formAdd.value.resetValidation()
  } catch (error) {
    showNotify('Error al agregar el link', 'negative', )
  } finally {
    loading.value = false
  }
}
</script>

<template>
<q-form @submit.prevent="addLink" ref="formAdd">
  <q-input
    v-model="link"
    label="Ingrese link aquí"
    placeholder="ej. https://google.com/imagenes"
    :rules="[
      val => val && val.trim() !== '' && /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/.test(val) || 'Ingresa una dirección válida'
    ]"
    lazy-rules
  >
  </q-input>
  <q-btn
    class="q-mt-sm full-width"
    label="agregar"
    color="primary"
    type="submit"
    :loading="loading"></q-btn>
</q-form>
</template>
