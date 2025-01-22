import styled from "styled-components";
import Heading from "../../ui/Heading";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

const ChartBox = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 3.2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  font-size: 0.9rem;
  padding-top: 2.4rem;
`;

function ForecastStatusChart({ rfis }) {
  const rfiForecastStatusGroup = Array.isArray(rfis)
    ? rfis.reduce((acc, obj) => {
        const cleanedStatus = obj.forecast_stautus
          ? obj.forecast_stautus.replace(/"/g, "").trimEnd() // Remove trailing spaces and quotes
          : "";

        if (cleanedStatus) {
          if (acc[cleanedStatus]) {
            acc[cleanedStatus].count += 1;
          } else {
            acc[cleanedStatus] = { forecast_status: cleanedStatus, count: 1 };
          }
        }

        return acc;
      }, {})
    : [];

  const rfiForecastStatus = Object.values(rfiForecastStatusGroup);

  const totalCount = rfiForecastStatus.reduce(
    (acc, status) => acc + status.count,
    0
  );

  // Calculate percentages
  const rfiForecastStatusWithPercentage = rfiForecastStatus.map((status) => {
    const percentage = ((status.count / totalCount) * 100).toFixed(2); // Calculate percentage
    return {
      ...status,
      percentage: parseFloat(percentage),
    };
  });

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
      <Heading as="h3">Forecast Status</Heading>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={rfiForecastStatusWithPercentage}
            cx="50%"
            cy="50%"
            outerRadius={80}
            label={({ forecast_status, percentage }) =>
              `${forecast_status}: ${percentage}%`
            }
            dataKey="percentage"
            nameKey="forecast_status"
            paddingAngle={8}
          >
            {rfiForecastStatusWithPercentage.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(value, forecast_status, entry) => [
              `${value}`,
              `${entry.payload.forecast_status}`,
            ]}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </ChartBox>
  );
}

export default ForecastStatusChart;
