import React, { useState, useEffect } from "react";
import Panel from './Panel';
const axios = require('axios').default;

function Dashboard(props) {

    const {
        handleLogout,
        user
    } = props;

    const [user_id, setUser_id] = useState(0);

    useEffect(() => {
        // when user sign in, this will get the user_id 
        if (user !== "") {
            axios.post('http://localhost:3001/getID', {
                username: user.email
            }).then((res) => {
                setUser_id(res.data[0].user_id);
            });
        }
    }, []);

    return (
        <div className="App">
            <button onClick={()=> {handleLogout(); setUser_id(0)}}>Logout</button>
            <p> {user.email} </p>
            {user_id !== 0 && (<Panel user_id = {user_id} />)}
        </div>
    );
}

export default Dashboard;