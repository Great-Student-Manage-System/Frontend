import { examProps } from "@hooks/useExamList";
import { studentRecordProps } from "@hooks/useStudentRecord";
import React, { useCallback } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
} from "recharts";
import styled from "styled-components";

interface GraphProps<T> {
  data: T[];
}

function Graph<T>({ data }: GraphProps<T>) {
  console.log(data);

  const CustomTooltip = useCallback(({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const { payload: examInfo } = payload[0];
      return (
        <ToolTipBackGround>
          <p>{`${examInfo.examName}`}</p>
          <p>{`과목: ${examInfo.subject}`}</p>
          <p>{`점수: ${examInfo.score}`}</p>
        </ToolTipBackGround>
      );
    }

    return null;
  }, []);

  return (
    <div style={{ marginTop: "10px" }}>
      <BarChart
        width={895}
        height={356}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="score" />
        <YAxis dataKey="length" />
        <Tooltip />
        <Legend />
        <Bar dataKey="숫자" fill="#319CEA" />
      </BarChart>
    </div>
  );
}

export default Graph;

const ToolTipBackGround = styled.div`
  background-color: rgba(255, 255, 255, 0.7);
  padding: 1rem;
  outline: none;
`;
