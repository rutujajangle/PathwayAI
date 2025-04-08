
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { MapPin, Award, Calendar } from "lucide-react";
import { mockProfessions } from "@/data/mockData";

interface CourseRoadmapProps {
  selectedCourses: any[];
  selectedProfession: string | null;
  selectedDegreeId: string | null;
}

const CourseRoadmap = ({ selectedCourses, selectedProfession, selectedDegreeId }: CourseRoadmapProps) => {
  // Find the selected profession data
  const professionData = selectedProfession 
    ? mockProfessions.find((p) => p.name === selectedProfession)
    : null;

  // Calculate completion percentages
  const calculateCompletion = () => {
    if (!professionData) return { core: 0, recommended: 0 };
    
    const selectedCourseIds = selectedCourses.map((course) => course.id);
    
    const coreCompleted = professionData.coreCourses.filter((id) => 
      selectedCourseIds.includes(id)
    ).length;
    
    const recommendedCompleted = professionData.recommendedCourses.filter((id) => 
      selectedCourseIds.includes(id)
    ).length;
    
    return {
      core: Math.round((coreCompleted / professionData.coreCourses.length) * 100) || 0,
      recommended: Math.round((recommendedCompleted / professionData.recommendedCourses.length) * 100) || 0,
    };
  };
  
  const completion = calculateCompletion();
  const totalCompletion = Math.round((completion.core * 0.7) + (completion.recommended * 0.3));
  
  // Check if the selected degree aligns with the profession
  const isDegreeAligned = professionData?.relatedDegrees?.includes(selectedDegreeId || '');

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <MapPin className="h-5 w-5 mr-2 text-primary" />
          Career Roadmap
        </CardTitle>
      </CardHeader>
      <CardContent>
        {selectedProfession ? (
          <div className="space-y-4">
            <div>
              <div className="flex items-center mb-2">
                <Award className="h-4 w-4 mr-2 text-primary" />
                <h3 className="text-sm font-medium">{selectedProfession} Career Path</h3>
              </div>
              
              {selectedDegreeId && (
                <div className="mb-2 text-sm">
                  <span className="font-medium">Degree Alignment: </span>
                  {isDegreeAligned ? (
                    <span className="text-emerald-500">Excellent match!</span>
                  ) : (
                    <span className="text-amber-500">Consider a different degree program</span>
                  )}
                </div>
              )}
              
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span>Core Requirements</span>
                    <span className="font-medium">{completion.core}%</span>
                  </div>
                  <Progress value={completion.core} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span>Recommended Courses</span>
                    <span className="font-medium">{completion.recommended}%</span>
                  </div>
                  <Progress value={completion.recommended} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span className="font-medium">Overall Completion</span>
                    <span className="font-medium">{totalCompletion}%</span>
                  </div>
                  <Progress value={totalCompletion} className="h-3" />
                </div>
              </div>
              
              {totalCompletion < 30 && (
                <p className="text-xs mt-2 text-amber-500">You're just starting your journey. Prioritize core courses first.</p>
              )}
              
              {totalCompletion >= 30 && totalCompletion < 70 && (
                <p className="text-xs mt-2 text-primary">You're making good progress toward your career goals!</p>
              )}
              
              {totalCompletion >= 70 && (
                <p className="text-xs mt-2 text-emerald-500">You're well prepared for a career in {selectedProfession}!</p>
              )}
            </div>
            
            <div className="border-t pt-2">
              <h4 className="text-sm font-medium mb-2 flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                Recommended Next Steps
              </h4>
              <ul className="space-y-1 text-sm">
                {professionData && selectedCourses.length > 0 ? (
                  professionData.coreCourses
                    .filter(courseId => !selectedCourses.some(c => c.id === courseId))
                    .slice(0, 2)
                    .map((courseId) => (
                      <li key={courseId} className="flex items-center">
                        <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                        <span>Take {courseId} (core course)</span>
                      </li>
                    ))
                ) : (
                  <li className="text-muted-foreground">Select courses to see recommendations</li>
                )}
                
                {selectedDegreeId && !isDegreeAligned && (
                  <li className="flex items-center text-amber-500">
                    <span className="w-2 h-2 bg-amber-500 rounded-full mr-2"></span>
                    <span>Consider a degree change for better alignment</span>
                  </li>
                )}
              </ul>
            </div>
          </div>
        ) : (
          <div className="text-center py-6">
            <Award className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">
              Select a profession to see your career roadmap
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CourseRoadmap;
