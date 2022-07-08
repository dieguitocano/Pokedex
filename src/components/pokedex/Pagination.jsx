import React from 'react'



const Pagination = ({ arrayPages, currentPage, setCurrentPage, quantityPages }) => {

    const prevPage = () => {
        if (currentPage - 1 === 0) {
            setCurrentPage(quantityPages)
        } else {
            setCurrentPage(currentPage - 1)
        }
    }


    const nextPage = () => {
        if (currentPage + 1 > quantityPages) {
            setCurrentPage(1)
        } else {
            setCurrentPage(currentPage + 1)
        }
    }

    const changePageTo = num => setCurrentPage(num)


    return (

        <div className='pagination-container'>
            <div onClick={prevPage} className='pagination-prev-next'>&#60;</div>
            <ul className='pagination-number-container'>
                {
                    arrayPages?.map(num => (
                        <li onClick={() => changePageTo(num)}
                            key={num}
                            className={num == currentPage ? `page-number-active page-number` : 'page-number' }
                        >{num}
                        </li>
                    ))
                }
            </ul>
            <div onClick={nextPage} className='pagination-prev-next'>&#62;</div>
        </div>

    )
}

export default Pagination