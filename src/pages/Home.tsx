import { useState, useEffect } from 'react';
import PlanForm from '@/components/PlanForm';
import type { PlanPreferences } from '@/components/PlanForm';
import { generatePlanWithLLM } from '@/api/llm';
import GeneratedPlan from '@/components/GeneratePlan';
import { parseGeneratedPlan } from '@/utils/planParser';
import FeedbackForm from '@/components/FeedbackForm';

type Section = {
  title: string;
  items: string[];
};

type ConversationEntry = {
  userPrompt: string;
  modelResponse: string;
  timestamp: string;
};

const Home = () => {
  const [lastPrompt, setLastPrompt] = useState('');
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(false);
  const [rawPlan, setRawPlan] = useState<string | null>(null);
  const [sectionToAdjust, setSectionToAdjust] = useState<Section | null>(null);
  const [conversationHistory, setConversationHistory] = useState<ConversationEntry[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  const handleFormSubmit = async (data: PlanPreferences) => {
    setLoading(true);

    const prompt = `
        Eres un asistente de estilo de vida. Crea un plan con las siguientes secciones:
        1. Plan Profesional
        2. Plan de Entrenamiento
        3. Plan de Hobbies
        4. Plan de Nutrición

        Datos:
        - Profesional: ${data.profesional}
        - Entrenamiento: ${data.entrenamiento}
        - Hobbys: ${data.hobbys}
        - Nutrición: ${data.nutricion}
        `;

    setLastPrompt(prompt);

    const planText = await generatePlanWithLLM(data);
    setRawPlan(planText);
    const parsed = parseGeneratedPlan(planText);
    setSections(parsed);
    setLoading(false);
  };

  useEffect(() => {
    if (rawPlan && lastPrompt) {
      const stored = JSON.parse(localStorage.getItem('conversationHistory') || '[]');
      const updated = [...stored, {
        userPrompt: lastPrompt,
        modelResponse: rawPlan,
        timestamp: new Date().toISOString(),
      }];
      localStorage.setItem('conversationHistory', JSON.stringify(updated));
      setConversationHistory(updated);
    }
  }, [rawPlan]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('conversationHistory') || '[]');
    setConversationHistory(stored);
  }, []);

  return (
    <div className='flex items-center justify-center min-h-screen'>
      <div className="container p-4">
        <PlanForm onSubmit={handleFormSubmit} />

        {loading && <p className="text-blue-600 text-center mt-4">Generando plan...</p>}

        {!loading && rawPlan && (
          <>
            <h2 className="text-xl font-semibold mt-6 mb-2">Tu plan de vida</h2>

            {sections.length > 0 ? (
              <>
                <GeneratedPlan sections={sections} onAdjust={setSectionToAdjust} />

                {sectionToAdjust && (
                  <FeedbackForm
                    sectionTitle={sectionToAdjust.title}
                    originalContent={sectionToAdjust.items}
                    onSubmit={async (feedback) => {
                      setLoading(true);
                      const updated = await generatePlanWithLLM({
                        profesional: '',
                        entrenamiento: '',
                        hobbys: '',
                        nutricion: '',
                        adjustment: {
                          section: sectionToAdjust.title,
                          original: sectionToAdjust.items,
                          suggestion: feedback,
                        },
                      });

                      setSections(prev =>
                        prev.map(section =>
                          section.title === sectionToAdjust.title
                            ? {
                                ...section,
                                items: updated
                                  .split('\n')
                                  .map(line => line.replace(/^[-•]\s*/, '').trim())
                                  .filter(Boolean),
                              }
                            : section
                        )
                      );

                      setRawPlan(updated); // Para actualizar historial
                      setLastPrompt(`Ajustar sección "${sectionToAdjust.title}" con sugerencia: ${feedback}`);
                      setSectionToAdjust(null);
                      setLoading(false);
                    }}
                  />
                )}
              </>
            ) : (
              <div className="bg-gray-800 text-white p-4 rounded mt-4">
                <h3 className="font-semibold mb-2">Respuesta completa (sin formato):</h3>
                <pre className="whitespace-pre-wrap">{rawPlan}</pre>
              </div>
            )}

            <button
              onClick={() => setShowHistory(!showHistory)}
              className="mt-6 text-blue-600 underline cursor-pointer"
            >
              {showHistory ? 'Ocultar historial de conversación' : 'Ver historial de conversación'}
            </button>

            {showHistory && (
              <div className="bg-gray-100 p-4 rounded mt-4 space-y-4">
                <h3 className="text-lg font-semibold mb-2">Historial de conversación</h3>
                {conversationHistory.length === 0 ? (
                  <p className="text-sm text-gray-600">Aún no hay conversaciones guardadas.</p>
                ) : (
                  conversationHistory.map((entry, idx) => (
                    <div key={idx} className="p-3 bg-white rounded shadow space-y-2">
                      <p className="text-xs text-gray-500">{new Date(entry.timestamp).toLocaleString()}</p>
                      <div>
                        <p className="font-semibold text-sm text-gray-700">🧑 Usuario:</p>
                        <pre className="whitespace-pre-wrap text-sm text-gray-800">{entry.userPrompt}</pre>
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-gray-700">🤖 LLM:</p>
                        <pre className="whitespace-pre-wrap text-sm text-gray-800">{entry.modelResponse}</pre>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Home;