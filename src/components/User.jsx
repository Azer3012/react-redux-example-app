import React from 'react'

function User({name,email,phone,address}) {

    const style={
        width: "50%",
        border:'1px solid black',
        padding: '10px',
        margin:'auto',
        marginBottom:'10px',
        

    }
    console.log(name,email,phone,address);
    return (
        <div style={style}>
            <p> name:{name}</p>
            <p> email:{email}</p>
            <p> phone:{name}</p>
            <p> adress:{address.city}</p>

        </div>
    )
}

export default User
