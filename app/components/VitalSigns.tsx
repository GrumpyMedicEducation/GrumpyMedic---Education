interface VitalSignsProps {
    heartRate: number;
    respiratoryRate: number;
    bloodPressure: string;
    spo2: number;
    temperature: number;
    gcs: number;
  }
  
  export default function VitalSigns({
    heartRate,
    respiratoryRate,
    bloodPressure,
    spo2,
    temperature,
    gcs,
  }: VitalSignsProps) {
    return (
      <div className="rounded-xl border border-red-700 bg-zinc-900 p-6 shadow-lg">
  
        <h2 className="mb-5 text-2xl font-bold text-red-500">
          Vital Signs
        </h2>
  
        <div className="grid grid-cols-2 gap-4">
  
          <div className="rounded-lg bg-black p-4">
            <p className="text-sm text-gray-400">Heart Rate</p>
            <p className="text-3xl font-bold text-red-500">
              {heartRate}
            </p>
          </div>
  
          <div className="rounded-lg bg-black p-4">
            <p className="text-sm text-gray-400">Respirations</p>
            <p className="text-3xl font-bold text-blue-400">
              {respiratoryRate}
            </p>
          </div>
  
          <div className="rounded-lg bg-black p-4">
            <p className="text-sm text-gray-400">Blood Pressure</p>
            <p className="text-3xl font-bold text-yellow-400">
              {bloodPressure}
            </p>
          </div>
  
          <div className="rounded-lg bg-black p-4">
            <p className="text-sm text-gray-400">SpO₂</p>
            <p className="text-3xl font-bold text-green-400">
              {spo2}%
            </p>
          </div>
  
          <div className="rounded-lg bg-black p-4">
            <p className="text-sm text-gray-400">Temperature</p>
            <p className="text-3xl font-bold">
              {temperature}°F
            </p>
          </div>
  
          <div className="rounded-lg bg-black p-4">
            <p className="text-sm text-gray-400">GCS</p>
            <p className="text-3xl font-bold text-purple-400">
              {gcs}
            </p>
          </div>
  
        </div>
      </div>
    );
  }