import React, { useState } from "react";
import DegreeRoadmap from "@/components/DegreeRoadmap";
import DegreeSelector from "@/components/DegreeSelector";
import CourseRoadmapVisualizer from "@/components/CourseRoadmapVisualizer";
import { degreePrograms } from "@/data/degreePrograms";

const Roadmap = () => {
  const [selectedDegreeId, setSelectedDegreeId] = useState<string | null>(null);
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [selectedProfession, setSelectedProfession] = useState<string | null>(null);

  const handleCourseSelect = (courseId: string) => {
    setSelectedCourses(prev => [...prev, courseId]);
  };

  const handleCourseDeselect = (courseId: string) => {
    setSelectedCourses(prev => prev.filter(id => id !== courseId));
  };

  const handleProfessionChange = (profession: string) => {
    setSelectedProfession(profession);
  };

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <DegreeSelector
            selectedDegreeId={selectedDegreeId}
            onSelect={setSelectedDegreeId}
          />
        </div>
        <div className="lg:col-span-2">
          <DegreeRoadmap
            selectedDegreeId={selectedDegreeId}
            selectedCourses={selectedCourses}
            onCourseSelect={handleCourseSelect}
            onCourseDeselect={handleCourseDeselect}
          />
        </div>
      </div>

      {selectedCourses.length > 0 && (
        <div className="mt-8">
          <CourseRoadmapVisualizer
            selectedCourses={selectedCourses}
            selectedProfession={selectedProfession}
            onProfessionChange={handleProfessionChange}
          />
        </div>
      )}
    </div>
  );
};

export default Roadmap; 