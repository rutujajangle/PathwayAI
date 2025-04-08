import React, { useCallback } from 'react';
import ReactFlow, {
  Node,
  Edge,
  Background,
  Controls,
  Handle,
  Position,
  NodeProps,
  Panel,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Book, Code, Target } from "lucide-react";
import { courseToSkills, courseDescriptions } from "@/data/courseToSkills";
import { careerToSkills } from "@/data/careerToSkills";

// Custom node components
const CourseNode = ({ data }: NodeProps) => (
  <div className="px-4 py-2 shadow-lg rounded-md border-2 border-rose-200 bg-rose-50/50 hover:bg-rose-50 transition-colors">
    <Handle type="source" position={Position.Right} className="w-3 h-3 bg-rose-400" />
    <div className="flex items-center">
      <Book className="h-4 w-4 mr-2 text-rose-500" />
      <div>
        <div className="font-semibold text-rose-700">{data.label}</div>
        <div className="text-xs text-rose-600/70">{data.courseId}</div>
      </div>
    </div>
  </div>
);

const SkillNode = ({ data }: NodeProps) => (
  <div className="px-4 py-2 shadow-lg rounded-md border-2 border-purple-200 bg-purple-50/50 hover:bg-purple-50 transition-colors">
    <Handle type="target" position={Position.Left} className="w-3 h-3 bg-purple-400" />
    <Handle type="source" position={Position.Right} className="w-3 h-3 bg-purple-400" />
    <div className="flex items-center">
      <Code className="h-4 w-4 mr-2 text-purple-500" />
      <div className="font-semibold text-purple-700">{data.label}</div>
    </div>
  </div>
);

const CareerNode = ({ data }: NodeProps) => (
  <div className="px-6 py-4 shadow-lg rounded-md border-2 border-green-200 bg-green-50/50 hover:bg-green-50 transition-colors">
    <Handle type="target" position={Position.Left} className="w-3 h-3 bg-green-400" />
    <div className="flex flex-col items-center space-y-2">
      <Target className="h-6 w-6 text-green-500" />
      <div>
        <div className="font-semibold text-green-700 text-center">{data.label}</div>
        <div className="text-xs text-green-600/70 text-center mt-1">{data.description}</div>
      </div>
    </div>
  </div>
);

// Node types mapping
const nodeTypes = {
  course: CourseNode,
  skill: SkillNode,
  career: CareerNode,
};

interface CourseRoadmapVisualizerProps {
  selectedCourses: string[];
  selectedProfession: string | null;
  onProfessionChange: (profession: string) => void;
}

const CourseRoadmapVisualizer = ({
  selectedCourses,
  selectedProfession,
  onProfessionChange,
}: CourseRoadmapVisualizerProps) => {
  const generateNodesAndEdges = useCallback(() => {
    const nodes: Node[] = [];
    const edges: Edge[] = [];
    let nodeId = 1;

    if (!selectedProfession) return { nodes, edges };

    const careerInfo = careerToSkills[selectedProfession];
    const requiredSkills = careerInfo.requiredSkills;

    // Calculate the total height needed
    const totalSelectedCourses = selectedCourses.length;
    const totalSkills = requiredSkills.length;
    const maxItems = Math.max(totalSelectedCourses, totalSkills);
    const verticalSpacing = 100;
    const totalHeight = maxItems * verticalSpacing;

    // Add course nodes on the left
    const courseNodes = selectedCourses.map((courseId, index) => {
      const yPos = (index * verticalSpacing) + (totalHeight - (totalSelectedCourses * verticalSpacing)) / 2;
      return {
        id: `course-${nodeId + index}`,
        type: 'course',
        position: { x: 0, y: yPos },
        data: { 
          label: courseDescriptions[courseId]?.split(':')[0] || courseId,
          courseId,
        },
      };
    });
    nodes.push(...courseNodes);
    nodeId += courseNodes.length;

    // Add skill nodes in the middle
    const skillNodes = requiredSkills.map((skill, index) => {
      const yPos = (index * verticalSpacing) + (totalHeight - (totalSkills * verticalSpacing)) / 2;
      return {
        id: `skill-${nodeId + index}`,
        type: 'skill',
        position: { x: 400, y: yPos },
        data: { label: skill },
      };
    });
    nodes.push(...skillNodes);

    // Add career node on the right
    const careerNode = {
      id: 'career-1',
      type: 'career',
      position: { x: 800, y: totalHeight / 2 - 50 },
      data: { 
        label: selectedProfession,
        description: careerInfo.description,
      },
    };
    nodes.push(careerNode);

    // Add edges from courses to skills
    courseNodes.forEach(courseNode => {
      const courseSkills = courseToSkills[courseNode.data.courseId] || [];
      skillNodes.forEach(skillNode => {
        if (courseSkills.includes(skillNode.data.label)) {
          edges.push({
            id: `${courseNode.id}-${skillNode.id}`,
            source: courseNode.id,
            target: skillNode.id,
            animated: true,
            style: { stroke: '#94a3b8', strokeWidth: 2 },
          });
        }
      });
    });

    // Add edges from skills to career
    skillNodes.forEach(skillNode => {
      edges.push({
        id: `${skillNode.id}-career-1`,
        source: skillNode.id,
        target: 'career-1',
        animated: true,
        style: { stroke: '#94a3b8', strokeWidth: 2 },
      });
    });

    return { nodes, edges };
  }, [selectedCourses, selectedProfession]);

  const { nodes, edges } = generateNodesAndEdges();

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="flex items-center text-xl">
              <Target className="h-5 w-5 mr-2 text-primary" />
              Career Roadmap
            </CardTitle>
            <CardDescription>
              Visualize your path from courses to career
            </CardDescription>
          </div>
          <Select
            value={selectedProfession || ""}
            onValueChange={onProfessionChange}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select a career goal" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(careerToSkills).map((career) => (
                <SelectItem key={career} value={career}>
                  {career}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="w-full h-[600px] border rounded-lg bg-background/50">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            fitView
            minZoom={0.5}
            maxZoom={1.5}
            defaultViewport={{ x: 0, y: 0, zoom: 0.8 }}
            className="bg-background"
          >
            <Background />
            <Controls />
            <Panel position="bottom-center" className="bg-background/80 p-2 rounded-t-lg shadow-lg">
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-rose-400 mr-2" />
                  <span>Courses</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-purple-400 mr-2" />
                  <span>Skills</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-400 mr-2" />
                  <span>Career</span>
                </div>
              </div>
            </Panel>
          </ReactFlow>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseRoadmapVisualizer;