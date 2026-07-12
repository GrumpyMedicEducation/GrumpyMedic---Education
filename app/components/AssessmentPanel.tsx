interface AssessmentPanelProps {
    findings: string[];
  }
  
  export default function AssessmentPanel({
    findings,
  }: AssessmentPanelProps) {
    return (
      <div className="rounded-xl border border-blue-700 bg-zinc-900 p-6 shadow-lg">
  
        <h2 className="mb-5 text-2xl font-bold text-blue-400">
          Assessment Findings
        </h2>
  
        <div className="space-y-3">
  
          {findings.map((finding, index) => (
            <div
              key={index}
              className="rounded-lg bg-black p-4 border border-zinc-700"
            >
              {finding}
            </div>
          ))}
  
        </div>
  
      </div>
    );
  }