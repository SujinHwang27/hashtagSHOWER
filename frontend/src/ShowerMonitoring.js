import logo from "./logo.svg";
import "./css/ShowerMonitoring.css";
import React, { useState } from "react";
import axios from "axios";

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
    const response = await axios.post("http://localhost:5001/text", {
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
          <div className="currUsage">
            You've consumed: {usage} L. That is {(usage * 100) / goal}% of
            today's goal
          </div>
        </div>

        <div className="tempMonitor">
          <div className="currTemp">
            Current shower temperature: {temperature}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowerMonitoring;
