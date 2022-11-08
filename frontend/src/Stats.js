import React, { useState, useEffect } from "react";
import axios from "axios";
import "./css/Stats.css";

const Stats = () => {
  const [waterUsageData, setWaterUsageData] = useState([]);
  const [waterTemperatureData, setWaterTemperatureData] = useState([]);
  const [avgWaterUsage, setAvgWaterUsage] = useState(0);
  const [avgTemperature, setAvgTemperature] = useState(0);

  const fetchData = async () => {
    await axios.get("http://localhost:5001/statsWaterUsage").then((res) => {
      setWaterUsageData(res.data);
      //console.log("fetchData", res.data);
    });
    await axios.get("http://localhost:5001/statsTemperature").then((res) => {
      setWaterTemperatureData(res.data);
      //console.log("fetchData", res.data);
    });
  };

  //waterData가 객체 list라고 가정
  const avgWater = (waterUsageData) => {
    var sum = 0;
    waterUsageData.forEach((obj) => {
      sum = sum + obj.waterusage;
    });
    setAvgWaterUsage(sum / waterUsageData.length);
  };

  //waterData가 객체 list라고 가정
  const avgTemp = (waterTemperatureData) => {
    var sum = 0;
    waterTemperatureData.forEach((obj) => {
      sum = sum + obj.temperature;
    });
    setAvgTemperature(sum / waterTemperatureData.length);
  };

  useEffect(() => {
    fetchData().then(() => {
      avgWater(waterUsageData);
      avgTemp(waterTemperatureData);
      console.log("componentdidmount", avgTemperature);
      console.log("componenetdidmount", avgWaterUsage);
    });
  });

  return (
    <div className="stats">
      <h4 className="statsHeader">[Stats of your shower]</h4>
      <div className="statsWaterUsage">
        Water usage average per month: {avgWaterUsage}
      </div>
      <div className="statsTemperature">
        Water temperature average per month: {avgTemperature}
      </div>
    </div>
  );
};

export default Stats;
