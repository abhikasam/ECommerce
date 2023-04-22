import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchUsersAsync } from "../store/user-slice"
import { useEffect } from "react"
import { UserCard } from "./user-card"


export default function Users() {

    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(fetchUsersAsync())
    }, [dispatch])

    const { users }=useSelector(state=>state.user)
    return (
        <div className="row">
            <div className="col-3">
            </div>
            <div className="col-9">
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

