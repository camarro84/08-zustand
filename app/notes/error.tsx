'use client'

type Props = {
  error: unknown
  value?: string
}

function hasMessage(e: unknown): e is { message: string } {
  return (
    typeof e === 'object' &&
    e !== null &&
    'message' in e &&
    typeof (e as { message: unknown }).message === 'string'
  )
}

export default function Error({ error, value }: Props) {
  const msg = hasMessage(error)
    ? error.message
    : String(error ?? 'Unknown error')
  return (
    <p>
      Failed to load {value ?? 'data'}: {msg}
    </p>
  )
}
