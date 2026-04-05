"use client";

import { X } from "lucide-react";
import { type ActivityModuleView, getModuleIcon } from "@/lib/constants/modules";

interface ModuleDetailModalProps {
    module: ActivityModuleView | null;
    onClose: () => void;
}

export function ModuleDetailModal({ module, onClose }: ModuleDetailModalProps) {
    if (!module) return null;

    const Icon = getModuleIcon(module.icon);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/30 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Panel */}
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
                <div className="p-6" style={{ borderTop: `4px solid ${module.color}` }}>
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div
                                className="w-12 h-12 rounded-xl flex items-center justify-center"
                                style={{ background: `${module.color}18` }}
                            >
                                <Icon size={22} style={{ color: module.color }} />
                            </div>
                            <div>
                                <h3 className="font-semibold text-zinc-900 text-lg">
                                    {module.name}
                                </h3>
                                <p className="text-xs text-zinc-400">{module.description}</p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-1.5 rounded-lg hover:bg-zinc-100"
                        >
                            <X size={16} className="text-zinc-400" />
                        </button>
                    </div>

                    {/* Frequency badge */}
                    <div className="mb-4">
            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-zinc-100 text-zinc-500">
              {module.frequency.replace("_", " ").toLowerCase()}
            </span>
                    </div>

                    {/* Field definitions list */}
                    <div>
                        <p className="text-xs font-medium text-zinc-400 mb-2">
                            Tracking fields
                        </p>
                        <div className="space-y-1.5">
                            {module.fields.map((f, i) => (
                                <div
                                    key={i}
                                    className="flex items-center justify-between px-3 py-2 rounded-lg bg-zinc-50"
                                >
                                    <span className="text-sm text-zinc-700">{f.label}</span>
                                    <span className="text-xs text-zinc-400 font-medium">
                    {f.type.toLowerCase()}
                  </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 mt-6">
                        <button className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium bg-zinc-900 text-white hover:bg-zinc-800 transition-colors">
                            Log Session
                        </button>
                        <button className="px-4 py-2.5 rounded-xl text-sm font-medium border border-zinc-200 text-zinc-500 hover:bg-zinc-50 transition-colors">
                            Edit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
