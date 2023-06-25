import React, { useEffect, useRef, useState } from "react";
import { Chart } from "chart.js/auto";
import "./WorldviewChart.css";

const WorldviewChart = () => {
  const chartRef = useRef(null);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("https://eonet.gsfc.nasa.gov/api/v3/events?status=open&limit=20")
      .then((response) => response.json())
      .then((data) => setEvents(data.events))
      .catch((error) => console.error("Error:", error));
  }, []);

  useEffect(() => {
    if (chartRef.current) {
      if (chartRef.current.chart) {
        chartRef.current.chart.destroy();
      }

      const eventLabels = events.map((event) => event.title);
      const eventValues = events.map((event) => event.geometry.length);

      const chartData = {
        labels: eventLabels,
        datasets: [
          {
            label: "Eventos",
            data: eventValues,
            backgroundColor: "rgba(0, 123, 255, 0.5)",
            borderColor: "rgba(0, 123, 255, 1)",
            borderWidth: 2,
            pointRadius: 0,
          },
        ],
      };

      const ctx = chartRef.current.getContext("2d");

      chartRef.current.chart = new Chart(ctx, {
        type: "line",
        data: chartData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            x: {
              grid: {
                display: false,
              },
            },
            y: {
              grid: {
                color: "rgba(0, 0, 0, 0.1)",
              },
            },
          },
        },
      });
    }
  }, [events]);

  return (
 
      <div className="worldview-chart">
        <div className="chart-card">
          <canvas ref={chartRef}></canvas>
        </div>
      </div>
    );
  
};

export default WorldviewChart;
