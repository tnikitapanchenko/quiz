export interface Question {
  id: number;
  title: string;
  subtitle?: string;
  type: "single" | "multiple" | "bubble";
  options: string[];
  maxSelect?: number; 
}