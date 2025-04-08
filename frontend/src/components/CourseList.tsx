
import React, { useState } from "react";
import { Check, X, ChevronRight, Clock, Calendar, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator, 
  DropdownMenuCheckboxItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { fullCourseList } from "@/data/mockData";

interface CourseListProps {
  onSelectCourse: (course: any) => void;
  searchQuery?: string;
}

const CourseList = ({ onSelectCourse, searchQuery = "" }: CourseListProps) => {
  const [view, setView] = useState<'cards' | 'table'>('cards');
  const [selectedMajors, setSelectedMajors] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<string>("courseCode");
  const [search, setSearch] = useState(searchQuery);
  
  const coursesPerPage = view === 'cards' ? 8 : 12;
  
  // Get unique majors for filtering
  const majors = Array.from(new Set(fullCourseList.map(course => course.major)));
  
  // Filter and sort courses
  const filteredCourses = fullCourseList
    .filter(course => {
      // Filter by search
      if (search) {
        const searchLower = search.toLowerCase();
        const matchesSearch = 
          course.courseCode.toLowerCase().includes(searchLower) ||
          course.name.toLowerCase().includes(searchLower) ||
          course.major.toLowerCase().includes(searchLower);
        
        if (!matchesSearch) return false;
      }
      
      // Filter by selected majors
      if (selectedMajors.length > 0) {
        return selectedMajors.includes(course.major);
      }
      
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'courseCode') {
        return a.courseCode.localeCompare(b.courseCode);
      } else if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortBy === 'major') {
        return a.major.localeCompare(b.major);
      }
      return 0;
    });
  
  // Pagination
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);
  const startIndex = (currentPage - 1) * coursesPerPage;
  const paginatedCourses = filteredCourses.slice(startIndex, startIndex + coursesPerPage);
  
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get('search') as string;
    setSearch(query);
    setCurrentPage(1);
  };
  
  const handleMajorToggle = (major: string) => {
    setSelectedMajors(prev => {
      if (prev.includes(major)) {
        return prev.filter(m => m !== major);
      } else {
        return [...prev, major];
      }
    });
    setCurrentPage(1);
  };
  
  const clearFilters = () => {
    setSelectedMajors([]);
    setSearch("");
    setCurrentPage(1);
  };
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <form onSubmit={handleSearch} className="w-full sm:max-w-md">
          <div className="relative">
            <Input
              type="search"
              name="search"
              placeholder="Search courses by name or code..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pr-12"
            />
            <Button type="submit" size="sm" variant="ghost" className="absolute right-0 top-0 h-full">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </form>
        
        <div className="flex flex-wrap items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                {selectedMajors.length > 0 
                  ? `${selectedMajors.length} Major${selectedMajors.length > 1 ? 's' : ''} Selected` 
                  : "Filter by Major"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Filter by Major</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                {majors.map(major => (
                  <DropdownMenuCheckboxItem
                    key={major}
                    checked={selectedMajors.includes(major)}
                    onCheckedChange={() => handleMajorToggle(major)}
                  >
                    {major}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="courseCode">Sort by Code</SelectItem>
              <SelectItem value="name">Sort by Name</SelectItem>
              <SelectItem value="major">Sort by Major</SelectItem>
            </SelectContent>
          </Select>
          
          <div className="flex gap-1">
            <Button
              variant={view === 'cards' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setView('cards')}
              className="px-2"
            >
              Cards
            </Button>
            <Button
              variant={view === 'table' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setView('table')}
              className="px-2"
            >
              Table
            </Button>
          </div>
          
          {(selectedMajors.length > 0 || search) && (
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              Clear Filters
            </Button>
          )}
        </div>
      </div>
      
      <div>
        {filteredCourses.length > 0 ? (
          <>
            {view === 'cards' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {paginatedCourses.map((course) => (
                  <Card key={course.courseCode} className="overflow-hidden">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">{course.name}</CardTitle>
                      <CardDescription>{course.courseCode} • {course.credits} credits</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-3">
                      <Badge variant="outline">{course.major}</Badge>
                    </CardContent>
                    <CardFooter className="pt-0">
                      <Button 
                        onClick={() => onSelectCourse(course)} 
                        variant="default"
                        className="w-full"
                      >
                        Add Course
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Course Code</TableHead>
                        <TableHead>Course Name</TableHead>
                        <TableHead>Major</TableHead>
                        <TableHead>Credits</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedCourses.map((course) => (
                        <TableRow key={course.courseCode}>
                          <TableCell className="font-medium">{course.courseCode}</TableCell>
                          <TableCell>{course.name}</TableCell>
                          <TableCell>{course.major}</TableCell>
                          <TableCell>{course.credits}</TableCell>
                          <TableCell className="text-right">
                            <Button 
                              size="sm" 
                              onClick={() => onSelectCourse(course)}
                            >
                              Add
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            )}
            
            <div className="mt-4">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      href="#" 
                      onClick={(e) => {
                        e.preventDefault();
                        if (currentPage > 1) setCurrentPage(currentPage - 1);
                      }}
                      className={currentPage <= 1 ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                  
                  {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
                    // Simple pagination logic to show current page and surrounding pages
                    let pageToShow: number;
                    if (totalPages <= 5) {
                      pageToShow = i + 1;
                    } else if (currentPage <= 3) {
                      pageToShow = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageToShow = totalPages - 4 + i;
                    } else {
                      pageToShow = currentPage - 2 + i;
                    }
                    
                    if (pageToShow <= totalPages) {
                      return (
                        <PaginationItem key={i}>
                          <PaginationLink 
                            href="#" 
                            onClick={(e) => {
                              e.preventDefault();
                              setCurrentPage(pageToShow);
                            }}
                            isActive={currentPage === pageToShow}
                          >
                            {pageToShow}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    }
                    return null;
                  })}
                  
                  <PaginationItem>
                    <PaginationNext 
                      href="#" 
                      onClick={(e) => {
                        e.preventDefault();
                        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                      }}
                      className={currentPage >= totalPages ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </>
        ) : (
          <div className="p-12 text-center bg-muted/30 rounded-md">
            <h3 className="text-xl font-medium mb-2">No courses found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your filters or search query
            </p>
            <Button onClick={clearFilters}>Clear Filters</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseList;
