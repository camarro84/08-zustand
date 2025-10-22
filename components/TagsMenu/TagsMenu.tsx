'use client'

import React, { useState } from 'react'
import css from './TagsMenu.module.css'
import { TAGS } from '@/constants/tags'
import Link from 'next/link'

const TagsMenu = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen((prev) => !prev)
  const closeMenu = () => setIsOpen(false)
  return (
    <div className={css.menuContainer}>
      <button className={css.menuButton} onClick={toggleMenu}>
        Notes
      </button>
      {isOpen && (
        <ul className={css.menuList}>
          {TAGS.map((tag) => (
            <li className={css.menuItem} key={tag}>
              <Link
                href={`/notes/filter/${tag}`}
                className={css.menuLink}
                onClick={closeMenu}
              >
                {tag}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default TagsMenu
