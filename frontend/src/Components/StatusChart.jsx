import React from "react";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = ["#0284c7", "#10b981", "#f59e0b", "#ef4444"];

const StatusChart = ({ data = [] }) => (
  <div className="h-72 rounded-3xl bg-white p-5 shadow-md">
    <h2 className="text-xl font-bold text-gray-800">Appointment status</h2>
    {data.length ? (
      <ResponsiveContainer width="100%" height="90%">
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" innerRadius={48} outerRadius={78} paddingAngle={3}>
            {data.map((item, index) => <Cell key={item.name} fill={COLORS[index % COLORS.length]} />)}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    ) : <p className="grid h-full place-items-center text-gray-500">No appointment data yet.</p>}
  </div>
);

export default StatusChart;

