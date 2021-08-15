import React from 'react'
import { useSelector } from 'react-redux'
import User from './User';

function UserList() {

    const users=useSelector(state=>state.users.users)

    console.log(users);
    return (
        <div>
            <h2>Users</h2>
            {users.map(user=>(
                <User key={user.id} {...user}/>
            ))}
        </div>
    )
}

export default UserList
