import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { useUserStore } from "./userStore";
import { ref } from "vue";
import { useQuasar } from 'quasar';

export const useLinkStore = defineStore('link',() => {
  const $q = useQuasar()
  const userStore = useUserStore()
  const links = ref([])

  const createLink = async (longLink) => {
    $q.loading.show()
    try {
      const res = await api({
        method: 'POST',
        url: '/links',
        headers: {
          Authorization: `Bearer ${userStore.token}`
        },
        data: {
          longLink
        }
      })

      links.value.push(res.data.newLink)
    } catch (error) {
      throw error.response.data || error
    } finally {
      $q.loading.hide()
    }
  }

  const getLinks = async () => {

    try {
      const res = await api({
        url:'/links',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${userStore.token}`
        }
      })

      links.value = [...res.data.links]
    } catch (error) {
      throw error.response.data || error
    }
  }

  getLinks()

  const removeLink = async (_id) => {
    $q.loading.show()
    try {
      await api({
        url: `/links/${_id}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${userStore.token}`
        }
      })

      links.value = links.value.filter((item) => item._id !== _id )
    } catch (error) {
      throw error.response.data || error
    }finally {
      $q.loading.hide()
    }
  }

  const modifiedLink = async (newLink) => {
    $q.loading.show()
    try {
      await api({
        url: `/links/${newLink._id}`,
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${userStore.token}`
        },
        data: {
          longLink: newLink.longLink
        }
      })

      links.value = links.value.map((item) => item._id === newLink._id ? newLink : item)
    } catch (error) {
      throw error.response.data || error
    } finally {
      $q.loading.hide()
    }
  }

  return{
    createLink,
    links,
    removeLink,
    modifiedLink
  }
})
