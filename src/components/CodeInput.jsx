import React from 'react';

const CodeInput = ({ code, setCode, language, setLanguage, onAnalyze, isLoading }) => {
    return (
        <div className="flex flex-col h-full p-6 gap-4">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-semibold text-white">Source Input</h2>
                    <p className="text-xs text-textMuted">Analyze time and space complexity in real-time</p>
                </div>

                <div className="flex items-center gap-2 bg-surfaceHighlight p-1 rounded-lg border border-white/5">
                    <span className="text-xs text-textMuted px-2">Language</span>
                    <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="bg-surface text-sm text-white border-none outline-none rounded px-2 py-1 cursor-pointer hover:bg-surfaceHighlight transition-colors"
                    >
                        <option value="python">Python</option>
                        <option value="javascript" disabled>JavaScript (Coming Soon)</option>
                        <option value="cpp" disabled>C++ (Coming Soon)</option>
                    </select>
                </div>
            </div>

            <div className="flex-1 relative group min-h-0">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none rounded-xl" />
                <div className="absolute top-4 right-4 text-xs font-mono text-textMuted opacity-50">MAIN.PY</div>

                {/* Simple Line Numbers (Mock) */}
                <div className="flex h-full font-mono text-sm bg-surface rounded-xl border border-surfaceHighlight shadow-inner overflow-hidden">
                    <div className="w-12 bg-surfaceHighlight/30 text-right pr-3 py-4 text-textMuted select-none border-r border-white/5 opacity-50">
                        {[...Array(20)].map((_, i) => (
                            <div key={i} className="leading-6">{i + 1}</div>
                        ))}
                    </div>
                    <textarea
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        className="flex-1 bg-transparent border-none outline-none resize-none p-4 text-textMain leading-6 selection:bg-primary/30 w-full"
                        spellCheck="false"
                        placeholder="# Paste your code here..."
                    />
                </div>
            </div>

            <button
                onClick={onAnalyze}
                disabled={isLoading}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-primary to-blue-600 text-white font-bold shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
                {isLoading ? (
                    <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Analyzing...
                    </>
                ) : (
                    <>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                        Check Complexity
                    </>
                )}
            </button>
        </div>
    );
};

export default CodeInput;
