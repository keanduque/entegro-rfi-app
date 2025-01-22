import styled from "styled-components";
import Heading from "../../ui/Heading";
import {
  Pie,
  PieChart,
  ResponsiveContainer,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

const ChartBox = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 2.4rem 3.2rem;

  font-size: 0.9rem;

  & > *:first-child {
    margin-bottom: 1.6rem;
  }

  & .recharts-pie-label-text {
    font-weight: 600;
  }
`;

// const startDataLight = [
//   {
//     duration: "1 night",
//     value: 0,
//     color: "#ef4444",
//   },
//   {
//     duration: "2 nights",
//     value: 0,
//     color: "#f97316",
//   },
//   {
//     duration: "3 nights",
//     value: 0,
//     color: "#eab308",
//   },
//   {
//     duration: "4-5 nights",
//     value: 0,
//     color: "#84cc16",
//   },
//   {
//     duration: "6-7 nights",
//     value: 0,
//     color: "#22c55e",
//   },
//   {
//     duration: "8-14 nights",
//     value: 0,
//     color: "#14b8a6",
//   },
//   {
//     duration: "15-21 nights",
//     value: 0,
//     color: "#3b82f6",
//   },
//   {
//     duration: "21+ nights",
//     value: 0,
//     color: "#a855f7",
//   },
// ];

// const startDataDark = [
//   {
//     duration: "1 night",
//     value: 0,
//     color: "#b91c1c",
//   },
//   {
//     duration: "2 nights",
//     value: 0,
//     color: "#c2410c",
//   },
//   {
//     duration: "3 nights",
//     value: 0,
//     color: "#a16207",
//   },
//   {
//     duration: "4-5 nights",
//     value: 0,
//     color: "#4d7c0f",
//   },
//   {
//     duration: "6-7 nights",
//     value: 0,
//     color: "#15803d",
//   },
//   {
//     duration: "8-14 nights",
//     value: 0,
//     color: "#0f766e",
//   },
//   {
//     duration: "15-21 nights",
//     value: 0,
//     color: "#1d4ed8",
//   },
//   {
//     duration: "21+ nights",
//     value: 0,
//     color: "#7e22ce",
//   },
// ];

function StatusChart({ rfis }) {
  const rfiStatusGroup = Array.isArray(rfis)
    ? rfis.reduce((acc, obj) => {
        const cleanedStatus = obj.status_entegro
          ? obj.status_entegro.replace(/^"(.*)"$/, "$1")
          : "";

        if (cleanedStatus) {
          if (acc[cleanedStatus]) {
            acc[cleanedStatus].count += 1;
          } else {
            acc[cleanedStatus] = { status_entegro: cleanedStatus, count: 1 };
          }
        }

        return acc;
      }, {})
    : [];

  const rfiStatusEntegroGroup = Object.values(rfiStatusGroup);

  const sortedRfiStatusEntegroGroup = rfiStatusEntegroGroup.sort(
    (a, b) => b.count - a.count
  );

  const statusEntegroTotal = rfiStatusEntegroGroup.reduce(
    (acc, curr) => acc + curr.count,
    0
  );

  const rfiStatusEntegroWithPercentage = sortedRfiStatusEntegroGroup.map(
    (item) => {
      const percentage = ((item.count / statusEntegroTotal) * 100).toFixed(2);
      return {
        ...item,
        percentage: parseFloat(percentage),
      };
    }
  );

  // Assign unique colors to each status for visualization
  const COLORS = [
    "#22c55e",
    "#ff6384",
    "#36a2eb",
    "#cc65fe",
    "#ffce56",
    "#84cc16",
    "#ff6384 ",
    "#3b82f6",
    "#a855f7",
  ];

  return (
    <ChartBox>
      <Heading as="h3">Status Entegro by %</Heading>
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie
            data={rfiStatusEntegroWithPercentage}
            dataKey="percentage"
            nameKey="status_entegro"
            cx="40%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
          >
            {rfiStatusEntegroWithPercentage.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend
            verticalAlign="middle"
            align="right"
            width="30%"
            layout="vertical"
            iconSize={10}
            iconType="circle"
            formatter={(value, entry, index) => {
              const status = rfiStatusEntegroWithPercentage[index];
              return `${status.status_entegro}: ${status.percentage}%`;
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartBox>
  );
}

export default StatusChart;
