import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function ActiveLink({ href, children }: { href: string, children: any }) {
  const router = useRouter()

  let className = children.props.className || ''
  if (router.pathname === href) {
    className = `${className} active text-white`
  }

  return <Link href={href}>{React.cloneElement(children, { className })}</Link>
}
