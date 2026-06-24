import { Card, CardContent } from "@/components/ui/card";

/**
 * A single stats card displayed in the dashboard summary row.
 * @param {{ title: string, value: number|string, icon: React.ElementType, trend: string, trendUp: boolean }} props
 */
export function StatCard({ title, value, icon: Icon, trend, trendUp }) {
  return (
    <Card className="glass hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-center justify-between space-y-0 pb-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Icon className="h-5 w-5 text-primary" />
          </div>
        </div>
        <div className="flex flex-col gap-1 mt-2">
          <div className="text-3xl font-bold">{value}</div>
          <p className={`text-xs ${trendUp ? "text-green-500" : "text-muted-foreground"}`}>
            {trend}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
