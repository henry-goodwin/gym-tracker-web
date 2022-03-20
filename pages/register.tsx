import React from 'react'
import { Form, Formik } from 'formik'
import { InputField } from '../components/InputField'
import { LockClosedIcon } from '@heroicons/react/solid'
import { useRegisterMutation } from '../graphql/generated'
import { toErrorMap } from '../utils/toErrorMap'
import { useRouter } from 'next/router'
import { withUrqlClient } from 'next-urql'
import { createUrqlClient } from '../utils/createUrqlClient'

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  const router = useRouter()
  const [, register] = useRegisterMutation()
  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Register your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter details to register
          </p>
        </div>

        <Formik
          initialValues={{ username: '', email: '', password: '' }}
          onSubmit={async (values, { setErrors }) => {
            const response = await register({ options: values })
            if (response.data?.register.errors) {
              setErrors(toErrorMap(response.data.register.errors))
            } else if (response.data?.register.user) {
              // worked
              router.push('/')
            }
          }}
        >
          {/* {({ values, handleChange, touched, isSubmitting }) => ( */}

          {({}) => (
            <Form className="mt-8 space-y-6">
              <div className="-space-px rounded-md">
                <InputField
                  name="username"
                  placeholder="username"
                  label="Username:"
                />
                <InputField name="email" placeholder="email" label="Email:" />

                <InputField
                  name="password"
                  placeholder="password"
                  label="Password:"
                  type="password"
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <LockClosedIcon
                      className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                      aria-hidden="true"
                    />
                  </span>
                  Register
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default withUrqlClient(createUrqlClient)(Register)
