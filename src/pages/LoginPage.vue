<template>
  <h3>Login</h3>
  {{ userStore.token }}
</template>

<script setup>
import { useUserStore } from 'src/stores/userStore';

const userStore = useUserStore()

</script>
