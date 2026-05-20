"use client";

import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Cell,
} from "recharts";

const callLogsData = [
    { name: "Mon", value: 155 },
    { name: "Tue", value: 265 },
    { name: "Wed", value: 205 },
    { name: "Thu", value: 215 },
    { name: "Fri", value: 305 },
    { name: "Sat", value: 115 },
    { name: "Sun", value: 210 },
];

export default function CallLogsChart() {
    return (
        <div className="h-[230px] min-w-0 w-full">
            {/* <ResponsiveContainer width="100%" height="100%"> */}
            <BarChart
                width={700}
                height={230}
                data={callLogsData}
                margin={{ top: 5, right: 5, left: -25, bottom: 0 }}
                style={{ outline: "none" }}
            >
                <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#94A3B8", fontSize: 10, fontWeight: 500 }}
                    dy={8}
                />

                <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#94A3B8", fontSize: 10, fontWeight: 500 }}
                    tickCount={4}
                />

                <Tooltip
                    cursor={{ fill: "rgba(241,245,249,0.6)" }}
                    contentStyle={{
                        borderRadius: "10px",
                        border: "none",
                        boxShadow: "0 8px 24px rgba(0,0,0,0.10)",
                        fontSize: "12px",
                    }}
                />

                <Bar dataKey="value" radius={[5, 5, 0, 0]} barSize={28}>
                    {callLogsData.map((_, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={index === 4 ? "#3B82F6" : "#BFDBFE"}
                        />
                    ))}
                </Bar>
            </BarChart>
            {/* </ResponsiveContainer> */}
        </div>
    );
}