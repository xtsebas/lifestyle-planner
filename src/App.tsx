import { useState } from 'react';
import PlanForm from '@/components/PlanForm';
import type { PlanPreferences } from '@/components/PlanForm';
import { generatePlanWithLLM } from '@/api/llm';

const Home = () => {
  const [generatedPlan, setGeneratedPlan] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (data: PlanPreferences) => {
    setLoading(true);
    const plan = await generatePlanWithLLM(data);
    setGeneratedPlan(plan);
    setLoading(false);
  };

  return (
    <div className='flex items-center justify-center min-h-screen'>
      <div className="container p-4">
        <PlanForm onSubmit={handleFormSubmit} />

        {loading && <p className="flex items-center justify-center mt-4 text-blue-600">Generando plan...</p>}

        {generatedPlan && (
          <div className="mt-6 bg-gray-100 p-4 rounded">
            <h2 className="text-xl font-semibold mb-2">Tu plan de vida</h2>
            <pre className="whitespace-pre-wrap text-black">{generatedPlan}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
