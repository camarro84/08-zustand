'use client'

type Props = {
  error: Error
  value: string
}

const Error = ({ error, value }: Props) => {
  return (
    <div className="content">
      <p>
        Could not fetch{`${value}`}. {error.message}
      </p>
    </div>
  )
}

export default Error
