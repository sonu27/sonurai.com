import React from 'react'

const getUrl = (page) => `/bingwallpapers/page/${page}`

const Pagination = ({pagination, handlePageChange}) => (
  <ul className="col pagination">
    <li className="page-item"><a className="page-link" href={getUrl(pagination.prev)} onClick={(e) => {
      e.preventDefault()
      e.target.blur()
      handlePageChange(pagination.prev)
    }}>{pagination.prev}</a></li>
  <li className="page-item active"><a className="page-link" href={getUrl(pagination.current)} onClick={(e) => {
      e.preventDefault()
    }}>{pagination.current}</a></li>
  <li className="page-item"><a className="page-link" href={getUrl(pagination.next)} onClick={(e) => {
      e.preventDefault()
      e.target.blur()
      handlePageChange(pagination.next)
    }}>{pagination.next}</a></li>
  </ul>
)

export default Pagination
