/* eslint-disable react/prop-types */

const Pagination = ({ totalPages, currentPage, onPageChange }) => {

  const handlePageChange = (page) => {
    if (onPageChange) {
      onPageChange(page);
    }
  };

  return (

    <nav aria-label="Page navigation example">

      <ul className="pagination justify-content-center mt-5 mb-0">

        <li className={`page-item pe-auto ${currentPage === 1 ? 'disabled' : ''}`}>
          <a className="page-link pe-auto" href="#" tabIndex="-1" onClick={() => { if (currentPage !== 1) handlePageChange(currentPage - 1) }} > Previous </a>
        </li>

        {Array.from({ length: totalPages }).map((_, index) => (
          <li className={`page-item pe-auto ${currentPage === index + 1 ? 'active' : ''}`} key={index}>
            <a className="page-link pe-auto" href="#" onClick={() => handlePageChange(index + 1)} > {index + 1} </a>
          </li>
        ))}

        <li className={`page-item pe-auto ${currentPage === totalPages || totalPages === 0 ? 'disabled' : ''}`}>
          <a className={`page-link pe-auto ${currentPage === totalPages || totalPages === 0 ? 'disabled' : ''}`} href="#" onClick={() => { if (currentPage !== totalPages && totalPages !== 0) handlePageChange(currentPage + 1) }} > Next </a>
        </li>

      </ul>

    </nav>

  );
};



export default Pagination;