import { useQuasar } from "quasar"

export const useNotify = () => {

  const $q = useQuasar()

  const showNotify = (message, type) => {
    $q.notify({
      message,
      type
    })
  }

  return {
    showNotify
  }
}
