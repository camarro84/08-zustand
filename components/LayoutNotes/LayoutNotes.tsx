'use client'

import css from './LayoutNotes.module.css'

import React, { ReactNode } from 'react'

type Props = {
  sidebar: ReactNode
  children: ReactNode
}

const LayoutNotes = ({ sidebar, children }: Props) => {
  return (
    <div className={css.container}>
      <div className={css.sidebar}>{sidebar}</div>
      <div className={css.notesWrapper}>{children}</div>
    </div>
  )
}

export default LayoutNotes
