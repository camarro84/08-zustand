'use client'

import React, { useState, ChangeEvent } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import css from './SearchBox.module.css'

type Props = {
  onSearch?: (search: string) => void
  onChange?: (v: string) => void
  placeholder?: string
  initialValue?: string
}

const SearchBox = ({
  onSearch,
  onChange,
  placeholder = 'Search notes',
  initialValue = '',
}: Props) => {
  const [value, setValue] = useState(initialValue)
  const fire = onSearch ?? onChange ?? (() => {})

  const debounced = useDebouncedCallback((val: string) => {
    fire(val)
  }, 400)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value.trim()
    setValue(v)
    debounced(v)
  }

  return (
    <input
      type="text"
      className={css.input}
      value={value}
      placeholder={placeholder}
      onChange={handleChange}
      aria-label="Search notes"
    />
  )
}

export default SearchBox
