import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { SensorReading } from "@/lib/mockData";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface PHChartProps {
  data: SensorReading[];
}

export const PHChart = ({ data }: PHChartProps) => {
  const [period, setPeriod] = useState<"24h" | "7d">("24h");

  const chartData = data.map((d) => ({
    time: new Date(d.ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    value: d.value,
  }));

  return (
    <Card className="card-hover">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">pH Over Time</CardTitle>
        <div className="flex gap-2">
          <Button
            variant={period === "24h" ? "default" : "outline"}
            size="sm"
            onClick={() => setPeriod("24h")}
          >
            24H
          </Button>
          <Button
            variant={period === "7d" ? "default" : "outline"}
            size="sm"
            onClick={() => setPeriod("7d")}
          >
            7D
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="time"
              tick={{ fontSize: 12 }}
              stroke="hsl(var(--muted-foreground))"
            />
            <YAxis
              domain={[5.5, 7.5]}
              tick={{ fontSize: 12 }}
              stroke="hsl(var(--muted-foreground))"
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
            />
            <ReferenceLine y={6.0} stroke="hsl(var(--success))" strokeDasharray="3 3" />
            <ReferenceLine y={6.8} stroke="hsl(var(--success))" strokeDasharray="3 3" />
            <Line
              type="monotone"
              dataKey="value"
              stroke="hsl(var(--chart-1))"
              strokeWidth={3}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
