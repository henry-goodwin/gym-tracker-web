import { FingerPrintIcon } from '@heroicons/react/solid'
import { Formik, Form } from 'formik'
import { NextPage } from 'next'
import { withUrqlClient } from 'next-urql'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { InputField } from '../../components/InputField'
import { useChangePasswordMutation } from '../../graphql/generated'
import { createUrqlClient } from '../../utils/createUrqlClient'
import { toErrorMap } from '../../utils/toErrorMap'

const ChangePassword: NextPage<{ token: string }> = ({ token }) => {
  const router = useRouter()
  const [, changePassword] = useChangePasswordMutation()
  const [tokenError, setTokenError] = useState('')

  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Change Password
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter new password below
          </p>
        </div>

        <Formik
          initialValues={{ newPassword: '' }}
          onSubmit={async (values, { setErrors }) => {
            const response = await changePassword({
              newPassword: values.newPassword,
              token,
            })

            if (response.data?.changePassword.errors) {
              const errorMap = toErrorMap(response.data.changePassword.errors)

              if ('token' in errorMap) {
                setTokenError(errorMap.token)
              }

              setErrors(errorMap)
            } else if (response.data?.changePassword.user) {
              // worked
              router.push('/')
            }
          }}
        >
          {({}) => (
            <Form className="mt-8 space-y-6">
              <div className="-space-y-px rounded-md">
                <InputField
                  name="newPassword"
                  placeholder="new password"
                  label="New Password:"
                  type="password"
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <FingerPrintIcon
                      className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                      aria-hidden="true"
                    />
                  </span>
                  Change Password
                </button>
              </div>
              {tokenError ? (
                <div
                  className="relative rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700"
                  role="alert"
                >
                  <strong className="font-bold">Error - {tokenError}</strong>
                  <span className="block sm:inline">
                    <div className="flex">
                      <a href="/forgot-password">
                        Click here to get a new token.
                      </a>
                    </div>
                  </span>
                </div>
              ) : null}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

ChangePassword.getInitialProps = ({ query }) => {
  return {
    token: query.token as string,
  }
}

export default withUrqlClient(createUrqlClient)(ChangePassword)
