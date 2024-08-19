import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import axios from "axios";

export default function Likelihood() {
  const [data, setData] = useState([["Region", "Mean Intensity", "Mean Relevance"]]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/data");
        const rawData = response.data;

        // Aggregating data by unique region to calculate the mean
        const regionMap = new Map();

        rawData.forEach(item => {
          const region = item.region || "Unknown";
          const intensity = item.intensity || 0;
          const relevance = item.relevance || 0;

          if (regionMap.has(region)) {
            const existingData = regionMap.get(region);
            regionMap.set(region, {
              intensitySum: existingData.intensitySum + intensity,
              relevanceSum: existingData.relevanceSum + relevance,
              count: existingData.count + 1,
            });
          } else {
            regionMap.set(region, {
              intensitySum: intensity,
              relevanceSum: relevance,
              count: 1,
            });
          }
        });

        const chartData = Array.from(regionMap.entries()).map(([region, values]) => [
          region,
          values.intensitySum / values.count, // Calculating mean intensity
          values.relevanceSum / values.count, // Calculating mean relevance
        ]);

        setData([["Region", "Mean Intensity", "Mean Relevance"], ...chartData]);
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
    <div style={{ justifyContent: "center", marginLeft: "20%",top:"15%",paddingTop:'5%' }}>
    <Chart
      chartType="Bar"
      data={data}
      options={{
        title: "Mean Intensity and Relevance by Region",
        chartArea: { width: '50%' },
        hAxis: {
          title: 'Mean Values',
          minValue: 0,
        },
        vAxis: {
          title: 'Region',
        },
        bars: "horizontal", // Bar direction
      }}
      width={"100%"}
      height={"600px"}
    /></div>
  );
}
