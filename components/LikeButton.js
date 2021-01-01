import { useContext, useEffect } from 'react'
import LikesContext from 'components/LikesContext'
import { Heart, HeartFill } from 'components/Icons'

export default function LikeButton({ id }) {
  const likesContext = useContext(LikesContext)
  const likes = likesContext.likes
  const setLikes = likesContext.setLikes

  let icon = <Heart />
  let style = {}

  if (likes && id in likes) {
    icon = <HeartFill />
    style = { color: 'red' }
  }

  return (
    <button type="button" className="btn" style={style} onClick={() => toggleLike(id, likes, setLikes)}>
      {icon}
    </button>
  )
}

function toggleLike(id, likes, setLikes) {
  if (likes) {
    if (id in likes) {
      delete likes[id]
    } else {
      likes[id] = Date.now()
    }
  } else {
    likes = { [id]: Date.now() }
  }
  setLikes(likes)
}
