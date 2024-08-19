import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import axios from "axios";

// Define initial chart data and options
const initialData = [["Country", "Mean Likelihood"]];
const chartOptions = {
  title: "Mean Likelihood by Country",
  hAxis: {
    title: 'Country',
  },
  vAxis: {
    title: 'Mean Likelihood',
  },
  series: {
    0: { color: '#1b9e77' },
  },
  legend: { position: "bottom" },
  chartArea: { width: '70%' },
};

export default function Likelihoodcountry() {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/data");
        const rawData = response.data;

        // Aggregating data by unique country to calculate the mean likelihood
        const countryMap = new Map();

        rawData.forEach(item => {
          const country = item.country || "Unknown";
          const likelihood = item.likelihood || 0;

          if (countryMap.has(country)) {
            const existingData = countryMap.get(country);
            countryMap.set(country, {
              likelihoodSum: existingData.likelihoodSum + likelihood,
              count: existingData.count + 1,
            });
          } else {
            countryMap.set(country, {
              likelihoodSum: likelihood,
              count: 1,
            });
          }
        });

        // Transform the data for the chart
        const chartData = [["Country", "Mean Likelihood"]];
        countryMap.forEach((values, country) => {
          chartData.push([country, values.likelihoodSum / values.count]); // Calculating mean likelihood
        });

        setData(chartData);
      } catch (err) {
        setError("Error fetching data");
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
      chartType="AreaChart"
      width="100%"
      height="600px"
      data={data}
      options={chartOptions}
    /></div>
  );
}
