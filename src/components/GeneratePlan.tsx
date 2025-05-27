import React from 'react';

type Section = {
  title: string;
  items: string[];
};

type Props = {
  sections: Section[];
};

const GeneratedPlan: React.FC<Props> = ({ sections }) => {
  return (
    <div className="mt-6 space-y-6">
      {sections.map((section, idx) => (
        <div key={idx} className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-bold mb-2">{section.title}</h3>
          <ul className="list-disc list-inside text-gray-800">
            {section.items.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default GeneratedPlan;