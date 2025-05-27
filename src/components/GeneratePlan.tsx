import React from 'react';

type Section = {
  title: string;
  items: string[];
};

type Props = {
  sections: Section[];
  onAdjust?: (section: Section) => void;
};

const GeneratedPlan: React.FC<Props> = ({ sections, onAdjust }) => {
  return (
    <div className="mt-6 space-y-6">
      {sections.map((section, idx) => (
        <div key={idx} className="bg-white p-4 rounded shadow">
          <h3 className="text-lg text-black font-bold mb-2">{section.title}</h3>
          <ul className="list-disc list-inside text-gray-800">
            {section.items.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>

          {onAdjust && (
            <button
              className="mt-4 text-sm text-blue-600 underline"
              onClick={() => onAdjust(section)}
            >
              Ajustar esta sección
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default GeneratedPlan;