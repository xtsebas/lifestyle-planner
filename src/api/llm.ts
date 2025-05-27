import type { PlanPreferences } from '@/components/PlanForm';

export async function generatePlanWithLLM(data: PlanPreferences): Promise<string> {
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

    const payload = {
    model: 'mistral',
    messages: [{ role: 'user', content: prompt }],
    stream: false
    };

    console.log('Enviando a Ollama:', payload);

    const response = await fetch('http://127.0.0.1:11434/api/chat', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(payload),
    });

    const json = await response.json();

    if (!response.ok || !json.message?.content) {
        console.error('Respuesta de Ollama:', json);
        throw new Error('Error generando el plan con Ollama');
    }

    console.log('Respuesta completa de Ollama:', json);

    return json.message.content;
}
