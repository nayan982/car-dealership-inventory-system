import { FiInbox } from "react-icons/fi";

const EmptyState = ({
  icon: Icon = FiInbox,
  title = "Nothing here yet",
  message = "",
  action = null,
}) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-white/10 bg-obsidian-2/60 px-6 py-16 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-ember/10 text-ember">
        <Icon size={28} />
      </div>

      <div className="space-y-1">
        <h3 className="font-display text-lg font-semibold text-fog">
          {title}
        </h3>

        {message && (
          <p className="max-w-sm text-sm text-steel">
            {message}
          </p>
        )}
      </div>

      {action}
    </div>
  );
};

export default EmptyState;