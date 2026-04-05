"use client";

import { type ActivityModuleView, getModuleIcon } from "@/lib/constants/modules";

interface ModuleCardProps {
    module: ActivityModuleView;
    onClick: (module: ActivityModuleView) => void;
}

export function ModuleCard({ module, onClick }: ModuleCardProps) {
    const Icon = getModuleIcon(module.icon);

    return (
        <button
            onClick={() => onClick(module)}
            className="group text-left w-full rounded-2xl border border-zinc-200 bg-white p-5
                 transition-all duration-200 hover:shadow-lg hover:shadow-zinc-200/60
                 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-zinc-300"
            style={{ borderTop: `3px solid ${module.color}` }}
        >
            {/* Header: icon + name */}
            <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                    <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{ background: `${module.color}18` }}
                    >
                        <Icon size={20} style={{ color: module.color }} />
                    </div>
                    <div>
                        <h3 className="font-semibold text-zinc-900 text-base leading-tight">
                            {module.name}
                        </h3>
                        <p className="text-xs text-zinc-400 mt-0.5">
                            {module.description}
                        </p>
                    </div>
                </div>
            </div>

            {/* Footer: frequency badge + field count */}
            <div className="flex items-center gap-2 mt-4">
        <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-zinc-100 text-zinc-500">
          {module.frequency.replace("_", " ").toLowerCase()}
        </span>
                <span className="text-xs text-zinc-400">
          {module.fields.length} field{module.fields.length !== 1 ? "s" : ""}
        </span>
            </div>
        </button>
    );
}
