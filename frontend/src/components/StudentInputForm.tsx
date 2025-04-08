import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Briefcase, Check, X } from "lucide-react";
import { submitUserData } from "@/services/api";
import { useToast } from "@/hooks/use-toast";
import { CourseRecommendation } from "@/services/courseSelector";

interface FormData {
  profession: string;
}

interface StudentInputFormProps {
  isLoading: boolean;
  onRecommendationsUpdate: (recommendations: CourseRecommendation[]) => void;
}

const professions = [
  "Data Scientist", 
  "Software Engineer",
  "UX Designer",
  "Product Manager",
  "Digital Marketer",
  "Cybersecurity Analyst",
  "Machine Learning Engineer",
  "Web Developer"
];

const StudentInputForm = ({ isLoading, onRecommendationsUpdate }: StudentInputFormProps) => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      profession: "",
    }
  });
  const { toast } = useToast();
  const [recommendations, setRecommendations] = useState<CourseRecommendation[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = sessionStorage.getItem('recommendations');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });
  const [selectedCourses, setSelectedCourses] = useState<Set<string>>(() => {
    if (typeof window !== 'undefined') {
      const saved = sessionStorage.getItem('selectedCourses');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    }
    return new Set();
  });
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Save recommendations and selected courses to sessionStorage whenever they change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('recommendations', JSON.stringify(recommendations));
      sessionStorage.setItem('selectedCourses', JSON.stringify(Array.from(selectedCourses)));
    }
  }, [recommendations, selectedCourses]);

  const onSubmit = async (data: FormData) => {
    if (!data.profession) {
      toast({
        title: "Error",
        description: "Please select a profession",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      setError(null);
      const response = await submitUserData(data);
      if (response.recommendations) {
        setRecommendations(response.recommendations);
        onRecommendationsUpdate(response.recommendations);
        toast({
          title: "Recommendations ready!",
          description: "We've found some courses that match your goals.",
        });
      }
    } catch (err) {
      setError("Failed to get recommendations. Please try again.");
      console.error(err);
      toast({
        title: "Error",
        description: "Failed to get recommendations. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleCourseSelection = (courseId: string, isFull: boolean) => {
    if (isFull) return; // Don't allow selection if course is full
    
    const newSelected = new Set(selectedCourses);
    if (newSelected.has(courseId)) {
      newSelected.delete(courseId);
    } else {
      newSelected.add(courseId);
    }
    setSelectedCourses(newSelected);
  };

  const isCourseFull = (description: string) => {
    return description.toLowerCase().includes('full');
  };

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Briefcase className="h-5 w-5 mr-2 text-primary" />
          Career Goals
        </CardTitle>
        <CardDescription>Select your desired profession to find relevant courses</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="profession">Desired Profession *</Label>
            <Select 
              onValueChange={(value) => setValue("profession", value)}
              required
            >
              <SelectTrigger id="profession" className="input-focus">
                <SelectValue placeholder="Select a profession" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="software_engineer">Software Engineer</SelectItem>
                <SelectItem value="data_scientist">Data Scientist</SelectItem>
                <SelectItem value="web_developer">Web Developer</SelectItem>
                <SelectItem value="cybersecurity_analyst">Cybersecurity Analyst</SelectItem>
                <SelectItem value="machine_learning_engineer">Machine Learning Engineer</SelectItem>
                <SelectItem value="devops_engineer">DevOps Engineer</SelectItem>
                <SelectItem value="cloud_engineer">Cloud Engineer</SelectItem>
                <SelectItem value="qa_analyst">QA Analyst</SelectItem>
                <SelectItem value="mobile_developer">Mobile Developer</SelectItem>
                <SelectItem value="database_administrator">Database Administrator</SelectItem>
                <SelectItem value="network_engineer">Network Engineer</SelectItem>
                <SelectItem value="ui_ux_designer">UI/UX Designer</SelectItem>
                <SelectItem value="product_manager">Product Manager</SelectItem>
                <SelectItem value="technical_writer">Technical Writer</SelectItem>
                <SelectItem value="systems_analyst">Systems Analyst</SelectItem>
                <SelectItem value="ai_researcher">AI Researcher</SelectItem>
                <SelectItem value="blockchain_developer">Blockchain Developer</SelectItem>
                <SelectItem value="game_developer">Game Developer</SelectItem>
                <SelectItem value="embedded_systems_engineer">Embedded Systems Engineer</SelectItem>
                <SelectItem value="it_consultant">IT Consultant</SelectItem>
              </SelectContent>
            </Select>
            {errors.profession && (
              <p className="text-red-500 text-sm">{errors.profession.message}</p>
            )}
          </div>
          
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isSubmitting || isLoading}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Getting Recommendations...
              </>
            ) : (
              <>Get Recommendations</>
            )}
          </Button>
        </form>

        {error && (
          <p className="text-red-500 text-sm text-center mt-4">{error}</p>
        )}
      </CardContent>

      
   
    </Card>
  );
};

export default StudentInputForm;
