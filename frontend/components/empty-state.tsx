"use client";

import { Plus, Zap } from "lucide-react";

interface EmptyStateProps {
    onCreateClick: () => void;
}

export function EmptyState({ onCreateClick }: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center py-24 px-8">
            <div className="w-16 h-16 rounded-2xl bg-zinc-100 flex items-center justify-center mb-5">
                <Zap size={28} className="text-zinc-300" />
            </div>
            <h3 className="text-lg font-semibold text-zinc-800 mb-1">
                No modules yet
            </h3>
            <p className="text-sm text-zinc-400 mb-6 text-center max-w-xs">
                Create your first activity module to start tracking what matters to you.
            </p>
            <button
                onClick={onCreateClick}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl
                   bg-zinc-900 text-white text-sm font-medium
                   hover:bg-zinc-800 transition-colors"
            >
                <Plus size={16} /> Create Module
            </button>
        </div>
    );
}
