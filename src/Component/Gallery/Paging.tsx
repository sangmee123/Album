import React, { useState } from "react";
import Pagination from "react-js-pagination";
import '../../style/Paging.scss';

interface PagingProps {
  page: number;
  postPerPage: number;
  totalPosts: number;
  currentPage: (pageNumber: number) => void;
}

const Paging: React.FC<PagingProps> = ({ page, postPerPage, totalPosts, currentPage }) => {

  return (
    <Pagination
      activePage={page}
      itemsCountPerPage={postPerPage}
      totalItemsCount={totalPosts}
      prevPageText={"‹"}
      nextPageText={"›"}
      onChange={currentPage}
      itemClass="custom-pagination-item"
      linkClass="custom-pagination-link"
    />
  );
};

export default Paging;
