import * as React from 'react'

interface ISimpleLabelProps {
  title: string
}

const Label: React.FunctionComponent<ISimpleLabelProps> = ({ title }) => {
  return (
    <label className="block text-gray-700 text-sm font-bold mb-2">
      {title}
    </label>
  )
}

export default Label
