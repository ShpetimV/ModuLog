"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { type ActivityModuleView, type ModuleFormData } from "@/lib/constants/modules";
import { ModuleCard } from "components/module-card";
import { EmptyState } from "components/empty-state";
import { CreateModuleModal } from "components/create-module-modal";
import { ModuleDetailModal } from "components/module-detail-modal";

// TODO: Replace with real API call to GET /api/activity-modules
const SAMPLE_MODULES: ActivityModuleView[] = [
    {
        id: 1,
        name: "Guitar Practice",
        description: "Daily guitar sessions",
        icon: "Guitar",
        color: "#a78bfa",
        frequency: "DAILY",
        fields: [
            { label: "BPM", type: "NUMBER" },
            { label: "Song", type: "TEXT" },
            { label: "Used Metronome", type: "BOOLEAN" },
        ],
    },
    {
        id: 2,
        name: "Gym Session",
        description: "Strength training",
        icon: "Dumbbell",
        color: "#2dd4bf",
        frequency: "SPECIFIC_DAYS",
        fields: [
            { label: "Sets", type: "NUMBER" },
            { label: "Reps", type: "NUMBER" },
            { label: "Muscle Group", type: "TEXT" },
        ],
    },
    {
        id: 3,
        name: "Reading",
        description: "Book tracking",
        icon: "BookOpen",
        color: "#fbbf24",
        frequency: "DAILY",
        fields: [
            { label: "Pages Read", type: "NUMBER" },
            { label: "Book Title", type: "TEXT" },
        ],
    },
];

export default function ModulesPage() {
    const [modules, setModules] = useState<ActivityModuleView[]>(SAMPLE_MODULES);
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [selectedModule, setSelectedModule] = useState<ActivityModuleView | null>(null);

    const handleCreateModule = (data: ModuleFormData) => {
        // TODO: Replace with POST /api/activity-modules
        const newModule: ActivityModuleView = { ...data, id: Date.now() };
        setModules((prev) => [...prev, newModule]);
    };

    return (
        <>
            {/* Page header */}
            <div className="flex items-center justify-between mb-8 p-6">
                <div>
                    <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">
                        Modules
                    </h1>
                    <p className="text-sm text-zinc-400 mt-1">
                        Manage your activity tracking modules
                    </p>
                </div>
                <button
                    onClick={() => setCreateModalOpen(true)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl
                     bg-zinc-900 text-white text-sm font-medium
                     hover:bg-zinc-800 transition-colors shadow-sm"
                >
                    <Plus size={16} /> New Module
                </button>
            </div>

            {/* Grid or empty state */}
            {modules.length === 0 ? (
                <EmptyState onCreateClick={() => setCreateModalOpen(true)} />
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
                    {modules.map((mod) => (
                        <ModuleCard
                            key={mod.id}
                            module={mod}
                            onClick={setSelectedModule}
                        />
                    ))}
                </div>
            )}

            {/* Modals */}
            <CreateModuleModal
                open={createModalOpen}
                onClose={() => setCreateModalOpen(false)}
                onSave={handleCreateModule}
            />

            <ModuleDetailModal
                module={selectedModule}
                onClose={() => setSelectedModule(null)}
            />
        </>
    );
}
