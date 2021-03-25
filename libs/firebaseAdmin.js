import * as firebaseAdmin from 'firebase-admin'

const buff = Buffer.from(process.env.FIRESTORE_SA, 'base64')
const serviceAccount = JSON.parse(buff.toString('ascii'))

if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
    databaseURL: 'https://sonurai-com-v3.firebaseio.com',
  })
}

export { firebaseAdmin }
