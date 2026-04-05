"use client";

import { useState } from "react";
import { Plus, X, GripVertical, Trash2 } from "lucide-react";
import {
    type ModuleFormData,
    type FrequencyType,
    type FieldType,
    MODULE_ICONS,
    MODULE_COLORS,
    FREQUENCIES,
    FIELD_TYPES,
    getModuleIcon,
} from "@/lib/constants/modules";

interface CreateModuleModalProps {
    open: boolean;
    onClose: () => void;
    onSave: (data: ModuleFormData) => void;
}

export function CreateModuleModal({ open, onClose, onSave }: CreateModuleModalProps) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [selectedIcon, setSelectedIcon] = useState("Star");
    const [selectedColor, setSelectedColor] = useState("#a78bfa");
    const [frequency, setFrequency] = useState<FrequencyType>("DAILY");
    const [fields, setFields] = useState<{ label: string; type: FieldType }[]>([
        { label: "", type: "TEXT" },
    ]);
    const [showIconPicker, setShowIconPicker] = useState(false);

    if (!open) return null;

    const addField = () => setFields([...fields, { label: "", type: "TEXT" }]);

    const removeField = (index: number) =>
        setFields(fields.filter((_, i) => i !== index));

    const updateField = (index: number, key: "label" | "type", value: string) => {
        const updated = [...fields];
        updated[index] = { ...updated[index], [key]: value };
        setFields(updated);
    };

    const resetForm = () => {
        setName("");
        setDescription("");
        setSelectedIcon("Star");
        setSelectedColor("#a78bfa");
        setFrequency("DAILY");
        setFields([{ label: "", type: "TEXT" }]);
        setShowIconPicker(false);
    };

    const handleSave = () => {
        if (!name.trim()) return;

        onSave({
            name,
            description,
            icon: selectedIcon,
            color: selectedColor,
            frequency,
            fields: fields.filter((f) => f.label.trim()),
        });

        resetForm();
        onClose();
    };

    const handleClose = () => {
        resetForm();
        onClose();
    };

    const SelectedIconComp = getModuleIcon(selectedIcon);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={handleClose}
            />

            {/* Modal panel */}
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
                {/* ── Header ── */}
                <div className="flex items-center justify-between p-6 pb-4 border-b border-zinc-100">
                    <h2 className="text-lg font-semibold text-zinc-900">Create Module</h2>
                    <button
                        onClick={handleClose}
                        className="p-1.5 rounded-lg hover:bg-zinc-100 transition-colors"
                    >
                        <X size={18} className="text-zinc-400" />
                    </button>
                </div>

                {/* ── Body ── */}
                <div className="p-6 space-y-5">
                    {/* Icon preview + Name */}
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setShowIconPicker(!showIconPicker)}
                            className="w-14 h-14 rounded-2xl flex items-center justify-center
                         border-2 border-dashed hover:border-zinc-300 transition-colors"
                            style={{
                                background: `${selectedColor}15`,
                                borderColor: `${selectedColor}40`,
                            }}
                        >
                            <SelectedIconComp size={24} style={{ color: selectedColor }} />
                        </button>
                        <div className="flex-1">
                            <label className="block text-xs font-medium text-zinc-500 mb-1.5">
                                Module Name
                            </label>
                            <input
                                type="text"
                                placeholder="e.g. Guitar Practice"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200
                           text-sm text-zinc-900 placeholder:text-zinc-300
                           focus:outline-none focus:ring-2 focus:ring-zinc-200
                           focus:border-zinc-300 transition-all"
                            />
                        </div>
                    </div>

                    {/* Icon picker grid (toggled) */}
                    {showIconPicker && (
                        <div className="p-3 rounded-xl border border-zinc-200 bg-zinc-50">
                            <p className="text-xs font-medium text-zinc-400 mb-2">Choose an icon</p>
                            <div className="grid grid-cols-8 gap-1.5">
                                {MODULE_ICONS.map(({ name: iName, icon: IComp }) => (
                                    <button
                                        key={iName}
                                        onClick={() => {
                                            setSelectedIcon(iName);
                                            setShowIconPicker(false);
                                        }}
                                        className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all
                      ${selectedIcon === iName
                                            ? "bg-white shadow-sm ring-1 ring-zinc-200"
                                            : "hover:bg-white/60"
                                        }`}
                                    >
                                        <IComp
                                            size={16}
                                            className={selectedIcon === iName ? "text-zinc-900" : "text-zinc-400"}
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Description */}
                    <div>
                        <label className="block text-xs font-medium text-zinc-500 mb-1.5">
                            Description <span className="text-zinc-300">(optional)</span>
                        </label>
                        <input
                            type="text"
                            placeholder="What are you tracking?"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200
                         text-sm text-zinc-900 placeholder:text-zinc-300
                         focus:outline-none focus:ring-2 focus:ring-zinc-200
                         focus:border-zinc-300 transition-all"
                        />
                    </div>

                    {/* Color picker */}
                    <div>
                        <label className="block text-xs font-medium text-zinc-500 mb-2">Color</label>
                        <div className="flex flex-wrap gap-2">
                            {MODULE_COLORS.map((c) => (
                                <button
                                    key={c}
                                    onClick={() => setSelectedColor(c)}
                                    className={`w-7 h-7 rounded-full transition-all
                    ${selectedColor === c
                                        ? "ring-2 ring-offset-2 ring-zinc-400 scale-110"
                                        : "hover:scale-110"
                                    }`}
                                    style={{ background: c }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Frequency selector */}
                    <div>
                        <label className="block text-xs font-medium text-zinc-500 mb-2">Frequency</label>
                        <div className="flex flex-wrap gap-1.5">
                            {FREQUENCIES.map((f) => (
                                <button
                                    key={f}
                                    onClick={() => setFrequency(f)}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all
                    ${frequency === f
                                        ? "bg-zinc-900 text-white"
                                        : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200"
                                    }`}
                                >
                                    {f.replace("_", " ").toLowerCase()}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Field definitions */}
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label className="block text-xs font-medium text-zinc-500">
                                Tracking Fields
                            </label>
                            <button
                                onClick={addField}
                                className="text-xs text-zinc-400 hover:text-zinc-600 font-medium
                           flex items-center gap-1 transition-colors"
                            >
                                <Plus size={12} /> Add field
                            </button>
                        </div>
                        <div className="space-y-2">
                            {fields.map((field, i) => (
                                <div key={i} className="flex items-center gap-2">
                                    <GripVertical size={14} className="text-zinc-200 flex-shrink-0" />
                                    <input
                                        type="text"
                                        placeholder="Field label"
                                        value={field.label}
                                        onChange={(e) => updateField(i, "label", e.target.value)}
                                        className="flex-1 px-3 py-2 rounded-lg border border-zinc-200
                               text-sm text-zinc-900 placeholder:text-zinc-300
                               focus:outline-none focus:ring-2 focus:ring-zinc-200 transition-all"
                                    />
                                    <select
                                        value={field.type}
                                        onChange={(e) => updateField(i, "type", e.target.value)}
                                        className="px-2.5 py-2 rounded-lg border border-zinc-200
                               text-xs text-zinc-600 bg-white
                               focus:outline-none focus:ring-2 focus:ring-zinc-200 transition-all"
                                    >
                                        {FIELD_TYPES.map((t) => (
                                            <option key={t} value={t}>
                                                {t.toLowerCase()}
                                            </option>
                                        ))}
                                    </select>
                                    {fields.length > 1 && (
                                        <button
                                            onClick={() => removeField(i)}
                                            className="p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                                        >
                                            <Trash2 size={14} className="text-zinc-300 hover:text-red-400" />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── Footer ── */}
                <div className="flex items-center justify-end gap-2 p-6 pt-4 border-t border-zinc-100">
                    <button
                        onClick={handleClose}
                        className="px-4 py-2.5 rounded-xl text-sm font-medium text-zinc-500
                       hover:bg-zinc-100 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={!name.trim()}
                        className="px-5 py-2.5 rounded-xl text-sm font-medium bg-zinc-900 text-white
                       hover:bg-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed
                       transition-colors"
                    >
                        Create Module
                    </button>
                </div>
            </div>
        </div>
    );
}
