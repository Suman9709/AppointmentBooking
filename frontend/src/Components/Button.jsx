import React from 'react'

const Button = ({
  name,
  onClick,
  bgColor = "",
  textColor = "",
  className = "",
  type = "button",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`
        px-4 py-3
        text-lg font-semibold
       
        cursor-pointer
        transition
        hover:opacity-90
        ${bgColor}
        ${textColor}
        ${className}
      `}
    >
      {name}
    </button>
  )
}

export default Button
