import Link from 'next/link'

const url = '/bingwallpapers/page/[id]'
const getUrl = (page) => `/bingwallpapers/page/${page}`

const Pagination = ({ pagination }) => (
  <ul className="col pagination">
    <li className="page-item"><Link href={url} as={getUrl(pagination.prev)}><a className="page-link">{pagination.prev}</a></Link></li>
    <li className="page-item active"><Link href={url} as={getUrl(pagination.current)}><a className="page-link">{pagination.current}</a></Link></li>
    <li className="page-item"><Link href={url} as={getUrl(pagination.next)}><a className="page-link">{pagination.next}</a></Link></li>
  </ul>
)

export default Pagination
