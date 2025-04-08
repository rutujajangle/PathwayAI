import React from "react";
import { Check, Clock, Calendar, Users, X, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface CourseCardProps {
  course: {
    id: string;
    name: string;
    description: string;
    credits: number;
    prerequisites: {
      name: string;
      met: boolean;
    }[];
    timeSlot: string;
    availability: "Open" | "Limited Seats" | "Full";
    fillingRate: number;
    totalSeats: number;
    availableSeats: number;
  };
  isSelected: boolean;
  onSelect: () => void;
  isAlternative?: boolean;
}

const CourseCard = ({ course, isSelected, onSelect, isAlternative = false }: CourseCardProps) => {
  const getAvailabilityBadge = (availability: string, availableSeats: number, totalSeats: number) => {
    if (availableSeats === 0) {
      return <Badge variant="destructive" className="badge-full">Course Full - 0/{totalSeats}</Badge>;
    }
    
    switch (availability) {
      case "Open":
        return <Badge className="badge-available">{availableSeats}/{totalSeats} Seats</Badge>;
      case "Limited Seats":
        return <Badge className="badge-limited">{availableSeats}/{totalSeats} Seats</Badge>;
      case "Full":
        return <Badge variant="destructive" className="badge-full">Course Full - 0/{totalSeats}</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  return (
    <Card className={`shadow-sm card-hover ${isSelected ? 'border-primary' : ''} ${isAlternative ? 'border-dashed' : ''}`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{course.name}</CardTitle>
          {getAvailabilityBadge(course.availability, course.availableSeats, course.totalSeats)}
        </div>
        <CardDescription className="line-clamp-2">{course.description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{course.credits} Credits</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="h-4 w-4 mr-1" />
            <span>{course.timeSlot}</span>
          </div>
        </div>

        {/* Prerequisites */}
        <div className="mt-2">
          <h4 className="text-sm font-medium mb-1">Prerequisites:</h4>
          {course.prerequisites.length > 0 ? (
            <div className="space-y-1">
              {course.prerequisites.map((prereq, index) => (
                <div key={index} className="flex items-center text-sm">
                  {prereq.met ? (
                    <Check className="h-4 w-4 text-success mr-1" />
                  ) : (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex items-center">
                            <AlertTriangle className="h-4 w-4 text-warning mr-1" />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>This prerequisite is not met</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                  <span className={prereq.met ? "" : "text-muted-foreground"}>{prereq.name}</span>
                </div>
              ))}
            </div>
          ) : (
            <span className="text-sm text-muted-foreground">No prerequisites</span>
          )}
        </div>

        {/* Filling Rate */}
        {course.availability !== "Full" && course.availableSeats > 0 && (
          <div className="mt-3">
            <div className="flex justify-between text-xs text-muted-foreground mb-1">
              <span>Availability</span>
              <span>{course.availableSeats} seats remaining</span>
            </div>
            <Progress value={((course.totalSeats - course.availableSeats) / course.totalSeats) * 100} className="h-1.5" />
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button 
          onClick={onSelect} 
          className="w-full" 
          variant={isSelected ? "secondary" : "default"}
        >
          {isSelected ? (
            <>
              <X className="h-4 w-4 mr-1" />
              Remove
            </>
          ) : (
            <>
              <Check className="h-4 w-4 mr-1" />
              Select Course
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
