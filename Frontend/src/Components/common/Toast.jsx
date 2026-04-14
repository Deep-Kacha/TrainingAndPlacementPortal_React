/**
 * Shared Toast notification component.
 * Props:
 *  - message  {string}            text to display
 *  - type     {"success"|"error"} controls icon and border color
 *  - visible  {boolean}           slide in/out via CSS transform
 */
const Toast = ({ message, type = "success", visible }) => {
  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-transform duration-300 pointer-events-none ${
        visible ? "translate-y-0" : "translate-y-24"
      }`}
    >
      <div className="bg-gray-900 text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3">
        <span
          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
            type === "success"
              ? "bg-green-500/20 text-green-400 border border-green-500/50"
              : "bg-red-500/20 text-red-400 border border-red-500/50"
          }`}
        >
          {type === "success" ? "✓" : "✕"}
        </span>
        <p className="text-sm font-bold uppercase m-0">{message}</p>
      </div>
    </div>
  );
};

export default Toast;
