import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import axios from "axios";

export default function CountryYearAreaChart() {
  const [data, setData] = useState([["Country", "Start Year", "End Year"]]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/data");
        const rawData = response.data;

        // Aggregating data by unique country
        const countryMap = new Map();

        rawData.forEach(item => {
          const country = item.country || "Unknown";
          const startYear = item.start_year || 0;
          const endYear = item.end_year || 0;

          if (countryMap.has(country)) {
            countryMap.get(country).push({ startYear, endYear });
          } else {
            countryMap.set(country, [{ startYear, endYear }]);
          }
        });

        // Transform the data for the chart
        const chartData = [["Country", "Start Year", "End Year"]];
        countryMap.forEach((values, country) => {
          values.forEach(({ startYear, endYear }) => {
            chartData.push([country, startYear, endYear]);
          });
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
    <div style={{ display: "flex", justifyContent: "center", marginLeft: "20%" ,margintop:'5%'}}>
    <Chart
      chartType="AreaChart"
      data={data}
      options={{
        title: "Start Year and End Year by Country",
        hAxis: {
          title: 'Year',
          minValue: 0,
        },
        vAxis: {
          title: 'Country',
        },
        series: {
          0: { color: '#1b9e77', areaOpacity: 0.4 }, // Start Year
          1: { color: '#d95f02', areaOpacity: 0.4 }, // End Year
        },
        legend: { position: 'top' },
        chartArea: { width: '80%' },
      }}
      width={"100%"}
      height={"600px"}
    /></div>
  );
}
