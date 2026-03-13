// components/common/SectionCard.jsx
// Renders the white card with a numbered red-circle header used in both forms.
// Identical visual output to the original inline divs.

const SectionCard = ({ number, title, children, contentClassName = "px-6 py-5" }) => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200">
    {/* Section header */}
    <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100">
      <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center">
        <span className="text-white text-xs font-bold">{number}</span>
      </div>
      <h2 className="text-sm font-semibold text-gray-800">{title}</h2>
    </div>
    {/* Section body — caller controls layout via contentClassName */}
    <div className={contentClassName}>{children}</div>
  </div>
);

export default SectionCard;