import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import axios from "axios";

export function App() {
  const [chartData, setChartData] = useState([["Country", "Count"]]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch data from your API
        const response = await axios.get("http://localhost:5001/api/data");
        const data = response.data;

        // Process data to calculate country counts
        const countryCounts = data.reduce((acc, curr) => {
          const country = curr.country || "Unknown"; 
          acc[country] = (acc[country] || 0) + 1;
          return acc;
        }, {});

        // Convert the object into the format required by Google Charts
        const formattedData = Object.entries(countryCounts).map(
          ([country, count]) => [country, count]
        );

        // Set the data for the chart
        setChartData([["Country", "Count"], ...formattedData]);
      } catch (err) {
        setError("Error fetching data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div style={{ display: "flex", justifyContent: "center", marginLeft: "20%" }}>
         
      <Chart
        chartEvents={[
          {
            eventName: "select",
            callback: ({ chartWrapper }) => {
              const chart = chartWrapper.getChart();
              const selection = chart.getSelection();
              if (selection.length === 0) return;
              const region = chartData[selection[0].row + 1];
              console.log("Selected : " + region);
            },
          },
        ]}
        chartType="GeoChart"
        width="100%"
        height="500px"
        data={chartData}
      />
    </div>
  );
}

export default App;
