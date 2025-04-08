import React, { useState } from "react";
import { Check, ChevronDown, GraduationCap } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { degreePrograms } from "@/data/degreePrograms";

interface DegreeSelectorProps {
  onSelect: (degreeId: string) => void;
  selectedDegreeId: string | null;
}

const DegreeSelector = ({ onSelect, selectedDegreeId }: DegreeSelectorProps) => {
  const [isOpen, setIsOpen] = useState(true);
  
  const handleSelect = (degreeId: string) => {
    onSelect(degreeId);
    setIsOpen(false);
  };
  
  const selectedDegree = selectedDegreeId 
    ? degreePrograms.find(d => d.degree === selectedDegreeId)
    : null;
  
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center">
          <GraduationCap className="h-5 w-5 mr-2 text-primary" />
          Degree Program
        </CardTitle>
        <CardDescription>
          Select the degree program you are pursuing
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Collapsible open={isOpen} onOpenChange={setIsOpen} className="space-y-2">
          <div className="flex items-center justify-between">
            {selectedDegree ? (
              <div className="flex items-center space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20">
                  <Check className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">{selectedDegree.degree}</p>
                  <p className="text-xs text-muted-foreground">
                    {Object.keys(selectedDegree.specializations).length} specializations available
                  </p>
                </div>
              </div>
            ) : (
              <span className="text-sm text-muted-foreground">No degree selected</span>
            )}
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="p-0 h-8 w-8">
                <ChevronDown className="h-4 w-4" />
                <span className="sr-only">Toggle degree selection</span>
              </Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent className="pt-2">
            <RadioGroup onValueChange={handleSelect} value={selectedDegreeId || ""}>
              <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                {degreePrograms.map((degree) => (
                  <div
                    key={degree.degree}
                    className="flex items-center space-x-2 p-2 rounded-md hover:bg-accent transition-colors"
                  >
                    <RadioGroupItem value={degree.degree} id={degree.degree} />
                    <Label htmlFor={degree.degree} className="flex-1 cursor-pointer">
                      <div>
                        <p className="font-medium">{degree.degree}</p>
                        <p className="text-sm text-muted-foreground">
                          Specializations: {Object.keys(degree.specializations).join(", ")}
                        </p>
                      </div>
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
};

export default DegreeSelector;
