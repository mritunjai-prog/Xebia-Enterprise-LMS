import { createFileRoute } from "@tanstack/react-router";
import { assessmentResults, chartData, enrolledCourses } from "@/features/student/mocks/dummy-data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

export const Route = createFileRoute("/student/results")({
  component: ResultsPage,
});

function ResultsPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Results & Performance</h1>
        <p className="text-muted-foreground mt-1">Track your learning progress and assessment scores.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Course Progress Chart */}
        <Card className="glass">
          <CardHeader>
            <CardTitle>Course Progress</CardTitle>
            <CardDescription>Completion status of enrolled courses</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={enrolledCourses} layout="vertical" margin={{ top: 20, right: 30, left: 20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} horizontal={true} vertical={false} />
                <XAxis type="number" domain={[0, 100]} hide />
                <YAxis dataKey="title" type="category" width={100} tick={{ fill: 'currentColor', opacity: 0.7, fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                  itemStyle={{ color: 'hsl(var(--foreground))' }}
                  formatter={(value) => [`${value}%`, 'Progress']}
                />
                <Bar dataKey="progress" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Performance Chart */}
        <Card className="glass">
          <CardHeader>
            <CardTitle>Subject Performance</CardTitle>
            <CardDescription>Your scores across different subjects</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData.assessmentPerformance} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="subject" tick={{ fill: 'currentColor', opacity: 0.7 }} />
                <YAxis tick={{ fill: 'currentColor', opacity: 0.7 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                  itemStyle={{ color: 'hsl(var(--foreground))' }}
                />
                <Bar dataKey="score" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Progress Chart */}
        <Card className="glass">
          <CardHeader>
            <CardTitle>Learning Activity</CardTitle>
            <CardDescription>Hours spent learning over time</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData.courseProgress} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="name" tick={{ fill: 'currentColor', opacity: 0.7 }} />
                <YAxis tick={{ fill: 'currentColor', opacity: 0.7 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                  itemStyle={{ color: 'hsl(var(--foreground))' }}
                />
                <Line type="monotone" dataKey="progress" stroke="hsl(var(--primary))" strokeWidth={3} dot={{ fill: 'hsl(var(--primary))', r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

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
