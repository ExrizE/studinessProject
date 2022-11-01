import React from "react";

import { PaginationItem, PaginationLink, Pagination } from 'reactstrap'

const PaginationNum = ({
    totalPosts,
    cardsPerPage,
    setCurrentPage,
    currentPage,
}) => {
    let pages = [];
    let lastPage = Math.ceil(totalPosts / cardsPerPage);
    
  const nextPage = () => {
    if (currentPage === lastPage) return
    setCurrentPage(currentPage + 1);
  }

  const previousPage = () => {
    if (currentPage === 1) return
    setCurrentPage(currentPage - 1);
  }

    for (let i = 1; i <= lastPage; i++) {
        pages.push(i);
    }

    return (
        <Pagination className="m-b-30 pagination justify-content-center pagination-primary">
            {
                currentPage === 1 ?
                <PaginationItem disabled onClick={previousPage}><PaginationLink>Précédent</PaginationLink></PaginationItem>
                :
                <PaginationItem onClick={previousPage}><PaginationLink>Précédent</PaginationLink></PaginationItem>
            }
                {pages.map((page, i) => {   
                    return(  
                        currentPage === page ?
                        <PaginationItem active onClick={() => setCurrentPage(page)} key={i}><PaginationLink>{page}</PaginationLink></PaginationItem>  
                        :
                        <PaginationItem onClick={() => setCurrentPage(page)} key={i}><PaginationLink>{page}</PaginationLink></PaginationItem>  
                    )                      
                })}
            {
                currentPage === lastPage ?
                <PaginationItem disabled onClick={nextPage}><PaginationLink>Suivant</PaginationLink></PaginationItem>
                :
                <PaginationItem onClick={nextPage}><PaginationLink>Suivant</PaginationLink></PaginationItem>
            }
        </Pagination>
    );
};

export default PaginationNum;