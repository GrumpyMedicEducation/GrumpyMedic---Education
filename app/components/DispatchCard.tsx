interface DispatchCardProps {
    title: string;
    dispatch: string;
    age: string;
    chiefComplaint: string;
    priority: string;
    location: string;
  }
  
  export default function DispatchCard({
    title,
    dispatch,
    age,
    chiefComplaint,
    priority,
    location,
  }: DispatchCardProps) {
    return (
      <div className="rounded-xl border border-red-700 bg-zinc-900 p-6 shadow-lg">
        <h2 className="mb-4 text-2xl font-bold text-red-500">
          🚑 {title}
        </h2>
  
        <div className="space-y-3 text-white">
  
          <div>
            <span className="font-bold text-red-400">
              Dispatch:
            </span>{" "}
            {dispatch}
          </div>
  
          <div>
            <span className="font-bold text-red-400">
              Patient:
            </span>{" "}
            {age}
          </div>
  
          <div>
            <span className="font-bold text-red-400">
              Chief Complaint:
            </span>{" "}
            {chiefComplaint}
          </div>
  
          <div>
            <span className="font-bold text-red-400">
              Priority:
            </span>{" "}
            {priority}
          </div>
  
          <div>
            <span className="font-bold text-red-400">
              Location:
            </span>{" "}
            {location}
          </div>
  
        </div>
      </div>
    );
  }