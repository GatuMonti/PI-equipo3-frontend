import React from 'react'

const Start = ({selected, onClick, disabled}) => {

    const handleClick = disabled ? null : onClick;

  return (
    <span className='estrella' onClick={handleClick} style={{ cursor: 'pointer', color: selected ? 'gold' : 'blue' }} > 
    ★
  </span>
  )
}

export default Start