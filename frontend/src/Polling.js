import React from "react";
import axios from "axios";
import ReactPolling from "react-polling";

var waterusage = 0;

// 해야할 것 - goal parent에서 말고 db에서 가져와야 함

//[{user1, waterusage1}, {user1, waterusage2}, {user1, waterusage3} ... ]
const fetchData = async () => {
  return await axios.get("http://localhost:5001/monitor");
};

fetchData().then((res) => {
  waterusage = res.data;
  console.log(waterusage);
});

const sumWaterUsage = () => {
  var sum = 0;
  waterusage.forEach((obj) => {
    sum = sum + obj.waterusage;
  });
  return sum;
};

const Polling = (props) => {
  return (
    <ReactPolling
      url={"http://localhost:5001/monitor"}
      interval={1000}
      onSuccess={() => console.log("handle success")}
      onFailure={() => {
        console.log("handle failure", fetchData);
      }}
      promise={fetchData}
      render={({ startPolling, stopPolling, isPolling }) => {
        if (isPolling) {
          return (
            <div className="currUsage">
              You've consumed: {waterusage.waterusage} L. That is{" "}
              {(waterusage.waterusage * 100) / props.goal}% of today's goal
            </div>
          );
        } else {
          return <div className="currUsage">Sorry, we failed to get data</div>;
        }
      }}
    />
  );
};

export default Polling;
