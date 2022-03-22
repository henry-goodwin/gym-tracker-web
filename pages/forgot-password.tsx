import { InboxInIcon } from '@heroicons/react/solid'
import { Formik, Form } from 'formik'
import { withUrqlClient } from 'next-urql'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { InputField } from '../components/InputField'
import { useForgotPasswordMutation } from '../graphql/generated'
import { createUrqlClient } from '../utils/createUrqlClient'

const ForgotPassword: React.FC<{}> = ({}) => {
  const router = useRouter()
  const [complete, setComplete] = useState(false)
  const [, forgotPassword] = useForgotPasswordMutation()
  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Forgot Password
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter your email to get a reset link.
          </p>
        </div>

        <Formik
          initialValues={{ email: '' }}
          onSubmit={async (values) => {
            await forgotPassword(values)
            setComplete(true)
          }}
        >
          {({}) =>
            complete ? (
              <p className="mt-2 text-center text-sm text-gray-600">
                Resent link sent, please check your inbox.
              </p>
            ) : (
              <Form className="mt-8 space-y-6">
                <div className="-space-y-px rounded-md">
                  <InputField name="email" placeholder="email" label="Email:" />
                </div>
                <div>
                  <button
                    type="submit"
                    className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <InboxInIcon
                        className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                        aria-hidden="true"
                      />
                    </span>
                    Get Reset Link
                  </button>
                </div>
              </Form>
            )
          }
        </Formik>
      </div>
    </div>
  )
}

export default withUrqlClient(createUrqlClient)(ForgotPassword)
