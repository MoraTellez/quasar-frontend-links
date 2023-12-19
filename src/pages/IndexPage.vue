<template>
  <q-page padding>
    <AddLink />
    <template v-for="link of  useLink.links" :key="link._id">
      <LinkCard/>
    </template>
  </q-page>
</template>

<script setup>
import AddLink from 'src/components/AddLink.vue';
import LinkCard from 'src/components/LinkCard.vue';
import { useLinkStore } from 'src/stores/linkStore';
const useLink = useLinkStore()

</script>
