export interface SectionProps {
  key: string;
  title: string;
  content: string;
  additionalServices?: {
    one: string;
    two?: string;
  };
}
