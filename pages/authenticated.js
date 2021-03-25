import React from 'react'
import nookies from 'nookies'
import { useRouter } from 'next/router'
import { firebaseAdmin } from 'libs/firebaseAdmin'
import { firebaseClient } from 'libs/firebaseClient'

export const getServerSideProps = async (ctx) => {
  try {
    const cookies = nookies.get(ctx)
    console.log(JSON.stringify(cookies, null, 2))
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token)
    const { uid, email } = token

    // the user is authenticated!
    // FETCH STUFF HERE

    return {
      props: { message: `Your email is ${email} and your UID is ${uid}.` },
    }
  } catch (err) {
    // either the `token` cookie didn't exist
    // or token verification failed
    // either way: redirect to the login page
    // either the `token` cookie didn't exist
    // or token verification failed
    // either way: redirect to the login page
    return {
      redirect: {
        permanent: false,
        destination: '/login',
      },
      props: {},
    }
  }
}

function AuthenticatedPage(props) {
  const router = useRouter()

  return (
    <div>
      <p>{props?.message}</p>
      <button
        onClick={async () => {
          await firebaseClient
            .auth()
            .signOut()
            .then(() => {
              router.push('/')
            })
        }}
      >
        Sign out
      </button>
    </div>
  )
}

export default AuthenticatedPage
