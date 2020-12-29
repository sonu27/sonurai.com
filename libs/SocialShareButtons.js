import {
  FacebookIcon,
  FacebookShareButton,
  PinterestIcon,
  PinterestShareButton,
  TwitterIcon,
  TwitterShareButton,
} from 'react-share'

export default function SocialShareButtons({ url, media, desc, size }) {
  return (
    <>
      <PinterestShareButton url={url} media={media} description={desc}>
        <PinterestIcon size={size} />
      </PinterestShareButton>
      <FacebookShareButton url={url}>
        <FacebookIcon size={size} />
      </FacebookShareButton>
      <TwitterShareButton url={url} via={'sonu27'} related={['sonu27']} title={desc}>
        <TwitterIcon size={size} />
      </TwitterShareButton>
    </>
  )
}
