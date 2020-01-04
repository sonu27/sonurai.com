import React from 'react'
import Router from 'next/router'

export default class extends React.Component {
  static async getInitialProps({ res }) {
    if (res) {
      res.writeHead(302, {
        Location: '/bingwallpapers/page/1'
      })
      res.end()
    } else {
      Router.push('/bingwallpapers/page/1')
    }
    return {}
  }
}
