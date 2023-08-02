import { useContext } from 'react'
import NotificationContext from '../contexts/NotificationContext'
import { Alert } from '@mui/material'

const Notification = () => {
  const [notification] = useContext(NotificationContext)
  if (notification.value === null || notification.mode === 'none') {
    return null
  }
  if (notification.mode === 'info') {
    return <Alert severeity="success">{notification.value}</Alert>
  } else {
    return <Alert severeity="error">{notification.value}</Alert>
  }
}

export default Notification
