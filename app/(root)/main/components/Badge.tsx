export default function Badge({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-900 text-white text-xs font-medium">
      {label}
      <button
        onClick={onRemove}
        className="hover:text-gray-300 transition-colors cursor-pointer"
        aria-label={`Remove ${label} filter`}
      >
        &times;
      </button>
    </span>
  );
}
