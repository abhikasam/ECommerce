import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchUsersAsync } from "../store/user-slice"
import { useEffect } from "react"
import { UserCard } from "./user-card"
import Pagination from "../shared/pagination"


export default function Users() {

    const dispatch = useDispatch()
    const [search,setSearch]=useState('')

    useEffect(() => {
        dispatch(fetchUsersAsync({}))
    }, [dispatch])

    const { users }=useSelector(state=>state.user)
    return (
        <div className="row">
            <div className="col">
                <div className="row">
                    <div className="col-1 align-self-center text-end">
                        Search  :  
                    </div>
                    <div className="col-5 align-self-center">
                        <input
                            type="search"
                            className="form-control"
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                        />
                    </div>
                    <div className="col-2">
                        <button type="button"
                            className="btn btn-primary"
                            onClick={() => dispatch(fetchUsersAsync({ search })) }
                        >
                            Update
                        </button>
                    </div>
                    <Pagination pageNumber={users.pageNumber}
                        totalPages={users.totalPages}
                        setPage={(page) => dispatch(fetchUsersAsync({ search, pageNumber: page }))} >
                    </Pagination>
                </div>
                <div className="row">
                    {users.result.map(user =>
                        <div key={user.userId} className="col-2 border border-primary m-2">
                            <UserCard key={user.userId} user={user}></UserCard>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

