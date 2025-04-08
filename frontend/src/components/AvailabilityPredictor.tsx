
import React from "react";
import { AlertCircle, TrendingUp } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { mockHistoricalData } from "@/data/mockData";

interface AvailabilityPredictorProps {
  courseId: string;
}

const AvailabilityPredictor = ({ courseId }: AvailabilityPredictorProps) => {
  const courseData = mockHistoricalData.find((data) => data.courseId === courseId);
  
  if (!courseData) {
    return null;
  }

  // Get the last semester data
  const lastSemester = courseData.pastSemesters[courseData.pastSemesters.length - 1];
  
  // Determine the urgency level (color) based on fill rate and weeks
  const getUrgencyColor = () => {
    const avgFillRate = courseData.pastSemesters.reduce((acc, semester) => acc + semester.filledPercentage, 0) / 
      courseData.pastSemesters.length;
    
    if (avgFillRate > 95) return "bg-red-500";
    if (avgFillRate > 80) return "bg-amber-500";
    return "bg-emerald-500";
  };

  const urgencyColor = getUrgencyColor();
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="mt-2">
            <div className="flex justify-between items-center mb-1">
              <div className="flex items-center text-xs">
                <TrendingUp className="h-3 w-3 mr-1" />
                <span>Historical Fill Rate</span>
              </div>
              <span className="text-xs font-medium">{lastSemester.filledPercentage}%</span>
            </div>
            <Progress value={lastSemester.filledPercentage} className="h-1.5" indicatorClassName={urgencyColor} />
            {lastSemester.filledPercentage > 85 && (
              <div className="flex items-center mt-1">
                <AlertCircle className="h-3 w-3 text-red-500 mr-1" />
                <span className="text-xs text-red-500">High demand course</span>
              </div>
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs">
          <div>
            <h5 className="font-medium mb-1">Course Availability Prediction</h5>
            <p className="text-sm mb-2">{courseData.prediction}</p>
            <div className="space-y-1">
              {courseData.pastSemesters.map((semester) => (
                <div key={semester.term} className="flex justify-between text-xs">
                  <span>{semester.term}</span>
                  <span>
                    {semester.filledPercentage}% full
                    {semester.closedInWeeks ? ` (closed in ${semester.closedInWeeks} weeks)` : " (didn't fill)"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default AvailabilityPredictor;
