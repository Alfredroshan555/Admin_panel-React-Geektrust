import React from "react";
import { Pagination } from "semantic-ui-react";

const Paginations = ({ totalPosts, postsPerPage, paginate }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div class="pagination">
      <a href="#">&laquo;</a>
      {pageNumbers.map((number) => (
        <>
          <a href="#" onClick={() => paginate(number)}>
            {number}
          </a>
        </>
      ))}
      <a href="#">&raquo;</a>
    </div>
  );
};

export default Paginations;
