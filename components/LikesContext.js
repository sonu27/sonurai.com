import React, { createContext } from 'react'

const LikesContext = createContext({})

export class LikesProvider extends React.Component {
  constructor() {
    super()
    this.setLikes = this.setLikes.bind(this)
    this.state = {
      likes: {},
      setLikes: this.setLikes,
    }
  }

  componentDidMount() {
    this.setLikes(JSON.parse(localStorage.getItem('likes')) ?? {})
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

export default LikesContext
