import React, { createContext, useState } from 'react'
import dynamic from 'next/dynamic'

const LikesContext = createContext({})

class LikesProviderClass extends React.Component {
  constructor() {
    super()
    this.setLikes = this.setLikes.bind(this)
    this.state = {
      likes: JSON.parse(localStorage.getItem('likes')) ?? {},
      setLikes: this.setLikes,
    }
  }

  setLikes(newValue) {
    this.setState({ likes: newValue }, localStorage.setItem('likes', JSON.stringify(newValue)))
  }

  render() {
    return (
      <LikesContext.Provider value={this.state}>
        {this.props.children}
      </LikesContext.Provider>
    )
  }
}

export const LikesProvider = dynamic(() => Promise.resolve(LikesProviderClass), { ssr: false })
export default LikesContext
