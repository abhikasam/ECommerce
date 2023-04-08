

export default function Pagination(props) {

    function epd(event) {
        event.preventDefault()
        props.setPage(parseInt(event.target.attributes.page.value))
    }

    return (
        <div className='col text-end'>
            <div className='d-inline-block'>
                <nav aria-label='Page navigation example'>
                    <ul className='pagination justify-content-end'>
                        <li className={"page-item " + (props.pageNumber === 1 ? "disabled" : "")}>
                            <a className='page-link' onClick={event => epd(event)} href='#' tabIndex='-1' page={props.pageNumber - 1}>Previous</a>
                        </li>

                        {props.totalPages < 8 && 
                                [...Array(props.totalPages).keys()].map( (num)=>
                                <li key={num+1} className={"page-item " + (props.pageNumber === num+1 ? "active" : "")}>
                                        <a className='page-link' onClick={event => epd(event)} href='#' page={num+1}>{num+1}
                                    </a>
                                </li>
                                )
                        }
                        {props.totalPages >= 8 && props.pageNumber >= 5 && props.pageNumber < props.totalPages - 3 &&
                            <>
                            <li className='page-item'><a className='page-link' onClick={event => epd(event)} href='#' page={1}>1</a></li>
                            <li className='page-item disabled'><a className='page-link' onClick={event => epd(event)} href='#'>...</a></li>
                            <li className='page-item'><a className='page-link' onClick={event => epd(event)} href='#' page={props.pageNumber - 1}>{props.pageNumber - 1}</a></li>
                            <li className='page-item active'><a className='page-link' onClick={event => epd(event)} href='#' page={props.pageNumber}>{props.pageNumber}</a></li>
                            <li className='page-item'><a className='page-link' onClick={event => epd(event)} href='#' page={props.pageNumber + 1}>{props.pageNumber + 1}</a></li>
                            <li className='page-item disabled'><a className='page-link' onClick={event => epd(event)} href='#'>...</a></li>
                            <li className='page-item'><a className='page-link' onClick={event => epd(event)} href='#' page={props.totalPages}>{props.totalPages}</a></li>
                            </>
                        }

                        {props.totalPages >= 8 && props.pageNumber < 5 &&
                            <>
                            < li key={1} className={"page-item " + (props.pageNumber === 1 ? "active" : "")}><a className='page-link' onClick={event => epd(event)} href='#' page={1}>1</a></li>
                            < li key={2} className={"page-item " + (props.pageNumber === 2 ? "active" : "")}><a className='page-link' onClick={event => epd(event)} href='#' page={2}>2</a></li>
                            < li key={3} className={"page-item " + (props.pageNumber === 3 ? "active" : "")}><a className='page-link' onClick={event => epd(event)} href='#' page={3}>3</a></li>
                            < li key={4} className={"page-item " + (props.pageNumber === 4 ? "active" : "")}><a className='page-link' onClick={event => epd(event)} href='#' page={4}>4</a></li>
                            < li key={5} className={"page-item " + (props.pageNumber === 5 ? "active" : "")}><a className='page-link' onClick={event => epd(event)} href='#' page={5}>5</a></li>
                            < li className='page-item disabled'><a onClick={event => epd(event)} className='page-link' href='#'>...</a></li>
                            <li className='page-item'><a className='page-link' onClick={event => epd(event)} href='#' page={props.totalPages}>{props.totalPages}</a></li>
                            </>
                        }

                        {props.totalPages >= 8 && props.pageNumber > props.totalPages-4 && 
                            <>
                            <li key={1} className='page-item'><a onClick={event => epd(event)} className='page-link' href='#' page={1}>1</a></li>
                            <li className='page-item disabled'><a onClick={event => epd(event)} className='page-link' href='#'>...</a></li>
                            <li key={props.totalPages - 4} className={"page-item " + (props.totalPages - 4 === props.pageNumber ? "active" : "")}><a className='page-link' onClick={event => epd(event)} href='#' page={props.totalPages - 4}>{props.totalPages - 4}</a></li>
                            <li key={props.totalPages - 3} className={"page-item " + (props.totalPages - 3 === props.pageNumber ? "active" : "")}><a className='page-link' onClick={event => epd(event)} href='#' page={props.totalPages - 3}>{props.totalPages - 3}</a></li>
                            <li key={props.totalPages - 2} className={"page-item " + (props.totalPages - 2 === props.pageNumber ? "active" : "")}><a className='page-link' onClick={event => epd(event)} href='#' page={props.totalPages - 2}>{props.totalPages - 2}</a></li>
                            <li key={props.totalPages - 1} className={"page-item " + (props.totalPages - 1 === props.pageNumber ? "active" : "")}><a className='page-link' onClick={event => epd(event)} href='#' page={props.totalPages - 1}>{props.totalPages - 1}</a></li>
                            <li key={props.totalPages} className={"page-item " + (props.totalPages === props.pageNumber ? "active" : "")}><a className='page-link' href='#' onClick={event => epd(event)} page={props.totalPages}>{props.totalPages}</a></li>
                            </>
                        }

                        <li className={"page-item " + (props.pageNumber === props.totalPages ? "disabled" : "")}>
                            <a className='page-link' onClick={event => epd(event)} href='#' tabIndex='-1' page={props.pageNumber + 1}>Next</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}

