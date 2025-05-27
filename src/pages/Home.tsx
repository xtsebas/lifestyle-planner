import { useState } from 'react';
import PlanForm from '@/components/PlanForm';
import type { PlanPreferences } from '@/components/PlanForm';
import { generatePlanWithLLM } from '@/api/llm';
import GeneratedPlan from '@/components/GeneratePlan';
import { parseGeneratedPlan } from '@/utils/planParser';

type Section = {
  title: string;
  items: string[];
};


const Home = () => {
    const [sections, setSections] = useState<Section[]>([]);
    const [loading, setLoading] = useState(false);
    const [rawPlan, setRawPlan] = useState<string | null>(null);

    const handleFormSubmit = async (data: PlanPreferences) => {
        setLoading(true);
        const planText = await generatePlanWithLLM(data);
        setRawPlan(planText); 

        const parsed = parseGeneratedPlan(planText);
        setSections(parsed);
        setLoading(false);
    };

    return (
        <div className='flex items-center justify-center min-h-screen'>
            <div className="container p-4">
                <PlanForm onSubmit={handleFormSubmit} />

                {loading && <p className="text-blue-600 text-center mt-4">Generando plan...</p>}

                {!loading && rawPlan && (
                    <>
                        <h2 className="text-xl font-semibold mt-6 mb-2">Tu plan de vida</h2>

                        {sections.length > 0 ? (
                        <GeneratedPlan sections={sections} />
                        ) : (
                        <div className="bg-gray-800 text-white p-4 rounded mt-4">
                            <h3 className="font-semibold mb-2">Respuesta completa (sin formato):</h3>
                            <pre className="whitespace-pre-wrap">{rawPlan}</pre>
                        </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Home;