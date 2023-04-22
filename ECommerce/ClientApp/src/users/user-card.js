import { useHistory } from "react-router-dom"


export const UserCard = ({ user }) => {

    const history=useHistory()

    function openUserDetails() {
        history.push('/user-details', {
            userId: user.userId
        })
    }

    return (
        <div onClick={openUserDetails}
        >
            <div className="row">
                <div className="col text-center">
                    <i className="fa fa-user" style={{ color: 'darkgray', fontSize: '5em', padding: '1rem 0' }} aria-hidden="true"></i>
                </div>
            </div>
            <div className="row">
                <div className="col text-center p-1">
                    {user.fullName}
                </div>
            </div>
            <div className="row">
                <div className="col text-center p-1">
                    {user.email}
                </div>
            </div>
        </div>
    )
}
