import React from 'react'
type Props = {
  value: string
  className: string
  typeBtn: 'button' | 'submit' | 'reset'
  name?: string
  onClick?: () => void
  disabled?: boolean
}

const Button = ({ value, className, name, typeBtn, onClick }: Props) => {
  return (
    <button name={name} type={typeBtn} className={className} onClick={onClick}>
      {value}
    </button>
  )
}

export default Button
