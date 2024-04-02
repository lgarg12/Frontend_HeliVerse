import React from 'react'

const Button = ({text , onClickOperation}) => {
  return (
    <button className='p-3 bg-blue-400 rounded-md cursor-pointer' onClick={onClickOperation}>
      {text}
    </button>
  )
}

export default Button
