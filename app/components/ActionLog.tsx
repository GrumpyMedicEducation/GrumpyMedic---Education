interface ActionLogProps {
    actions: string[];
  }
  
  export default function ActionLog({ actions }: ActionLogProps) {
    return (
      <div className="rounded-xl border border-zinc-700 bg-zinc-900 p-6 shadow-lg">
        <h2 className="mb-5 text-2xl font-bold text-red-500">
          Action Log
        </h2>
  
        {actions.length === 0 ? (
          <div className="rounded-lg border border-dashed border-zinc-700 bg-black p-5 text-center text-zinc-500">
            No actions recorded yet.
          </div>
        ) : (
          <div className="max-h-96 space-y-3 overflow-y-auto pr-2">
            {actions.map((action, index) => (
              <div
                key={`${action}-${index}`}
                className="rounded-lg border border-zinc-700 bg-black p-4"
              >
                <p className="text-sm font-semibold text-zinc-200">
                  {action}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }