import React from 'react'

interface WrapperProps {}

export const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  return <div className="flex flex-wrap">{children}</div>
}
