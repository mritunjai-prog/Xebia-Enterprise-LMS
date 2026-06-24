import { createFileRoute } from "@tanstack/react-router";
import { upcomingAssessments } from "@/features/student/mocks/dummy-data";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlayCircle, Clock, CheckCircle } from "lucide-react";

export const Route = createFileRoute("/student/assessments")({
  component: AssessmentsPage,
});

function AssessmentsPage() {
  const getStatusBadge = (status) => {
    switch (status) {
      case "Completed":
        return (
          <Badge className="bg-green-500/10 text-green-500 border-green-500/20 hover:bg-green-500/20">
            <CheckCircle className="w-3 h-3 mr-1" /> Completed
          </Badge>
        );
      case "Upcoming":
        return (
          <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/20 hover:bg-blue-500/20">
            <Clock className="w-3 h-3 mr-1" /> Upcoming
          </Badge>
        );
      case "Pending":
        return (
          <Badge className="bg-orange-500/10 text-orange-500 border-orange-500/20 hover:bg-orange-500/20">
            <Clock className="w-3 h-3 mr-1" /> Pending
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Assessments</h1>
        <p className="text-muted-foreground mt-1">View your upcoming and pending assessments.</p>
      </div>

      <div className="rounded-xl border bg-card glass overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Assessment Name</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {upcomingAssessments.map((assessment) => (
                <TableRow key={assessment.id}>
                  <TableCell className="font-medium">{assessment.name}</TableCell>
                  <TableCell className="text-muted-foreground">{assessment.course}</TableCell>
                  <TableCell>{assessment.date}</TableCell>
                  <TableCell>{assessment.time}</TableCell>
                  <TableCell>{getStatusBadge(assessment.status)}</TableCell>
                  <TableCell className="text-right">
                    {assessment.status === "Completed" ? (
                      <Button
                        variant="outline"
                        size="sm"
                        className="transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                      >
                        View Result
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        className="bg-primary/10 text-primary hover:bg-primary/20 variant-secondary transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                      >
                        <PlayCircle className="w-4 h-4 mr-2" /> Start
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
