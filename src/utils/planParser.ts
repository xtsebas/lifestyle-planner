type Section = {
  title: string;
  items: string[];
};

export function parseGeneratedPlan(planText: string): Section[] {
  const sections: Section[] = [];
  const lines = planText.split('\n').map(line => line.trim()).filter(Boolean);

  let currentSection: Section | null = null;

  for (const line of lines) {
    if (/^\d+\.\s+/.test(line) || /^Plan\s/i.test(line)) {
      if (currentSection) {
        sections.push(currentSection);
      }
      currentSection = {
        title: line.replace(/^\d+\.\s+/, '').trim(),
        items: [],
      };
    } else if (line.startsWith('-') || line.startsWith('•')) {
      currentSection?.items.push(line.replace(/^[-•]\s*/, ''));
    }
  }

  if (currentSection) {
    sections.push(currentSection);
  }

  return sections;
}