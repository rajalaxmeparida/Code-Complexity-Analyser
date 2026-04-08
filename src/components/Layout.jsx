import React from 'react';

const Layout = ({ children }) => {
    return (
        <div className="flex flex-col h-screen w-full bg-background text-textMain overflow-hidden font-sans">
            {/* Header */}
            <header className="flex items-center justify-between px-6 py-4 border-b border-surfaceHighlight bg-surface/50 backdrop-blur-md z-10">
                <div className="flex items-center gap-3">
                    {/* Simple logo icon */}
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/20">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
                    </div>
                    <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-textMuted tracking-tight">
                        Complexity<span className="text-primary">Analyzer</span>
                    </h1>
                </div>
                <div className="text-xs font-mono text-textMuted border border-surfaceHighlight px-2 py-1 rounded bg-surface">
                    v1.0.2 MVP
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto md:overflow-hidden relative">
                <div className="absolute inset-0 bg-blue-500/5 blur-[100px] pointer-events-none" />
                {children}
            </main>

            {/* Footer / Status Bar */}
            <footer className="h-8 border-t border-surfaceHighlight bg-surface flex items-center justify-between px-4 text-[10px] uppercase tracking-wider text-textMuted font-mono">

            </footer>
        </div>
    );
};

export default Layout;
