import { toast } from 'react-toastify'

export const toastMsg = (message: string, action: string, actionType: 'info' | 'success' | 'error'): void => {
  const  _message = process.env.NODE_ENV === 'production' ? message : `${action} - ${message}`

  if (actionType === 'error') {
    toast.error(_message)
  } else if (actionType === 'success') {
    toast.success(_message)
  } else {
    toast.info(_message)
  }
}
