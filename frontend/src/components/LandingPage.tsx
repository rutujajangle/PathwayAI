import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  GraduationCap, 
  Search, 
  ArrowRight, 
  Book, 
  Briefcase,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { mockDegreePrograms } from "@/data/mockData";
import { motion, useScroll, useTransform } from "framer-motion";

const LandingPage = () => {
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, 100]);
  
  const featuredDegrees = mockDegreePrograms.slice(0, 3);

  const heroVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.8,
        staggerChildren: 0.2 
      } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.8,
        ease: "easeOut",
        delay: 0.4
      }
    }
  };

  return (
    <motion.div className="flex flex-col min-h-screen w-full overflow-x-hidden" initial="hidden" animate="visible" variants={heroVariants}>
      {/* Background Blobs */}
      <div className="fixed -top-20 -left-20 w-[40vw] h-[40vw] bg-primary/5 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-pulse" />
      <div className="fixed top-40 -right-20 w-[40vw] h-[40vw] bg-secondary/5 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-pulse delay-300" />
      
      {/* Hero Section */}
      <section className="relative min-h-[90vh] w-full overflow-hidden bg-gradient-to-b from-background via-primary/5 to-background py-20 lg:py-32 flex items-center">
        <div className="container mx-auto px-4 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={heroVariants} className="relative z-10">
              <motion.div variants={itemVariants} className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-6 py-2 text-base font-medium mb-8">
                <Sparkles className="h-5 w-5" />
                <span>Smart Course Planning with AI</span>
              </motion.div>
              
              <motion.h1 
                variants={itemVariants}
                className="text-6xl md:text-7xl font-extrabold leading-tight mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent"
              >
                Chart Your Path to Success
              </motion.h1>
              
              <motion.p 
                variants={itemVariants}
                className="text-2xl text-muted-foreground mb-10 max-w-2xl leading-relaxed"
              >
                Navigate your academic journey with AI-powered course recommendations perfectly aligned with your career aspirations.
              </motion.p>
              
              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6">
                <motion.div 
                  whileHover={{ scale: 1.05 }} 
                  whileTap={{ scale: 0.95 }}
                  className="shadow-lg shadow-primary/20"
                >
                  <Button size="lg" onClick={() => navigate("/explore")} className="relative overflow-hidden group text-lg px-8 py-6">
                    <span className="relative z-10 flex items-center">
                      Explore Courses
                      <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Button>
                </motion.div>
                
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    onClick={() => window.scrollTo({top: document.getElementById('features')?.offsetTop, behavior: 'smooth'})}
                    className="border-2 text-lg px-8 py-6"
                  >
                    Learn More
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="relative z-10 hidden lg:block"
              variants={cardVariants}
              style={{ y }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-3xl transform rotate-6 transition-transform" />
                <div className="bg-card/50 backdrop-blur-sm rounded-3xl p-10 relative border-2 shadow-xl">
                  <div className="grid grid-cols-2 gap-6">
                    {featuredDegrees.map((degree, index) => (
                      <motion.div 
                        key={degree.id} 
                        className={`bg-background/80 backdrop-blur-sm rounded-2xl p-6 border-2 shadow-sm ${index === 2 ? "col-span-2" : ""}`}
                        whileHover={{ y: -5, transition: { duration: 0.2 } }}
                      >
                        <CardHeader className="pb-3">
                          <CardTitle className="text-xl flex items-center">
                            <GraduationCap className="h-6 w-6 mr-3 text-primary" />
                            {degree.name}
                          </CardTitle>
                          <CardDescription className="text-base">{degree.credits} credits</CardDescription>
                        </CardHeader>
                      </motion.div>
                    ))}
                  </div>
                  
                  <motion.div 
                    className="absolute -bottom-6 -right-6 bg-primary text-white rounded-full p-5 shadow-lg"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Search className="h-8 w-8" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="w-full py-24 bg-muted/30">
        <div className="container mx-auto px-4 w-full">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">How PathwayAI Works</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our AI-powered platform takes the guesswork out of course selection, helping you make informed decisions aligned with your career goals.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <Card className="p-6">
              <CardHeader>
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 mb-4">
                  <GraduationCap className="h-7 w-7 text-primary" />
                </div>
                <CardTitle className="text-2xl mb-2">Choose Your Degree</CardTitle>
                <CardDescription className="text-lg">Select from a wide range of undergraduate and graduate degree programs.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-base text-muted-foreground">
                  Whether you're pursuing Computer Science, Data Science, Information Systems, or other programs, we've got your academic path covered.
                </p>
              </CardContent>
            </Card>
            
            <Card className="p-6">
              <CardHeader>
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 mb-4">
                  <Briefcase className="h-7 w-7 text-primary" />
                </div>
                <CardTitle className="text-2xl mb-2">Define Career Goals</CardTitle>
                <CardDescription className="text-lg">Tell us your desired profession and career aspirations.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-base text-muted-foreground">
                  Our AI analyzes your career goals and identifies the most relevant skills and knowledge areas needed for success in your chosen field.
                </p>
              </CardContent>
            </Card>
            
            <Card className="p-6">
              <CardHeader>
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 mb-4">
                  <Book className="h-7 w-7 text-primary" />
                </div>
                <CardTitle className="text-2xl mb-2">Get Course Recommendations</CardTitle>
                <CardDescription className="text-lg">Receive personalized course suggestions based on your inputs.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-base text-muted-foreground">
                  Our algorithm considers course availability, historical enrollment patterns, and your academic progress to provide tailored recommendations.
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center mt-16">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg" onClick={() => navigate("/explore")}>Start Planning Your Courses <ArrowRight className="ml-2 h-4 w-4" /></Button>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-b from-background to-primary/10">
        <div className="container mx-auto px-4">
          <div className="bg-card rounded-xl p-8 shadow-lg text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Build Your Academic Pathway?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of students who have used PathwayAI to navigate their academic journey and align their coursework with their career aspirations.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg" onClick={() => navigate("/explore")}>Explore Courses Now <ArrowRight className="ml-2 h-4 w-4" /></Button>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-8 border-t">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <GraduationCap className="h-5 w-5 text-primary mr-2" />
              <span className="font-semibold">PathwayAI</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} PathwayAI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </motion.div>
  );
};

export default LandingPage;
