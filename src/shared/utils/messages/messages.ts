import { toast } from './krel_toast/krel_toast'

function error(text: string) {
  toast.error(text)
}
function success(text: string) {
  toast.success(text)
}
function text(text: string) {
  toast.toast(text)
}

export default {
  error,
  success,
  text,
}
