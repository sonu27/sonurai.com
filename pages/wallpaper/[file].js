import React from 'react'
import Router from 'next/router'

export default class extends React.Component {
  static async getInitialProps({ req, res }) {
    const image = req.url.replace('/wallpaper/', '')
    if (res) {
      res.writeHead(302, {
        Location: `https://images.sonurai.com/${image}`
      })
      res.end()
    } else {
      Router.push(`https://images.sonurai.com/${image}`)
    }
    return {}
  }
}
