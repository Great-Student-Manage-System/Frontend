import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

interface GraphProps<T> {
  data: T[];
}

function Graph<T>({ data }: GraphProps<T>) {
  return (
    <div style={{ marginTop: "10px" }}>
      <LineChart
        width={895}
        height={356}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 0,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="score"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        <Line type="monotone" dataKey="grade" stroke="#82ca9d" />
      </LineChart>
    </div>
  );
}

export default Graph;
