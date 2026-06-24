import { createFileRoute } from "@tanstack/react-router";
import { assessmentResults, chartData, enrolledCourses } from "@/features/student/mocks/dummy-data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

// Feature chart components (shared, theme-aware)
import { LearningActivityChart } from "@/features/student/components/charts/LearningActivityChart";
import { SubjectPerformanceChart } from "@/features/student/components/charts/SubjectPerformanceChart";
import { CourseProgressChart } from "@/features/student/components/charts/CourseProgressChart";

export const Route = createFileRoute("/student/results")({
  component: ResultsPage,
});

function ResultsPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Results &amp; Performance</h1>
        <p className="text-muted-foreground mt-1">
          Track your learning progress and assessment scores.
        </p>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Course Progress */}
        <Card className="glass">
          <CardHeader>
            <CardTitle>Course Progress</CardTitle>
            <CardDescription>Completion status of enrolled courses</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <CourseProgressChart data={enrolledCourses} />
          </CardContent>
        </Card>

        {/* Subject Performance */}
        <Card className="glass">
          <CardHeader>
            <CardTitle>Subject Performance</CardTitle>
            <CardDescription>Your scores across different subjects</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <SubjectPerformanceChart data={chartData.assessmentPerformance} />
          </CardContent>
        </Card>

        {/* Learning Activity */}
        <Card className="glass">
          <CardHeader>
            <CardTitle>Learning Activity</CardTitle>
            <CardDescription>Hours spent learning over time</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <LearningActivityChart data={chartData.courseProgress} />
          </CardContent>
        </Card>
      </div>

      {/* Recent Results Table */}
      <h2 className="text-xl font-semibold mt-8 mb-4 tracking-tight">Recent Results</h2>
      <div className="rounded-xl border bg-card glass overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Assessment Name</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-center">Score</TableHead>
                <TableHead className="text-right">Grade</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assessmentResults.map((result) => (
                <TableRow key={result.id}>
                  <TableCell className="font-medium">{result.assessmentName}</TableCell>
                  <TableCell className="text-muted-foreground">{result.course}</TableCell>
                  <TableCell>{result.date}</TableCell>
                  <TableCell className="text-center font-semibold">
                    {result.marks} / {result.maxMarks} ({result.percentage}%)
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-none font-bold text-sm">
                      {result.grade}
                    </Badge>
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
