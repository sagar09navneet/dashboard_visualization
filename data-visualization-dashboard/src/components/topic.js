import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import axios from "axios";

export function App() {
  const [data, setData] = useState([["Topic", "Count"]]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/data"); 
        const rawData = response.data;

        // Count occurrences of each topic
        const topicCounts = rawData.reduce((acc, curr) => {
          const topic = curr.topic || "Unknown";
          acc[topic] = (acc[topic] || 0) + 1;
          return acc;
        }, {});

        // Prepare data for the chart
        const chartData = [["Topic", "Count"]];
        for (const [topic, count] of Object.entries(topicCounts)) {
          chartData.push([topic, count]);
        }

        setData(chartData);
      } catch (err) {
        setError("Error fetching data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const options = {
    title: "Topic Distribution",
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div style={{ display: "flex", justifyContent: "center", marginLeft: "15%" }}>
      <Chart
        
        chartType="PieChart"
        data={data}
        options={options}
        width={"100%"}
        height={"800px"}
      />
    </div>
  );
}

export default App;
