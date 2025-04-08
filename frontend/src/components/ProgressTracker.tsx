
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Award, BookOpen } from "lucide-react";

interface ProgressTrackerProps {
  selectedCourses: any[];
}

const ProgressTracker = ({ selectedCourses }: ProgressTrackerProps) => {
  // Calculate progress metrics
  const totalCredits = selectedCourses.reduce((acc, course) => acc + course.credits, 0);
  const totalProgress = Math.min(Math.round((totalCredits / 40) * 100), 100); // 40 credits is max
  
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <Award className="h-5 w-5 mr-2 text-primary" />
          Your Progress
        </CardTitle>
      </CardHeader>
      <CardContent>
        {selectedCourses.length > 0 ? (
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1 text-sm">
                <span>Degree Progress</span>
                <span className="font-medium">{totalCredits}/40 Credits</span>
              </div>
              <Progress value={totalProgress} className="h-2" />
              {totalProgress >= 60 ? (
                <p className="text-xs text-success mt-1">You're on track to graduate!</p>
              ) : totalProgress >= 30 ? (
                <p className="text-xs text-muted-foreground mt-1">You're making good progress!</p>
              ) : (
                <p className="text-xs text-muted-foreground mt-1">Just getting started. Keep going!</p>
              )}
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col">
                <span className="text-2xl font-medium">{selectedCourses.length}</span>
                <span className="text-xs text-muted-foreground flex items-center">
                  <BookOpen className="h-3 w-3 mr-1" />
                  Courses Selected
                </span>
              </div>
              
              <div className="flex flex-col">
                <span className="text-2xl font-medium">{totalCredits}</span>
                <span className="text-xs text-muted-foreground">Credit Hours</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-6">
            <BookOpen className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">
              Select courses to track your progress
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProgressTracker;
