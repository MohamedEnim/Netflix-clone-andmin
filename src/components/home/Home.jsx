import "./Home.css";
import React, { useState, useEffect } from "react";
import Chart from "../chart/Chart";
import Featured from "../featured/Featured";
import WidgetLf from "../widgetLeft/WidgetLf";
import WidgetR from "./../widgetRight/WidgetR";
import instance from "../../axios";

const Home = () => {
  const [statistic, setStatistic] = useState([]);

  useEffect(() => {
    let canceled = false;
    const monthsArray = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const getStats = async () => {
      const res = await instance.get("/users/stats");
      const stats = res.data.sort((a, b) => a._id - b._id);
      if (canceled) return;
      setStatistic(
        stats.map((prev) => ({ ...prev, month: monthsArray[prev._id - 1] }))
      );
    };
    getStats();

    return () => {
      canceled = true;
    };
  }, []);

  return (
    <div className="home">
      <div className="home__featuredInfo">
        <Featured
          title="Revanue"
          money={2.415}
          moneyRate={-11.5}
          desc="Compared to last month"
        />
        <Featured
          title="Sales"
          money={4.454}
          moneyRate={-1.4}
          desc="Compared to last month"
        />
        <Featured
          title="Cost"
          money={2.023}
          moneyRate={2.1}
          desc="Compared to last month"
        />
      </div>
      <div className="home__chart">
        <Chart
          title="User Analytics"
          data={statistic}
          grid
          dataKeyVal="total"
          dataKeyX="month"
        />
      </div>
      <div className="home__widgets">
        <WidgetLf />
        <WidgetR />
      </div>
    </div>
  );
};

export default Home;
