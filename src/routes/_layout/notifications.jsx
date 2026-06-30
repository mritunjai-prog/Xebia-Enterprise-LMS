import { createFileRoute } from "@tanstack/react-router";
import { notifications } from "@/lib/dummy-data";
import { Card, CardContent } from "@/components/ui/card";
import { Bell, BookOpen, ClipboardCheck, MessageSquare, Award } from "lucide-react";

export const Route = createFileRoute("/_layout/notifications")({
  component: NotificationsPage,
});

function NotificationsPage() {
  const getIcon = (type) => {
    switch (type) {
      case "course":
        return <BookOpen className="w-5 h-5 text-blue-500" />;
      case "assessment":
        return <ClipboardCheck className="w-5 h-5 text-orange-500" />;
      case "comment":
        return <MessageSquare className="w-5 h-5 text-purple-500" />;
      case "result":
        return <Award className="w-5 h-5 text-green-500" />;
      default:
        return <Bell className="w-5 h-5 text-primary" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
          <p className="text-muted-foreground mt-1">
            Stay updated with your courses and assessments.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {notifications.map((notification) => (
          <Card
            key={notification.id}
            className={`glass overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${!notification.read ? "border-primary/50 bg-primary/5" : ""}`}
          >
            <CardContent className="p-4 flex items-start gap-4">
              <div
                className={`p-3 rounded-full shrink-0 ${!notification.read ? "bg-background shadow-sm" : "bg-muted/50"}`}
              >
                {getIcon(notification.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3
                    className={`font-semibold text-base truncate ${!notification.read ? "text-foreground" : "text-muted-foreground"}`}
                  >
                    {notification.title}
                  </h3>
                  <span className="text-xs text-muted-foreground whitespace-nowrap shrink-0 pt-1">
                    {notification.timestamp}
                  </span>
                </div>
                <p
                  className={`text-sm ${!notification.read ? "text-foreground/90" : "text-muted-foreground"}`}
                >
                  {notification.message}
                </p>
              </div>
              {!notification.read && (
                <div className="w-2 h-2 rounded-full bg-primary shrink-0 mt-2"></div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
