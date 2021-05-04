import React, { useState, useEffect } from "react";
import Panel from './Panel';
import Goals from './Goals';
import Nutrition from './Nutrition';
const axios = require('axios').default;

function Dashboard(props) {

    const {
        handleLogout,
        user
    } = props;

    const [userID, setUserID] = useState(0);
    const [wtGoal, setWtGoal] = useState("");
    const [cardioGoal, setCardioGoal] = useState("");
    const [calGoal, setCalGoal] = useState("");
    const [proteinGoal, setProteinGoal] = useState("");

    const [totalCal, setTotalCal] = useState(0);
    const [totalCarb, setTotalCarb] = useState(0);
    const [totalProtein, setTotalProtein] = useState(0);
    const [totalFat, setTotalFat] = useState(0);

    useEffect(() => {
        // when user sign in, this will get the userID and other data
        if (user !== "") {
            axios.post('http://localhost:3001/getUserInfo', {
                username: user.email
            }).then((res) => {
                setUserID(res.data[0].userID);
                setWtGoal(res.data[0].wtGoal);
                setCardioGoal(res.data[0].cardioGoal);
                setCalGoal(res.data[0].calGoal);
                setProteinGoal(res.data[0].proteinGoal);
                setTotalCal(res.data[0].calIntake);
                setTotalCarb(res.data[0].carbIntake);
                setTotalProtein(res.data[0].proteinIntake);
                setTotalFat(res.data[0].fatIntake);
            });
        }
    }, []);

    // to do
    // prevent users from resizing textarea

    // add date

    // use dog api as user pic
    // maybe not

    return (
        <div>
            <button onClick={()=> {handleLogout(); setUserID(0)}}>Logout</button>
            <p>Welcome, {user.email} </p>

            <div className="horzDisplay">
                {userID !== 0 && (<Panel userID = {userID} />)}
                <Goals 
                    userID = {userID} 
                    wtGoal = {wtGoal}
                    setWtGoal = {setWtGoal}
                    cardioGoal = {cardioGoal }
                    setCardioGoal = {setCardioGoal}
                    calGoal = {calGoal }
                    setCalGoal = {setCalGoal}
                    proteinGoal = {proteinGoal}
                    setProteinGoal = {setProteinGoal}
                />

                

                {totalFat !== 0 && (<Nutrition 
                    userID = {userID} 
                    totalCal = {totalCal}
                    totalCarb = {totalCarb}
                    totalProtein = {totalProtein}
                    totalFat = {totalFat}
                    setTotalCal = {setTotalCal}
                    setTotalCarb = {setTotalCarb}
                    setTotalProtein = {setTotalProtein}
                    setTotalFat = {setTotalFat}
                />)}
            </div>
        </div>
    );
}

export default Dashboard;