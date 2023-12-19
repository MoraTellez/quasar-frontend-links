<script setup>
import { useLinkStore } from 'src/stores/linkStore'
import { useQuasar } from 'quasar';
import { useNotify } from 'src/composables/notifyHook';

defineProps({
  link: Object
})

const $q = useQuasar()
const { showNotify } = useNotify()
const linkStore = useLinkStore()

const deleteLink = async (_id) => {
  $q.dialog({
    title: 'Confirmar',
    message: '¿Estás seguro de querer eliminar el link?',
    cancel: true,
    persistent: true
  }).onOk(async () => {
    try {
      await linkStore.removeLink(_id)
      showNotify('Link eliminado con éxito', 'positive')
    } catch (error) {
      showNotify('Error al eliminar Link', 'negative')
    }
  })

}

const updateLink = async (link) => {
  $q.dialog({
    title: 'Modificar Link',
    message: 'Modifica el link anterior',
    prompt: {
      model: link.longLink,
      type: 'text'
    },
    cancel: true,
    persistent: true
  }).onOk(async data => {
    try {
      const newLink = {...link, longLink: data}
      await linkStore.modifiedLink(newLink)
      showNotify('Link modificado con éxito', 'positive')
    } catch (error) {
      showNotify('Error al modificar link', 'negative')
    }
  })
}

const copyLink = async (nanoLink) => {
  const path = `${process.env.FRONT_URI}${nanoLink}`
try {
 await navigator.clipboard.writeText(path)
 showNotify('Link copiado al portapapeles', 'positive')
} catch (error) {
  console.log(error)
}
}
</script>

<template>
  <q-card class="my-card q-mb-sm">
    <q-card-section>
      <p class="text-overline"> {{ link.nanoLink }}</p>
      {{ link }}
    </q-card-section>

    <q-separator />

    <q-card-actions>
      <q-btn flat round icon="mdi-trash-can-outline" color="red" @click="deleteLink(link._id)" />
      <q-btn flat round icon="mdi-pencil-outline" color="primary" @click="updateLink(link)"/>
      <q-btn flat round color="amber" icon="mdi-clipboard-file-outline" @click="copyLink(link.nanoLink)"/>
    </q-card-actions>
  </q-card>
</template>
