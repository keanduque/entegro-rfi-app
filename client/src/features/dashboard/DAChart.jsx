import React from "react";
import styled from "styled-components";
import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import DashboardBox from "./DashboardBox";
import Heading from "../../ui/Heading";

const StyledDAChart = styled(DashboardBox)`
  grid-column: 1 / -1;
  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }

  font-size: 0.9rem;
`;

const isDarkMode = true;
const colors = isDarkMode
  ? {
      totalCount: { stroke: "#1e7981", fill: "#1e7981" },
      extrasCount: { stroke: "#22c55e", fill: "#22c55e" },
      text: "#374151",
      background: "#18212f",
    }
  : {
      totalCount: { stroke: "#1e7981", fill: "#c7d2fe" },
      extrasCount: { stroke: "#16a34a", fill: "#dcfce7" },
      text: "#374151",
      background: "#fff",
    };

function DAChart({ rfis }) {
  // Group by `da` and count
  const groupDA = rfis.reduce((accu, obj) => {
    if (obj.da !== null && obj.da !== undefined) {
      accu[obj.da] = (accu[obj.da] || 0) + 1;
    }
    return accu;
  }, {});

  const mapDA = Object.entries(groupDA).map(([daName, count]) => ({
    daName,
    count,
  }));

  // Calculate chart height based on data length
  const chartHeight = mapDA.length * 15; // Adjust multiplier for spacing

  return (
    <StyledDAChart>
      <Heading as="h3">RFI Count Per DA</Heading>
      <ResponsiveContainer width="100%" height={chartHeight}>
        <ComposedChart
          layout="vertical"
          data={mapDA}
          margin={{
            top: 10,
            right: 5,
            bottom: 10,
            left: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" stroke={colors.text} />
          <YAxis
            type="category"
            dataKey="daName"
            stroke={colors.text}
            interval={0} // Ensure all labels are displayed
            width={150} // Adjust width for long labels
          />
          <Tooltip cursor={{ fill: "rgba(0, 0, 0, 0.1)" }} />

          <Legend formatter={() => "RFI Count"} />
          <Bar dataKey="count" barSize={10} fill={colors.totalCount.fill} />
        </ComposedChart>
      </ResponsiveContainer>
    </StyledDAChart>
  );
}

export default DAChart;
