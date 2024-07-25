export interface HeroProps {
  key: string;
  title: string;
  content: string;
  additionalServices?: {
    one: string;
    two?: string;
  };
}
