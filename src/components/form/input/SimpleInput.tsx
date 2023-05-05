import * as React from 'react'
import type { UseFormRegister } from 'react-hook-form'

interface ISimpleInputProps {
  id: string
  register: UseFormRegister<any>
  placeholder: string
}

const SimpleInput: React.FunctionComponent<ISimpleInputProps> = ({
  id,
  register,
  placeholder,
}) => {
  return (
    <input
      {...register(id)}
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      id={id}
      type="text"
      placeholder={placeholder}
    />
  )
}

export default SimpleInput
