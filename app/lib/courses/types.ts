export type CourseSection = {
    id: string;
    title: string;
    paragraphs?: string[];
    bulletPoints?: string[];
  };
  
  export type CourseQuestion = {
    id: string;
    question: string;
    details?: string[];
    options: string[];
    correctAnswer: number;
    explanation: string;
  };
  
  export type CourseDefinition = {
    slug: string;
    title: string;
    subtitle: string;
    description: string;
    category: string;
    providerFocus: string;
    instructor: string;
    passingScore: number;
    ceHours: number;
    certificateEnabled: boolean;
    sections: CourseSection[];
    questions: CourseQuestion[];
  };