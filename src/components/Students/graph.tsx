import { examProps } from "@hooks/useExamList";
import { studentRecordProps } from "@hooks/useStudentRecord";
import React, { useMemo, useCallback } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import styled from "styled-components";

interface temp extends studentRecordProps, examProps {}

interface GraphProps<T extends temp> {
  data: T[];
}

function Graph<T extends temp>({ data }: GraphProps<T>) {
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
        <XAxis dataKey="examDate" />
        <YAxis />
        <Tooltip
          payload={[
            ...data.map((ele) => ({
              name: ele.examName,
              value: ele.score,
              unit: "점",
            })),
          ]}
          content={<CustomTooltip />}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="score"
          stroke={"#319CEA"}
          activeDot={{ r: 8 }}
        />
        <Line type="monotone" dataKey="grade" stroke="#82ca9d" />
      </LineChart>
    </div>
  );
}

export default Graph;

const ToolTipBackGround = styled.div`
  background-color: rgba(255, 255, 255, 0.7);
  padding: 1rem;
  outline: none;
`;
