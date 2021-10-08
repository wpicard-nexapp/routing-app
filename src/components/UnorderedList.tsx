import { ReactNode } from 'react'

export const UnorderedList = ({ children }: { children: ReactNode[] }) => {
  return (
    <ul>
      {children.map((child, i) => <li key={i}>{child}</li>)}
    </ul>
  )
}
