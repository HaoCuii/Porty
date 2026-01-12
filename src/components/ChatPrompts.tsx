import { useEffect, useState } from "react";
import { Button } from "./ui/Button";

interface ChatPromptsProps {
  onPromptClick: (prompt: string) => void;
}

const allPrompts = [
  "Tell me about Eric's experience",
  "What projects has Eric worked on?",
  "What is Eric studying?",
  "Tell me about Eric's leadership roles",
  "What clubs is Eric involved in?",

  // Portfolio & career
  "What is Eric currently working on?",
  "What kind of work does Eric do?",
  "What areas is Eric interested in?",
  "What is Eric focusing on learning now?",

  // Projects & activities
  "Which project best represents Eric's work?",
  "What was the motivation behind Eric's projects?",
  "What competitions has Eric participated in?",
  "What organizations has Eric led?",

  // Business & finance focus
  "What is Eric's investment experience?",
  "What financial analysis has Eric done?",
  "What is Eric's background in business?",
  "What extracurriculars is Eric part of at NYU?",

  // Practical / conversational
  "What can you help me with?",
  "Where should I start if I want to explore Eric's work?",
  "What should I read to understand Eric's background?",
  "How can I contact Eric?"
];

function getRandomPrompts(prompts: string[], count: number): string[] {
  const shuffled = [...prompts].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export default function ChatPrompts({ onPromptClick }: ChatPromptsProps) {
  const [randomPrompts, setRandomPrompts] = useState<string[]>([]);

  useEffect(() => {
    setRandomPrompts(getRandomPrompts(allPrompts, 3));
  }, []);

  return (
    <div className="mt-2 flex w-full max-w-[200px] flex-col gap-1.5 sm:mt-3 sm:max-w-[250px] sm:gap-2">
      <p className="text-center text-xs text-muted-foreground">Try asking:</p>
      <div className="flex flex-col gap-1 sm:gap-1.5">
        {randomPrompts.map((prompt) => (
          <Button
            key={prompt}
            variant="outline"
            size="sm"
            onClick={() => onPromptClick(prompt)}
            className="h-auto min-h-[32px] w-full justify-start whitespace-normal break-words px-2 py-1.5 text-left text-xs leading-normal sm:min-h-[36px] sm:px-3 sm:py-2"
          >
            <span className="line-clamp-2">{prompt}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}
