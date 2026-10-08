import React from 'react';
import { 
  Palette, 
  Type, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  Search, 
  Bookmark, 
  Briefcase,
  Layers,
  ArrowRight,
  ShieldCheck,
  Award
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const DesignSystemView: React.FC = () => {
  const { setViewMode, setCurrentRole, setActiveTab } = useApp();

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Top Banner */}
      <div className="p-6 bg-slate-900 text-white rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-semibold text-indigo-400 mb-1 flex items-center gap-1.5">
            <Palette className="w-4 h-4" />
            <span>PAGE 01  -  Design System & Component Library</span>
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight">
            Design Tokens, Components & Anti-Slop Discipline
          </h1>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Engineered according to Frontend Design Constitution: 60-30-10 color allocation, strict zero-pill metadata discipline, tabular numerals, and single-elevation cards.
          </p>
        </div>
        <button
          onClick={() => setViewMode('live_app')}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 shrink-0"
        >
          <span>Return to Live App</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 1. Color Palette Tokens */}
      <div className="p-6 bg-white border border-slate-200 rounded-xl space-y-4">
        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
          <Palette className="w-4 h-4 text-indigo-600" />
          Color Palette Tokens & Contrast Hierarchy
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
          <div className="p-3 rounded-lg border border-slate-200 bg-white">
            <div className="h-10 rounded bg-slate-900 mb-2"></div>
            <div className="font-bold text-slate-900">Navy / Slate 900</div>
            <div className="text-[10px] text-slate-400">Primary Foundation</div>
          </div>
          <div className="p-3 rounded-lg border border-slate-200 bg-white">
            <div className="h-10 rounded bg-indigo-600 mb-2"></div>
            <div className="font-bold text-slate-900">Indigo 600</div>
            <div className="text-[10px] text-slate-400">AI Intelligence Accent</div>
          </div>
          <div className="p-3 rounded-lg border border-slate-200 bg-white">
            <div className="h-10 rounded bg-emerald-600 mb-2"></div>
            <div className="font-bold text-slate-900">Emerald 600</div>
            <div className="text-[10px] text-slate-400">Success / Shortlisted</div>
          </div>
          <div className="p-3 rounded-lg border border-slate-200 bg-white">
            <div className="h-10 rounded bg-amber-500 mb-2"></div>
            <div className="font-bold text-slate-900">Amber 500</div>
            <div className="text-[10px] text-slate-400">Pending / Advisory</div>
          </div>
          <div className="p-3 rounded-lg border border-slate-200 bg-white">
            <div className="h-10 rounded bg-rose-600 mb-2"></div>
            <div className="font-bold text-slate-900">Rose 600</div>
            <div className="text-[10px] text-slate-400">Skill Gap / Rejected</div>
          </div>
          <div className="p-3 rounded-lg border border-slate-200 bg-white">
            <div className="h-10 rounded bg-slate-100 border border-slate-200 mb-2"></div>
            <div className="font-bold text-slate-900">Slate 50 / 100</div>
            <div className="text-[10px] text-slate-400">60% Neutral Canvas</div>
          </div>
        </div>
      </div>

      {/* 2. Typography Scale */}
      <div className="p-6 bg-white border border-slate-200 rounded-xl space-y-4">
        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
          <Type className="w-4 h-4 text-slate-700" />
          Typography Scale & Tabular Numerals
        </h2>
        <div className="space-y-3 text-slate-800">
          <div className="flex items-baseline justify-between border-b border-slate-100 pb-2">
            <span className="text-2xl font-extrabold tracking-tight">Display Headline (24px - 32px)</span>
            <span className="text-xs text-slate-400">Plus Jakarta Sans · Extrabold 800</span>
          </div>
          <div className="flex items-baseline justify-between border-b border-slate-100 pb-2">
            <span className="text-base font-bold text-slate-900">Section Title & Opportunity Headings (16px)</span>
            <span className="text-xs text-slate-400">Bold 700</span>
          </div>
          <div className="flex items-baseline justify-between border-b border-slate-100 pb-2">
            <span className="text-xs text-slate-600">Standard Body Prose & System Descriptions (12px - 14px)</span>
            <span className="text-xs text-slate-400">Regular 400 · Line-height 1.6</span>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-xs font-mono tabular-nums text-slate-900 font-bold">
              Tabular Figures: 96% · $1,200/mo · 2026-10-12 15:00 GMT+6
            </span>
            <span className="text-xs text-slate-400">JetBrains Mono · font-variant-numeric: tabular-nums</span>
          </div>
        </div>
      </div>

      {/* 3. Button & Interactive States Matrix */}
      <div className="p-6 bg-white border border-slate-200 rounded-xl space-y-4">
        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
          Button & Action States Matrix
        </h2>
        <div className="flex flex-wrap gap-3 items-center text-xs">
          <button className="px-4 py-2 bg-slate-900 text-white font-semibold rounded-lg shadow-xs hover:bg-slate-800">
            Primary Action
          </button>
          <button className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-xs hover:bg-indigo-500 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            AI Accent Action
          </button>
          <button className="px-4 py-2 bg-white text-slate-700 font-semibold border border-slate-200 rounded-lg hover:bg-slate-50">
            Secondary Outline
          </button>
          <button className="px-4 py-2 bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200 rounded-lg hover:bg-emerald-100">
            Shortlist / Success
          </button>
          <button className="px-4 py-2 bg-slate-100 text-slate-400 font-medium rounded-lg cursor-not-allowed">
            Disabled State
          </button>
        </div>
      </div>

      {/* 4. Zero-Pill Metadata vs Functional Controls Demo */}
      <div className="p-6 bg-white border border-slate-200 rounded-xl space-y-4">
        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
          Anti-Slop Metadata Rule (Section 1A Compliance)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-rose-50/50 border border-rose-200 rounded-lg space-y-2">
            <div className="font-bold text-rose-800"> Prohibited: Pill Badge Sandwich</div>
            <div className="flex items-center gap-1 text-[11px]">
              <span className="bg-slate-200 rounded-md px-2 py-0.5">Cloud</span>
              <span className="bg-emerald-100 rounded-md px-2 py-0.5">2026</span>
              <span className="bg-purple-100 rounded-md px-2 py-0.5">94%</span>
            </div>
            <p className="text-[11px] text-rose-700">Candy badge clutter distracts from hierarchy.</p>
          </div>

          <div className="p-4 bg-emerald-50/50 border border-emerald-200 rounded-lg space-y-2">
            <div className="font-bold text-emerald-800"> Enforced: Clean Unboxed Metadata with Separators</div>
            <div className="flex items-center gap-2 text-slate-600 font-medium">
              <span>Cloud Infrastructure</span>
              <span>·</span>
              <span className="tabular-nums">Graduating Fall 2026</span>
              <span>·</span>
              <span className="font-bold text-indigo-700">94% Match</span>
            </div>
            <p className="text-[11px] text-emerald-700">Refined editorial typography with subtle separators.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
