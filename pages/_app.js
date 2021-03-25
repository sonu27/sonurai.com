import { AuthProvider } from 'components/AuthProvider'
import 'bootstrap/dist/css/bootstrap.css'
import 'css/index.css'

function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  )
}
export default App
