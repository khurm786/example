import { yupResolver } from '@hookform/resolvers/yup'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import * as yup from 'yup'

import SimpleButton from '../../components/form/button/SimpleButton'
import SimpleError from '../../components/form/error/SimpleError'
import SimpleInput from '../../components/form/input/SimpleInput'
import Label from '../../components/form/label/label'
import { useLoginMutation } from '../../services/auth'

const schema = yup
  .object({
    password: yup.string().required(),
    username: yup.string().required(),
  })
  .required()
type FormData = yup.InferType<typeof schema>

const LoginPage = () => {
  const [error, setError] = useState<null | string>(null)
  const navigate = useNavigate()
  const [login] = useLoginMutation()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  })

  const onSubmit = async (formData: FormData) => {
    try {
      setError(null)
      await login(formData).unwrap()
      navigate('/')
    } catch (e: any) {
      if ('status' in e) {
        let error: string

        switch (e.status) {
          case 500:
            error = 'There was an error connecting to the server'
            break
          default:
            error = 'The username and password combination was incorrect'
        }

        setError(error)
        return
      }
    }
  }

  return (
    <div className="w-full grid h-screen place-items-center">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-4">
          <Label title="Username" />
          <SimpleInput
            id="username"
            placeholder="Username"
            register={register}
          />
          <SimpleError message={errors.username?.message} />
        </div>

        <div className="mb-6">
          <Label title="Password" />
          <SimpleInput
            id="password"
            placeholder="Password"
            register={register}
          />
          <SimpleError message={errors.password?.message} />
        </div>

        <div className="flex items-center justify-between">
          <SimpleButton testId="sign-in" text="Sign In" />
        </div>

        {error && (
          <div data-testid="auth-error">
            <SimpleError message={error} />
          </div>
        )}
      </form>
    </div>
  )
}

export default LoginPage
