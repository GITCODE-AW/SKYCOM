import React from 'react'

function NotifyBox({message, color, onClose}) {
  return (
    <div className={`notification-${color} notification-box`}>
        <span>{message}</span>
        <button className='notification-button' onClick={onClose}>close</button>
    </div>
  )
}

export default NotifyBox