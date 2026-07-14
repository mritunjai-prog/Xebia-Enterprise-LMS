import { Mail, Phone, Building, CalendarDays, Hash, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useLMS } from "@/context/LMSContext";
import { useQuery } from "@tanstack/react-query";
import { EnrollmentService } from "@/services/api";

export function ProfileDetails() {
  const { currentUser } = useLMS();
  
  const { data: coursesData } = useQuery({
    queryKey: ["student-enrolled-courses"],
    queryFn: EnrollmentService.getMyCourses,
  });

  const enrolledCourses = coursesData || [];

  const INFO_ITEMS = [
    {
      icon: Mail,
      label: "Email Address",
      value: currentUser?.email || "student@example.com",
      color: "text-accent-2",
      bg: "bg-accent-2/10",
    },
    {
      icon: Hash,
      label: "Student ID",
      value: currentUser?.id || "N/A",
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      icon: Phone,
      label: "Phone Number",
      value: currentUser?.phone || "+1 (555) 123-4567",
      color: "text-accent-2",
      bg: "bg-accent-2/10",
    },
    {
      icon: Building,
      label: "University / Organisation",
      value: "Xebia University",
      color: "text-destructive",
      bg: "bg-destructive/10",
    },
    {
      icon: CalendarDays,
      label: "Batch",
      value: currentUser?.batches?.[0] || "No Batch",
      color: "text-accent-2",
      bg: "bg-accent-2/10",
    },
    {
      icon: CalendarDays,
      label: "Enrollment Date",
      value: currentUser?.createdAt ? currentUser.createdAt.split("T")[0] : "Recent",
      color: "text-primary-glow",
      bg: "bg-primary-glow/10",
    },
    {
      icon: BookOpen,
      label: "Enrolled Courses",
      value: `${enrolledCourses.length} Courses`,
      color: "text-primary",
      bg: "bg-primary/10",
    },
  ];

  if (!currentUser) return null;

  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
        <CardDescription>Your account details and enrollment information.</CardDescription>
      </CardHeader>
      <Separator />
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {INFO_ITEMS.map((item) => (
            <div
              key={item.label}
              className="flex items-start gap-4 p-4 rounded-xl bg-muted/30 border border-border/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:bg-muted/50"
            >
              <div className={`p-2.5 rounded-lg ${item.bg} ${item.color} flex-shrink-0`}>
                <item.icon className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  {item.label}
                </p>
                <p className="font-semibold mt-0.5 truncate">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * Enrolled courses summary list shown on the profile page.
 */
export function EnrolledCoursesList() {
  const { data: coursesData } = useQuery({
    queryKey: ["student-enrolled-courses"],
    queryFn: EnrollmentService.getMyCourses,
  });
  const enrolledCourses = coursesData || [];

  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle>Enrolled Courses</CardTitle>
        <CardDescription>Courses you are currently enrolled in.</CardDescription>
      </CardHeader>
      <Separator />
      <CardContent className="pt-6 space-y-4">
        {enrolledCourses.length > 0 ? enrolledCourses.map((course) => (
          <div
            key={course.id}
            className="flex items-center gap-4 p-4 rounded-xl bg-muted/30 border border-border/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="h-12 w-12 rounded-lg overflow-hidden flex-shrink-0 bg-primary/10 flex items-center justify-center">
              {course.image ? (
                <img src={course.image} alt={course.title} className="h-full w-full object-cover" />
              ) : (
                <BookOpen className="h-6 w-6 text-primary" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold truncate">{course.title}</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {course.level}
              </p>
            </div>
            <Badge className="bg-primary/10 text-primary border-primary/20">
              Active
            </Badge>
          </div>
        )) : (
          <p className="text-sm text-muted-foreground text-center py-4">No enrolled courses found.</p>
        )}
      </CardContent>
    </Card>
  );
}
