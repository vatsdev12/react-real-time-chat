import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";

const Pagination = props => {
  console.log("props.itemCount", props.itemCount);
  console.log("props.pageSize", props.pageSize);

  const { itemCount, currentPage, pageSize } = props;
  const pageCount = Math.ceil(itemCount / pageSize);
  if (pageCount === 1) return null;
  const pages = _.range(1, pageCount + 1);
  console.log("pagespagespages", pages);

  return (
    <nav>
      <ul className="pagination">
        {pages.map(page => {
          return (
            <li
              key={page}
              className={
                page === currentPage ? "page-item active" : "page-item"
              }
            >
              <a className="page-link" onClick={() => props.onPageChange(page)}>
                {page}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  itemCount: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired
};

export default Pagination;
