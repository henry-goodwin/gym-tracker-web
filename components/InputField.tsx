import { ErrorMessage, Field, useField } from 'formik'
import React, { InputHTMLAttributes } from 'react'

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  name: string
}

export const InputField: React.FC<InputFieldProps> = ({ label, ...props }) => {
  const [field] = useField(props)
  return (
    <div className="mb-4">
      <label
        htmlFor={field.name}
        className="mb-2 block text-sm font-bold text-gray-700"
      >
        {label}
      </label>
      <Field
        {...field}
        {...props}
        className="relative block w-full appearance-none rounded-md rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
        id={field.name}
      />
      <ErrorMessage
        name={field.name}
        render={(error) => (
          <div className="mb-4">
            <p className="text-xs italic text-red-500">{error}</p>
          </div>
        )}
      />
    </div>
  )
}
