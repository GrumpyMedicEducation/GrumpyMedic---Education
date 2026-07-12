interface PatientMonitorProps {
    rhythm: string;
    heartRate: number;
    spo2: number;
  }
  
  export default function PatientMonitor({
    rhythm,
    heartRate,
    spo2,
  }: PatientMonitorProps) {
    return (
      <div className="rounded-xl border border-green-700 bg-black p-6 shadow-lg">
  
        <h2 className="mb-5 text-2xl font-bold text-green-400">
          Cardiac Monitor
        </h2>
  
        <div className="space-y-5">
  
          <div className="rounded-lg border border-green-700 bg-black p-5">
  
            <p className="text-sm uppercase text-green-500">
              ECG Rhythm
            </p>
  
            <p className="mt-2 text-4xl font-bold text-green-400">
              {rhythm}
            </p>
  
          </div>
  
          <div className="grid grid-cols-2 gap-4">
  
            <div className="rounded-lg border border-green-700 bg-black p-4">
  
              <p className="text-sm text-green-500">
                Pulse
              </p>
  
              <p className="text-4xl font-bold text-green-400">
                {heartRate}
              </p>
  
            </div>
  
            <div className="rounded-lg border border-green-700 bg-black p-4">
  
              <p className="text-sm text-green-500">
                SpO₂
              </p>
  
              <p className="text-4xl font-bold text-green-400">
                {spo2}%
              </p>
  
            </div>
  
          </div>
  
          <div className="rounded-lg border border-green-700 bg-green-950 p-4">
  
            <p className="text-center font-mono text-green-400">
              █▁▂▃▄▅▆▇█▁▂▃▄▅▆▇█▁▂▃▄▅▆▇█
            </p>
  
          </div>
  
        </div>
      </div>
    );
  }