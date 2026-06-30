import { createFileRoute } from "@tanstack/react-router";
import { batchInfo } from "@/lib/dummy-data";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CalendarDays, MapPin, User, Clock, Building } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/_layout/batches")({
  component: BatchesPage,
});

function BatchesPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Batches</h1>
        <p className="text-muted-foreground mt-1">
          View your current batch enrollment details and schedule.
        </p>
      </div>

      <Card className="glass relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
        <CardHeader className="pb-4 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-2xl">{batchInfo.batchName}</CardTitle>
              <CardDescription className="mt-2 text-base max-w-2xl">
                {batchInfo.description}
              </CardDescription>
            </div>
            <Badge className="w-fit bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 px-4 py-1.5 text-sm">
              Active Enrollment
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="relative z-10 pt-4 border-t border-border/50">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-500">
                  <CalendarDays className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Duration</p>
                  <p className="font-semibold mt-0.5">
                    {batchInfo.startDate} to {batchInfo.endDate}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-lg bg-orange-500/10 text-orange-500">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Schedule</p>
                  <p className="font-semibold mt-0.5">{batchInfo.schedule}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-lg bg-purple-500/10 text-purple-500">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Primary Trainer</p>
                  <p className="font-semibold mt-0.5">{batchInfo.trainer}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-lg bg-green-500/10 text-green-500">
                  <Building className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Organization</p>
                  <p className="font-semibold mt-0.5">{batchInfo.university}</p>
                </div>
              </div>
            </div>

            <div className="sm:col-span-2 lg:col-span-1 rounded-xl bg-muted/30 p-5 border border-border/50">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" /> Location / Mode
              </h3>
              <p className="text-sm text-muted-foreground">
                This is a fully online batch. All classes and assessments will be conducted via the
                LMS video conferencing tools.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
