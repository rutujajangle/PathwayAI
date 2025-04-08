import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Clock, Award, Book, CheckCircle2, XCircle } from "lucide-react";
import { degreePrograms } from "@/data/degreePrograms";
import { Button } from "@/components/ui/button";

interface DegreeRoadmapProps {
  selectedDegreeId: string | null;
  selectedCourses: string[];
  onCourseSelect: (courseId: string) => void;
  onCourseDeselect: (courseId: string) => void;
}

const DegreeRoadmap = ({
  selectedDegreeId,
  selectedCourses,
  onCourseSelect,
  onCourseDeselect,
}: DegreeRoadmapProps) => {
  const selectedDegree = degreePrograms.find(program => program.degree === selectedDegreeId);
  const isMasters = selectedDegree?.degree.includes("MS");

  if (!selectedDegree) {
    return (
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Select a Degree Program</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Please select a degree program to view its roadmap.</p>
        </CardContent>
      </Card>
    );
  }

  const specialization = Object.keys(selectedDegree.specializations)[0];
  const semesters = selectedDegree.specializations[specialization];

  // Calculate total selected credits
  const totalSelectedCredits = selectedCourses.reduce((total, courseId) => {
    const course = Object.values(semesters)
      .flatMap(semester => semester.courses)
      .find(c => c.id === courseId);
    return total + (course?.credits || 0);
  }, 0);

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl">{selectedDegree.degree}</CardTitle>
            <div className="flex items-center space-x-2">
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="h-4 w-4 mr-1" />
                {selectedDegree.duration}
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Award className="h-4 w-4 mr-1" />
                {selectedDegree.totalCredits} credits
              </div>
            </div>
          </div>
          <CardDescription>{selectedDegree.description}</CardDescription>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">Specialization:</span>
            <span className="text-sm text-muted-foreground">{specialization}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(semesters).map(([semesterKey, semester], index) => (
              <div key={index} className="space-y-2">
                <h3 className="text-lg font-semibold">Semester {index + 1}</h3>
                <div className="space-y-2">
                  {semester.courses.map((course) => (
                    <div
                      key={course.id}
                      className={`p-3 rounded-lg border ${
                        selectedCourses.includes(course.id)
                          ? 'bg-primary/10 border-primary'
                          : 'bg-card border-border'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium">{course.name}</h4>
                          <p className="text-sm text-muted-foreground">{course.id}</p>
                          <p className="text-sm text-muted-foreground mt-1">{course.description}</p>
                          {course.prerequisites && (
                            <p className="text-xs text-muted-foreground mt-1">
                              Prerequisites: {course.prerequisites.join(', ')}
                            </p>
                          )}
                          {course.corequisites && (
                            <p className="text-xs text-muted-foreground mt-1">
                              Corequisites: {course.corequisites.join(', ')}
                            </p>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            if (selectedCourses.includes(course.id)) {
                              onCourseDeselect(course.id);
                            } else {
                              onCourseSelect(course.id);
                            }
                          }}
                        >
                          {selectedCourses.includes(course.id) ? (
                            <CheckCircle2 className="h-5 w-5 text-primary" />
                          ) : (
                            <XCircle className="h-5 w-5 text-muted-foreground" />
                          )}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {selectedCourses.length > 0 && (
            <>
              <Separator />
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Selected Courses</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {selectedCourses.map((courseId) => {
                    const course = Object.values(semesters)
                      .flatMap(semester => semester.courses)
                      .find(c => c.id === courseId);
                    if (!course) return null;
                    return (
                      <div
                        key={courseId}
                        className="p-3 rounded-lg border border-primary bg-primary/5"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-medium">{course.name}</h4>
                            <p className="text-sm text-muted-foreground">{course.id}</p>
                            <p className="text-sm text-muted-foreground mt-1">{course.description}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onCourseDeselect(courseId)}
                          >
                            <XCircle className="h-5 w-5 text-primary" />
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center space-x-2">
                    <Book className="h-4 w-4" />
                    <span className="text-sm text-muted-foreground">
                      {selectedCourses.length} courses selected
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Award className="h-4 w-4" />
                    <span className="text-sm text-muted-foreground">
                      {totalSelectedCredits} credits
                    </span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DegreeRoadmap; 