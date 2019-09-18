import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

const Pagination = props => {
  const { moviesTotal, pageSize, active, onClick } = props;
  const pagesTotal = Math.ceil(moviesTotal / pageSize);
  if (pagesTotal === 1) {
    return null;
  }
  const pages = _.range(1, pagesTotal + 1);
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        {pages.map(el => (
          <li
            key={el}
            onClick={() => onClick(el)}
            className={active === el ? "page-item active" : "page-item"}
          >
            <a className="page-link">{el}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  moviesTotal: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  active: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired
};

export default Pagination;
