import { useState, useEffect, useRef } from "react";
import { MessageSquare, Book, GraduationCap, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useToast } from "@/hooks/use-toast";
import { Table, TableBody, TableCell, TableHeader, TableRow, TableHead } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { motion } from "framer-motion";

// Import our custom components
import Header from "@/components/Header";
import StudentInputForm from "@/components/StudentInputForm";
import ChatbotOverlay from "@/components/ChatbotOverlay";
import DegreeSelector from "@/components/DegreeSelector";
import AvailabilityPredictor from "@/components/AvailabilityPredictor";
import CourseList from "@/components/CourseList";
import { mockCourseData } from "@/data/mockData";
import { CourseRecommendation } from "@/services/courseSelector";
import CourseRoadmap from "@/components/CourseRoadmap";
import { submitUserData } from "@/services/api";

const Index = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [courses, setCourses] = useState(mockCourseData);
  const [recommendedCourses, setRecommendedCourses] = useState<CourseRecommendation[]>([]);
  const [selectedCourses, setSelectedCourses] = useState<Array<any>>([]);
  const [selectedProfession, setSelectedProfession] = useState<string | null>(null);
  const [selectedDegreeId, setSelectedDegreeId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMajor, setSelectedMajor] = useState("all");
  const { toast } = useToast();
  const [error, setError] = useState<string | null>(null);

  // Load saved state from sessionStorage on mount
  useEffect(() => {
    const savedCourses = sessionStorage.getItem('selectedCourses');
    const savedRecommendations = sessionStorage.getItem('recommendedCourses');
    const savedProfession = sessionStorage.getItem('selectedProfession');
    
    if (savedCourses) {
      setSelectedCourses(JSON.parse(savedCourses));
    }
    if (savedRecommendations) {
      setRecommendedCourses(JSON.parse(savedRecommendations));
    }
    if (savedProfession) {
      setSelectedProfession(savedProfession);
    }
  }, []);

  // Save state to sessionStorage whenever it changes
  useEffect(() => {
    sessionStorage.setItem('selectedCourses', JSON.stringify(selectedCourses));
    sessionStorage.setItem('recommendedCourses', JSON.stringify(recommendedCourses));
    sessionStorage.setItem('selectedProfession', selectedProfession || '');
  }, [selectedCourses, recommendedCourses, selectedProfession]);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  // Handle recommendations update
  const handleRecommendationsUpdate = (recommendations: CourseRecommendation[]) => {
    setRecommendedCourses(recommendations);
    toast({
      title: "Recommendations Ready",
      description: "We've found some courses that match your criteria.",
    });
  };

  // Handle degree selection
  const handleDegreeSelect = (degreeId: string) => {
    setSelectedDegreeId(degreeId);
    toast({
      title: "Degree Selected",
      description: "Your degree program has been updated.",
    });
  };

  // Add course to selected courses
  const handleSelectCourse = (course: any) => {
    if (selectedCourses.some(c => c.id === course.id || c.courseCode === course.courseId)) {
      setSelectedCourses(selectedCourses.filter(c => !(c.id === course.id || c.courseCode === course.courseId)));
      toast({
        title: "Course Removed",
        description: `${course.name || course.courseName} has been removed from your selected courses.`,
      });
    } else {
      // Check if we've reached the maximum number of courses
      if (selectedCourses.length >= 4) {
        toast({
          title: "Course Limit Reached",
          description: "You can only select up to 4 courses at a time. Please remove a course before adding another one.",
          variant: "destructive",
        });
        return;
      }

      // Make sure we're using the standardized course format for any new courses
      const standardizedCourse = {
        id: course.id || course.courseId,
        name: course.name || course.courseName,
        description: course.description || "No description available",
        credits: course.credits || 3,
        prerequisites: course.prerequisites || [],
        timeSlot: course.timeSlot || "TBA",
        availability: course.availability || "Open",
        fillingRate: course.fillingRate || 50,
        courseCode: course.courseId || course.courseCode,
        major: course.major
      };
      
      setSelectedCourses([...selectedCourses, standardizedCourse]);
      toast({
        title: "Course Added",
        description: `${course.name || course.courseName} has been added to your selected courses.`,
      });
    }
  };
  
  // Filter courses based on search query and selected major
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.courseCode.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMajor = selectedMajor === "all" || course.major === selectedMajor;
    return matchesSearch && matchesMajor;
  });

  // Handle search input change
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  // Handle major filter change
  const handleMajorChange = (value: string) => {
    setSelectedMajor(value);
  };

  const isCourseFull = (description: string, fillingRate?: number) => {
    return description.toLowerCase().includes('full') || fillingRate === 0;
  };

  // Assuming you have a function to map courses to skills and career goals
  const mapCoursesToSkills = (courses) => {
    // Example mapping logic
    return courses.map(course => ({
      id: course.id + '-skill',
      name: course.name + ' Skill'
    }));
  };

  const mapCoursesToCareerGoals = (courses) => {
    // Example mapping logic
    return courses.map(course => ({
      id: course.id + '-career',
      name: course.name + ' Career'
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProfession) {
      setError('Please select a profession');
      return;
    }
    setError(null);
    setIsLoading(true);

    try {
      const response = await submitUserData({ profession: selectedProfession });
      if (response.success) {
        navigate('/recommendations', { state: { recommendations: response.recommendations } });
      } else {
        setError('Failed to get recommendations. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex flex-col`}>
      <Header 
        darkMode={darkMode} 
        toggleDarkMode={toggleDarkMode} 
        showSearch={false}
      />
      
      <main className="flex-1 container py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left sidebar with student input form and progress */}
          <div className="w-full md:w-1/3">
            <div className="mb-6">
              <DegreeSelector 
                selectedDegreeId={selectedDegreeId} 
                onSelect={handleDegreeSelect} 
              />
            </div>

            <div className="mb-6">
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => navigate("/roadmap")}
              >
                View Degree Roadmap
              </Button>
            </div>

            <div className="mb-6">
              <StudentInputForm 
                onRecommendationsUpdate={handleRecommendationsUpdate}
                isLoading={isLoading}
              />
            </div>
          </div>

          {/* Main content area */}
          <div className="w-full md:w-2/3">
            <Tabs defaultValue="recommended" className="w-full">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                <TabsList>
                  <TabsTrigger value="recommended">Recommended Courses</TabsTrigger>
                  <TabsTrigger value="all">All Courses</TabsTrigger>
                  <TabsTrigger value="selected">Selected Courses ({selectedCourses.length})</TabsTrigger>
                </TabsList>
                
                <div className="mt-2 sm:mt-0">
                  {selectedProfession && (
                    <Badge variant="outline" className="flex items-center gap-1">
                      <GraduationCap className="h-3 w-3" />
                      {selectedProfession}
                    </Badge>
                  )}
                </div>
              </div>
              
              <TabsContent value="recommended" className="animate-fade-in">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {recommendedCourses.map((course) => {
                    const isFull = isCourseFull(course.description, course.fillingRate);
                    return (
                      <Card key={course.courseId} className={`overflow-hidden ${isFull ? 'opacity-75' : ''}`}>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-lg">{course.courseName}</CardTitle>
                          <CardDescription>{course.courseId} • {course.credits} credits</CardDescription>
                        </CardHeader>
                        <CardContent className="pb-3">
                          <p className="text-sm line-clamp-2 mb-3">{course.description}</p>
                          
                          <div className="grid grid-cols-2 gap-2 mb-3">
                            <div className="flex items-center justify-end">
                              {isFull ? (
                                <div className="flex items-center text-red-500">
                                  <X className="h-4 w-4 mr-1" />
                                  <span className="text-sm">Course is full</span>
                                </div>
                              ) : (
                                <Badge variant="outline">
                                  Open
                                </Badge>
                              )}
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="pt-0">
                          <Button 
                            onClick={() => !isFull && handleSelectCourse(course)} 
                            variant={selectedCourses.some(c => c.courseCode === course.courseId) ? "destructive" : "default"}
                            className={`w-full ${isFull ? 'bg-gray-400 hover:bg-gray-400 cursor-not-allowed' : ''}`}
                            disabled={isFull}
                          >
                            {isFull ? 'Course is Full' : 
                              selectedCourses.some(c => c.courseCode === course.courseId) ? 'Remove Course' : 'Add Course'}
                          </Button>
                        </CardFooter>
                      </Card>
                    );
                  })}
                </div>
              </TabsContent>
              
              <TabsContent value="all" className="animate-fade-in">
                <div className="space-y-4">
                  {/* Search and Filter Section */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Input
                      placeholder="Search courses..."
                      value={searchQuery}
                      onChange={(e) => handleSearchChange(e.target.value)}
                      className="max-w-sm"
                    />
                    <Select value={selectedMajor} onValueChange={handleMajorChange}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by major" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Majors</SelectItem>
                        <SelectItem value="ba-cs">BA Computer Science</SelectItem>
                        <SelectItem value="bs-cs">BS Computer Science</SelectItem>
                        <SelectItem value="bs-ds">BS Data Science</SelectItem>
                        <SelectItem value="ms-ds">MS Data Science</SelectItem>
                        <SelectItem value="ms-cs">MS Computer Science</SelectItem>
                        <SelectItem value="ms-se">MS Software Engineering</SelectItem>
                        <SelectItem value="ms-ai">MS Artificial Intelligence</SelectItem>
                        <SelectItem value="ms-cyber">MS Cybersecurity</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Courses Table */}
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Course Code</TableHead>
                          <TableHead>Course Name</TableHead>
                          <TableHead>Credits</TableHead>
                          <TableHead>Major</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredCourses.map((course) => {
                          const isFull = isCourseFull(course.description, course.fillingRate);
                          return (
                            <TableRow key={course.id}>
                              <TableCell className="font-medium">{course.courseCode}</TableCell>
                              <TableCell>{course.name}</TableCell>
                              <TableCell>{course.credits}</TableCell>
                              <TableCell>{course.major}</TableCell>
                              <TableCell>
                                {isFull ? (
                                  <Badge variant="destructive">Full</Badge>
                                ) : (
                                  <Badge variant="outline">Open</Badge>
                                )}
                              </TableCell>
                              <TableCell className="text-right">
                                <Button
                                  variant={selectedCourses.some(c => c.courseCode === course.courseCode) ? "destructive" : "default"}
                                  size="sm"
                                  onClick={() => !isFull && handleSelectCourse(course)}
                                  disabled={isFull}
                                  className={isFull ? 'bg-gray-400 hover:bg-gray-400 cursor-not-allowed' : ''}
                                >
                                  {isFull ? 'Full' : 
                                    selectedCourses.some(c => c.courseCode === course.courseCode) ? 'Remove' : 'Add'}
                                </Button>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </div>

                  {/* Pagination */}
                  <div className="flex justify-center">
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious href="#" />
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink href="#">1</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink href="#" isActive>
                            2
                          </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink href="#">3</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationNext href="#" />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="selected" className="animate-fade-in">
                {selectedCourses.length > 0 ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {selectedCourses.map((course) => (
                      <Card key={course.id || course.courseCode} className="overflow-hidden border-primary/20">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-lg">{course.name}</CardTitle>
                          <CardDescription>{course.courseCode || course.id} • {course.credits} credits</CardDescription>
                        </CardHeader>
                        <CardContent className="pb-3">
                          <p className="text-sm line-clamp-2 mb-3">{course.description}</p>
                          
                          <div className="grid grid-cols-1 gap-2 mb-3">
                            <div className="flex items-center justify-end">
                              <Badge variant={course.availability === "Open" ? "outline" : course.availability === "Limited Seats" ? "secondary" : "destructive"}>
                                {course.availability}
                              </Badge>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="pt-0">
                          <Button 
                            onClick={() => handleSelectCourse(course)} 
                            variant="destructive"
                            className="w-full"
                          >
                            Remove Course
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Book className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No Courses Selected</h3>
                    <p className="text-sm text-muted-foreground">
                      Start by selecting courses from the recommended or all courses tabs.
                    </p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      {/* Chat overlay */}
      <ChatbotOverlay show={showChat} onClose={() => setShowChat(false)} />
      
      {/* Chat button */}
      <Button
        className="fixed bottom-4 right-4 rounded-full p-4 shadow-lg"
        onClick={() => setShowChat(!showChat)}
      >
        <MessageSquare className="h-6 w-6" />
      </Button>

      <Dialog open={isLoading}>
        <DialogContent className="sm:max-w-md">
          <div className="flex flex-col items-center justify-center space-y-4 p-4">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center"
            >
              <motion.div
                animate={{
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-8 h-8 rounded-full bg-primary"
              />
            </motion.div>
            <h3 className="text-lg font-semibold">Getting Recommendations</h3>
            <p className="text-sm text-muted-foreground text-center">
              Please wait while we analyze your preferences and generate personalized course recommendations...
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
