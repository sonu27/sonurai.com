import Link from 'next/link'

const url = '/bingwallpapers/page/[page]'
const getUrl = (page) => `/bingwallpapers/page/${page}`

const Pagination = ({ pagination }) => (
  <ul className="col pagination">
    <li className={pagination.prev < 1 ? "page-item disabled" : "page-item"}><Link href={url} as={getUrl(pagination.prev)}><a className="page-link">Prev</a></Link></li>
    <li className="page-item"><Link href={url} as={getUrl(pagination.next)}><a className="page-link">Next</a></Link></li>
  </ul>
)

export default Pagination
