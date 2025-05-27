import type { PlanPreferences } from '@/components/PlanForm';

export async function generatePlanWithLLM(data: PlanPreferences): Promise<string> {
  // Esta función puede ser reemplazada por una llamada real a un modelo (como DeepSeek)
  // Por ahora, retornamos una respuesta mock simulando la de un LLM
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`
        Plan Profesional:
        - Trabajar como desarrollador full-stack especializado en IA.
        - Aprender arquitectura de sistemas complejos.

        Plan de Entrenamiento:
        - Lunes y jueves: Calistenia.
        - Martes y viernes: Cardio suave + movilidad.

        Plan de Hobbies:
        - Lectura de ciencia ficción, fotografía, ajedrez.

        Plan de Nutrición:
        - Dieta basada en plantas, alta en proteínas, 3 comidas y 2 snacks.
      `);
    }, 1000);
  });
}
