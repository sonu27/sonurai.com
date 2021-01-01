import { LikesProvider } from 'components/LikesContext'
import UserProvider from 'components/UserProvider'
import 'bootstrap/dist/css/bootstrap.css'
import 'css/index.css'

function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <LikesProvider>
        <Component {...pageProps} />
      </LikesProvider>
    </UserProvider>
  )
}

export default App
