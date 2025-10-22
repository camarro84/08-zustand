'use client'

import css from './Pagination.module.css'

type Props = {
  pageCount: number
  currentPage: number // 0-based
  onPageChange: (pageIndex: number) => void
}

export default function Pagination({
  pageCount,
  currentPage,
  onPageChange,
}: Props) {
  if (pageCount <= 1) return null

  const pages = Array.from({ length: pageCount }, (_, i) => i)

  return (
    <nav className={css.pagination} aria-label="Pagination">
      <button
        type="button"
        className={`${css.button} ${currentPage === 0 ? css.disabled : ''}`}
        disabled={currentPage === 0}
        onClick={() => onPageChange(currentPage - 1)}
        aria-label="Previous page"
      >
        ‹
      </button>

      {pages.map((p) => (
        <button
          key={p}
          type="button"
          className={`${css.page} ${p === currentPage ? css.active : ''}`}
          onClick={() => onPageChange(p)}
          aria-current={p === currentPage ? 'page' : undefined}
        >
          {p + 1}
        </button>
      ))}

      <button
        type="button"
        className={`${css.button} ${
          currentPage >= pageCount - 1 ? css.disabled : ''
        }`}
        disabled={currentPage >= pageCount - 1}
        onClick={() => onPageChange(currentPage + 1)}
        aria-label="Next page"
      >
        ›
      </button>
    </nav>
  )
}
