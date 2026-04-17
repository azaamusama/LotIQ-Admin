import React from 'react';
import { 
  Car, 
  ShieldAlert, 
  CheckCircle2, 
  Truck, 
  UserPlus, 
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Clock
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from 'recharts';
import { cn } from '../lib/utils';
import { useAuth } from '../lib/auth-context';

const data = [
  { name: '00:00', violations: 4, activity: 20 },
  { name: '04:00', violations: 2, activity: 15 },
  { name: '08:00', violations: 15, activity: 85 },
  { name: '12:00', violations: 25, activity: 120 },
  { name: '16:00', violations: 18, activity: 95 },
  { name: '20:00', violations: 12, activity: 60 },
  { name: '23:59', violations: 8, activity: 30 },
];

export function DashboardView() {
  const { user } = useAuth();
  const isSuperAdmin = user?.role === 'super_admin';

  const stats = [
    { label: 'Active Vehicles', value: '512', icon: Car, trend: '+12%', trendUp: true },
    { label: 'Violations Today', value: '42', icon: ShieldAlert, trend: '+5%', trendUp: true },
    { label: 'Approval Rate', value: '94.2%', icon: CheckCircle2, trend: '-0.5%', trendUp: false },
    { label: 'Active Tows', value: '3', icon: Truck, trend: 'Stable', trendUp: true },
    ...(isSuperAdmin 
      ? [{ label: 'New Sign-ups', value: '18', icon: UserPlus, trend: '+24%', trendUp: true }]
      : [{ label: 'Avg. Review Time', value: '2.4m', icon: Clock, trend: '-10%', trendUp: true }]
    ),
  ];

  const topViolations = [
    { label: 'Unauthorized Parking', count: 142, color: 'bg-primary' },
    { label: 'EV not in use', count: 64, color: 'bg-emerald-500' },
    { label: 'Trash overflow', count: 42, color: 'bg-amber-500' },
    { label: 'Slip n fall risk', count: 18, color: 'bg-destructive' },
  ];

  return (
    <div className="space-y-8 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">System Overview</h1>
          <p className="text-muted-foreground">Real-time performance and activity monitoring.</p>
        </div>
        <div className="flex items-center gap-2 bg-card border rounded-lg p-1">
          <button className="px-3 py-1.5 text-xs font-medium rounded-md bg-primary text-primary-foreground">24h</button>
          <button className="px-3 py-1.5 text-xs font-medium rounded-md hover:bg-accent">7d</button>
          <button className="px-3 py-1.5 text-xs font-medium rounded-md hover:bg-accent">30d</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-none shadow-sm bg-card/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <stat.icon className="w-5 h-5 text-primary" />
                </div>
                <div className={cn(
                  "flex items-center text-[10px] font-bold px-1.5 py-0.5 rounded-full",
                  stat.trendUp ? "bg-emerald-500/10 text-emerald-500" : "bg-destructive/10 text-destructive"
                )}>
                  {stat.trendUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {stat.trend}
                </div>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 border-none shadow-sm bg-card/50">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              Activity vs Violations
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
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
                  cursor={{ stroke: 'hsl(var(--primary))', strokeWidth: 1 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="activity" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2} 
                  dot={false} 
                />
                <Line 
                  type="monotone" 
                  dataKey="violations" 
                  stroke="hsl(var(--destructive))" 
                  strokeWidth={2} 
                  dot={false} 
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-card/50">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Top Violations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {topViolations.map((item) => (
              <div key={item.label} className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium">{item.label}</span>
                  <span className="text-muted-foreground font-mono">{item.count}</span>
                </div>
                <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                  <div 
                    className={cn("h-full rounded-full transition-all duration-500", item.color)} 
                    style={{ width: `${(item.count / 150) * 100}%` }} 
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
