interface TreatmentPanelProps {
    onTreatment: (treatment: string) => void;
  }
  
  const treatments = [
    "Apply Oxygen",
    "CPAP",
    "Nitroglycerin",
    "Aspirin",
    "12 Lead ECG",
    "IV Access",
    "Nebulizer",
    "Reassess",
    "Transport",
  ];
  
  export default function TreatmentPanel({
    onTreatment,
  }: TreatmentPanelProps) {
    return (
      <div className="rounded-xl border border-red-700 bg-zinc-900 p-6 shadow-lg">
  
        <h2 className="mb-5 text-2xl font-bold text-red-500">
          Treatment Panel
        </h2>
  
        <div className="grid gap-3">
  
          {treatments.map((treatment) => (
            <button
              key={treatment}
              onClick={() => onTreatment(treatment)}
              className="rounded-lg bg-red-600 px-4 py-3 font-bold transition hover:bg-red-500"
            >
              {treatment}
            </button>
          ))}
  
        </div>
  
      </div>
    );
  }