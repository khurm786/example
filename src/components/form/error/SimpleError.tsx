import * as React from 'react'

interface ISimpleErrorProps {
  message: string | undefined
}

const SimpleError: React.FunctionComponent<ISimpleErrorProps> = ({
  message,
}) => {
  return <p className="text-red-500">{message}</p>
}

export default SimpleError
