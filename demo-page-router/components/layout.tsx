import { ReactNode } from 'react';


export default function Layout({ children }: {
  children: ReactNode;
}) {
  return (
    <>
      <header>header</header>
      {children}
      <footer>Footer</footer>
    </>
  )
}