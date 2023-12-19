<template>
  <q-page padding>
    <AddLink class="q-mb-lg" />
    <template v-for="link of  useLink.links" :key="link._id">
      <LinkCard :link="link" />
    </template>
  </q-page>
</template>

<script setup>
import AddLink from 'src/components/AddLink.vue';
import LinkCard from 'src/components/LinkCard.vue';
import { useLinkStore } from 'src/stores/linkStore';
import { ref } from 'vue';

const tab = ref('inicio')
const useLink = useLinkStore()

</script>
