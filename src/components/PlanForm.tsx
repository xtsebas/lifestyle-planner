import React from 'react';
import { useForm } from 'react-hook-form';

export type PlanPreferences = {
    profesional: string;
    entrenamiento: string;
    hobbys: string;
    nutricion: string;
    adjustment?: {
        section: string;
        original: string[];
        suggestion: string;
    };
};

type Props = {
    onSubmit: (data: PlanPreferences) => void;
};

const PlanForm: React.FC<Props> = ({ onSubmit }) => {
    const { register, handleSubmit } = useForm<PlanPreferences>();

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4 max-w-xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4">Crea tu plan de vida</h2>

            <div>
                <label className="block font-medium">¿Cuáles son tus metas profesionales?</label>
                <textarea {...register('profesional')} className="w-full border p-2 rounded" rows={3} />
            </div>

            <div>
                <label className="block font-medium">¿Qué tipo de entrenamiento prefieres?</label>
                <textarea {...register('entrenamiento')} className="w-full border p-2 rounded" rows={2} />
            </div>

            <div>
                <label className="block font-medium">¿Qué hobbies te interesan?</label>
                <textarea {...register('hobbys')} className="w-full border p-2 rounded" rows={2} />
            </div>

            <div>
                <label className="block font-medium">¿Tienes alguna necesidad o preferencia nutricional?</label>
                <textarea {...register('nutricion')} className="w-full border p-2 rounded" rows={2} />
            </div>

            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Generar Plan
            </button>
            
        </form>
    );
};

export default PlanForm;
