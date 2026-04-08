import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  PieChart, 
  Calendar,
  Download,
  Filter
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
  PieChart as RePieChart,
  Pie,
  Cell
} from 'recharts';

const areaData = [
  { name: 'Mon', violations: 45, revenue: 2400 },
  { name: 'Tue', violations: 52, revenue: 2800 },
  { name: 'Wed', violations: 48, revenue: 2600 },
  { name: 'Thu', violations: 61, revenue: 3200 },
  { name: 'Fri', violations: 75, revenue: 4100 },
  { name: 'Sat', violations: 82, revenue: 4500 },
  { name: 'Sun', violations: 55, revenue: 3000 },
];

const pieData = [
  { name: 'Unauthorized', value: 400, color: 'hsl(var(--primary))' },
  { name: 'Overstay', value: 300, color: 'hsl(var(--destructive))' },
  { name: 'No Permit', value: 200, color: 'hsl(var(--chart-3))' },
  { name: 'Other', value: 100, color: 'hsl(var(--muted))' },
];

export function AnalyticsView() {
  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reports & Analytics</h1>
          <p className="text-muted-foreground">Deep dive into system performance and parking trends.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Calendar className="w-4 h-4" />
            Last 30 Days
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 border-none shadow-sm bg-card/50">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              Violation Trends
            </CardTitle>
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <span>Violations</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={areaData}>
                <defs>
                  <linearGradient id="colorViolations" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} 
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="violations" 
                  stroke="hsl(var(--primary))" 
                  fillOpacity={1} 
                  fill="url(#colorViolations)" 
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-card/50">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <PieChart className="w-4 h-4 text-primary" />
              Violation Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[350px] flex flex-col items-center justify-center">
            <ResponsiveContainer width="100%" height="250">
              <RePieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </RePieChart>
            </ResponsiveContainer>
            <div className="w-full grid grid-cols-2 gap-4 mt-4">
              {pieData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-[10px] font-medium text-muted-foreground truncate">{item.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
