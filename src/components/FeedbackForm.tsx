import { useState } from 'react';

type Props = {
  sectionTitle: string;
  originalContent: string[];
  onSubmit: (feedback: string) => void;
};

const FeedbackForm: React.FC<Props> = ({ sectionTitle, originalContent, onSubmit }) => {
  const [feedback, setFeedback] = useState('');

  return (
    <div className="bg-white rounded p-4 mt-6 shadow">
      <h3 className="font-bold text-black text-lg mb-2">Ajustar sección: {sectionTitle}</h3>

      <p className="mb-2 text-sm text-gray-600">Contenido actual:</p>
      <ul className="list-disc list-inside text-sm mb-4 text-gray-800">
        {originalContent.map((item, idx) => <li key={idx}>{item}</li>)}
      </ul>

      <textarea
        placeholder="¿Qué te gustaría cambiar o mejorar en esta sección?"
        className="w-full border rounded p-2 mb-2 text-black"
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        rows={4}
      />

      <button
        onClick={() => onSubmit(feedback)}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Enviar feedback
      </button>
    </div>
  );
};

export default FeedbackForm;
