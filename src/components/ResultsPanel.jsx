import React from 'react';

const ResultsPanel = ({ results }) => {
    if (!results) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-textMuted gap-4 opacity-50">
                <div className="w-16 h-16 rounded-2xl bg-surfaceHighlight flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                </div>
                <p>Waiting for code input...</p>
            </div>
        )
    }

    const { complexity, complexity_label, metrics, summary } = results;

    return (
        <div className="h-full p-6 overflow-y-auto">
            <div className="mb-6">
                <h2 className="text-lg font-semibold text-white">Analysis Results</h2>
                <p className="text-xs text-textMuted">Structural metrics and efficiency estimation</p>
            </div>

            {/* Main Complexity Card */}
            <div className="relative mb-6 p-8 rounded-2xl bg-surface border border-surfaceHighlight flex flex-col items-center justify-center overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
                <div className="z-10 text-center">
                    <h3 className="text-xs uppercase tracking-widest text-textMuted mb-2">Estimated Time Complexity</h3>
                    <div className="text-6xl font-black text-white mb-2 tracking-tighter drop-shadow-2xl">
                        {complexity || "N/A"}
                    </div>
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${getComplexityColor(complexity)} bg-opacity-20 border border-current`}>
                        {complexity_label}
                    </div>
                </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
                <MetricCard
                    title="Loop Count"
                    value={metrics?.loop_count + " Identified"}
                    barValue={Math.min(100, (metrics?.loop_count || 0) * 20)}
                    color="bg-blue-500"
                />
                <MetricCard
                    title="Nesting Depth"
                    value={"Depth: " + (metrics?.nesting_depth || 0)}
                    barValue={Math.min(100, (metrics?.nesting_depth || 0) * 33)}
                    color="bg-yellow-500"
                />
                <MetricCard
                    title="Recursion"
                    value={metrics?.recursion || "None"}
                    highlight={metrics?.recursion !== "None Detected"}
                    color="bg-red-500"
                />
                <MetricCard
                    title="Maintainability"
                    value={metrics?.maintainability_index || "N/A"}
                    subtext={`Rank: ${metrics?.maintainability_rank || "?"}`}
                    barValue={metrics?.maintainability_index || 0}
                    color="bg-green-500"
                />
            </div>

            {/* Raw Metrics & Complexity */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-xl bg-surface border border-surfaceHighlight p-5 h-full">
                    <h4 className="font-semibold text-white text-sm mb-4 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                        Code Statistics
                    </h4>
                    <div className="grid grid-cols-2 gap-4 text-center">
                        <div className="p-3 bg-surfaceHighlight/50 rounded-lg flex flex-col items-center justify-center">
                            <div className="text-2xl font-bold text-white">{metrics?.loc || 0}</div>
                            <div className="text-[10px] text-textMuted uppercase tracking-wider">Lines (LOC)</div>
                        </div>
                        <div className="p-3 bg-surfaceHighlight/50 rounded-lg flex flex-col items-center justify-center">
                            <div className="text-2xl font-bold text-white">{metrics?.lloc || 0}</div>
                            <div className="text-[10px] text-textMuted uppercase tracking-wider">Logical (LLOC)</div>
                        </div>
                        <div className="p-3 bg-surfaceHighlight/50 rounded-lg flex flex-col items-center justify-center">
                            <div className="text-2xl font-bold text-white">{metrics?.sloc || 0}</div>
                            <div className="text-[10px] text-textMuted uppercase tracking-wider">Source (SLOC)</div>
                        </div>
                        <div className="p-3 bg-surfaceHighlight/50 rounded-lg flex flex-col items-center justify-center">
                            <div className="text-2xl font-bold text-white">{metrics?.comments || 0}</div>
                            <div className="text-[10px] text-textMuted uppercase tracking-wider">Comments</div>
                        </div>
                    </div>
                </div>

                {/* Cyclomatic Complexity Details */}
                <div className="rounded-xl bg-surface border border-surfaceHighlight p-5 h-full">
                    <h4 className="font-semibold text-white text-sm mb-4 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
                        Complexity Breakdown
                    </h4>
                    <div className="space-y-2 max-h-48 overflow-y-auto pr-1 custom-scrollbar">
                        {metrics?.cyclomatic_complexity && metrics.cyclomatic_complexity.length > 0 ? (
                            metrics.cyclomatic_complexity.map((func, i) => (
                                <div key={i} className="flex items-center justify-between p-2 bg-surfaceHighlight/20 rounded-lg border border-white/5 hover:bg-surfaceHighlight/40 transition-colors">
                                    <div className="font-mono text-xs text-blue-400 truncate max-w-[120px]" title={func.name}>{func.name}()</div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs text-textMuted">Comp: <b className="text-white">{func.complexity}</b></span>
                                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded bg-surface/50 border ${getRankColor(func.rank)}`}>
                                            {func.rank}
                                        </span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-xs text-textMuted italic text-center py-4">No functions detected.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const MetricCard = ({ title, value, subtext, barValue, color, highlight }) => (
    <div className="bg-surface border border-surfaceHighlight rounded-xl p-4 flex flex-col justify-between hover:bg-surfaceHighlight/30 transition-colors">
        <div className="flex items-center gap-2 mb-2">
            {/* Simple icon placeholder */}
            <div className={`w-1.5 h-1.5 rounded-full ${color || 'bg-textMuted'}`}></div>
            <span className="text-[10px] uppercase text-textMuted font-bold tracking-wider">{title}</span>
        </div>
        <div className={`text-xl font-bold ${highlight ? 'text-red-400' : 'text-white'}`}>{value}</div>
        {subtext && <div className="text-[10px] text-yellow-500 mt-1">{subtext}</div>}

        {barValue !== undefined && (
            <div className="w-full h-1 bg-surfaceHighlight rounded-full mt-3 overflow-hidden">
                <div className={`h-full ${color || 'bg-primary'}`} style={{ width: `${barValue}%` }}></div>
            </div>
        )}
    </div>
)



function getRankColor(rank) {
    switch (rank) {
        case 'A': return "text-green-400 border-green-400/30";
        case 'B': return "text-green-300 border-green-300/30";
        case 'C': return "text-yellow-400 border-yellow-400/30";
        case 'D': return "text-orange-400 border-orange-400/30";
        default: return "text-red-400 border-red-400/30";
    }
}

function getComplexityColor(val) {
    if (!val) return "";
    if (val.includes("O(1)") || val.includes("O(log")) return "text-green-400 border-green-400";
    if (val.includes("O(n)")) return "text-blue-400 border-blue-400";
    if (val.includes("O(n")) return "text-yellow-400 border-yellow-400"; // O(n^2) etc
    return "text-red-400 border-red-400";
}

export default ResultsPanel;
