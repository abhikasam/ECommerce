import { useState } from "react"
import { useDispatch } from "react-redux"
import { fetchUsersAsync } from "../store/auth-slice"
import { useEffect } from "react"
import { UserCard } from "./user-card"


export default function Users() {

    const dispatch = useDispatch()
    const [users, setUsers] = useState([])

    useEffect(() => {
        const response = dispatch(fetchUsersAsync())
        response.then((result) => {
            let userResults = result.payload.data
            setUsers(userResults)
        })

    }, [dispatch])

    return (
        <div className="row">
            <div className="col-3">
            </div>
            <div className="col-9">
                <div className="row">
                    {users.map(user =>
                        <div key={user.userId} className="col-2 border border-primary m-2">
                            <UserCard key={user.userId} user={user}></UserCard>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

