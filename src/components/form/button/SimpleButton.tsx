import * as React from 'react'

interface ISimpleButtonProps {
  text: string
  testId?: string
}

const SimpleButton: React.FunctionComponent<ISimpleButtonProps> = ({
  text,
  testId,
}) => {
  return (
    <button
      type="submit"
      data-testid={testId}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    >
      {text}
    </button>
  )
}

export default SimpleButton
