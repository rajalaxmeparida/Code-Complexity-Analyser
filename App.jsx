import React, { useState } from 'react';
import Layout from './components/Layout';
import CodeInput from './components/CodeInput';
import ResultsPanel from './components/ResultsPanel';

function App() {
  const [code, setCode] = useState(`def find_duplicates(arr):
    n = len(arr)
    duplicates = []
    for i in range(n):
        for j in range(i + 1, n):
            if arr[i] == arr[j] and arr[i] not in duplicates:
                duplicates.append(arr[i])
    return duplicates
# Analyze complexity for the above logic`);
  const [language, setLanguage] = useState('python');
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalyze = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code, language }),
      });

      const data = await response.json();
      if (response.ok) {
        setResults(data);
      } else {
        console.error("Analysis failed:", data);
        // Could handle error state here
      }
    } catch (error) {
      console.error("Error connecting to backend:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="flex h-full">
        {/* Left Panel: 50% width on large screens */}
        <div className="w-1/2 border-r border-surfaceHighlight bg-background/50">
          <CodeInput
            code={code}
            setCode={setCode}
            language={language}
            setLanguage={setLanguage}
            onAnalyze={handleAnalyze}
            isLoading={isLoading}
          />
        </div>

        {/* Right Panel: 50% width */}
        <div className="w-1/2 bg-surface/30">
          <ResultsPanel results={results} />
        </div>
      </div>
    </Layout>
  );
}

export default App;
