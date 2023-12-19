<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          Acortador de link
        </q-toolbar-title>

        <q-btn color="teal" to="/login" v-if="!userStore.token">Login</q-btn>
        <q-btn class="q-ml-sm" color="green" to="/register" v-if="!userStore.token">Register</q-btn>
        <!--
           <q-btn class="q-mr-sm" color="purple" to="/" v-if="userStore.token">Inicio</q-btn>
        -->
        <q-btn color="red" @click="logout" v-if="userStore.token">Logout</q-btn>
      </q-toolbar>
      <q-tabs v-model="tab">
          <q-tab name="inicio" label="Inicio"  to="/" v-if="userStore.token" />
        </q-tabs>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header>
          Essential Links
        </q-item-label>

        <EssentialLink v-for="link in essentialLinks" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import {  ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'
import { useUserStore } from 'src/stores/userStore';
import { useRouter } from 'vue-router';

const router = useRouter()

const userStore = useUserStore()
const essentialLinks = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev'
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework'
  },
  {
    title: 'Discord Chat Channel',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev'
  },
  {
    title: 'Forum',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev'
  },
  {
    title: 'Twitter',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev'
  },
  {
    title: 'Facebook',
    caption: '@QuasarFramework',
    icon: 'public',
    link: 'https://facebook.quasar.dev'
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev'
  }
]
const leftDrawerOpen = ref(false)

const tab = ref('inicio')


function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

const logout = async () => {
  await userStore.logout()
  router.push('/login')
}

const accessUser =async () => {
  await userStore.access()
  router.push('/')
}
</script>
