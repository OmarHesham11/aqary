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
    
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <a className="page-link" href="" tabIndex="-1" onClick={() => handlePageChange(currentPage - 1)}> Previous </a>
        </li>

        {Array.from({ length: totalPages }).map((_, index) => (

          <li className={`page-item ${currentPage === index + 1 ? 'active' : ''}`} key={index}>
            <a className="page-link" href="#" onClick={() => handlePageChange(index + 1)}> {index + 1} </a>
          </li>

        ))}

        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <a className="page-link" href="" onClick={() => handlePageChange(currentPage + 1)}> Next </a>
        </li>

      </ul>

    </nav>
  );
};

export default Pagination;
