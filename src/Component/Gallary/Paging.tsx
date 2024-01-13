import Pagination from "react-js-pagination";
import '../../style/Paging.scss';

interface PagingProps {
  postPerPage: number;
  totalPosts: number;
  currentPage: (page: number) => void;
}

const Paging: React.FC<PagingProps> = ({ postPerPage, totalPosts, currentPage }) => {

  return (
    <Pagination
        activePage={postPerPage}
        itemsCountPerPage={5}
        totalItemsCount={totalPosts}
        pageRangeDisplayed={5}
        prevPageText={"‹"}
        nextPageText={"›"}
        onChange={currentPage}
    />
  );
};

export default Paging;