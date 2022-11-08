import "./css/ShowerMonitoring.css";
import React, { useState } from "react";
import { Link, Router } from "react-router-dom";
import axios from "axios";
import Polling from "./Polling";

function ShowerMonitoring() {
  let [temperature, setTemperature] = useState("receive from server");
  let [usage, setUsage] = useState("30"); /*서버에서받기*/

  const [goal, setGoal] = useState("100");

  const goalChange = (e) => {
    setGoal(e.target.value);
  };

  const goalInput = (e) => {
    //axios post 요청해서 goal 값
    fetchGoalValue(e.target.value);
    //setGoal(e.target.value);
  };

  const fetchGoalValue = async () => {
    const response = await axios.post("http://localhost:5001/goalset", {
      goal: goal,
    });
  };

  return (
    <div className="App">
      <div className="black-nav">
        {" "}
        {/*헤더*/}
        <h4>#SHOWER</h4>
      </div>
      <div className="monitor">
        <div className="waterMonitor">
          <div className="goal">
            Today's goal: {goal}
            <select onChange={goalChange} id="goal-select">
              <option value="80">80</option>
              <option value="100" selected>
                100
              </option>
              <option value="120">120</option>
            </select>
            <button id="submit" onClick={goalInput}>
              set
            </button>
          </div>
          <Polling goal={goal} />
        </div>

        <div className="tempMonitor">
          <div className="currTemp">
            Current shower temperature: {temperature}
          </div>
        </div>

        <div className="linkStats">
          <Link to="/stats">See my stats</Link>
        </div>
      </div>
    </div>
  );
}

export default ShowerMonitoring;
