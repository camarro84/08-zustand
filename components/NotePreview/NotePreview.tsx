'use client'

import { Note } from '@/types/note'
import css from './NotePreview.module.css'
import Button from '../Button/Button'

type Props = {
  data: Note
  onClose: () => void
}

const NotePreview = ({ data, onClose }: Props) => {
  return (
    <div className={css.container}>
      <Button
        typeBtn="button"
        value="<- Back"
        className={css.backBtn}
        onClick={onClose}
      />
      <div className={css.header}>
        <h2>{data.title}</h2>
      </div>
      <div className={css.content}>
        <p className={css.content}>{data.content}</p>
        <p className={css.tag}>Tag: {data.tag}</p>
      </div>
    </div>
  )
}

export default NotePreview
