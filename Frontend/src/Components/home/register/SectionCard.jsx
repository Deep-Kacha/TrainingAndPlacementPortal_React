// components/common/SectionCard.jsx
// Renders the white card with a numbered red-circle header used in both forms.
// Identical visual output to the original inline divs.

const SectionCard = ({ number, title, children, contentClassName = "p-6 md:p-8" }) => (
  <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
    {/* Section header */}
    <div className="flex items-center gap-4 px-6 py-5 md:px-8 border-b border-gray-100 bg-gray-50/50">
      <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center shrink-0 shadow-sm">
        <span className="text-white text-sm font-bold">{number}</span>
      </div>
      <h2 className="text-lg md:text-xl font-bold text-gray-800">{title}</h2>
    </div>
    {/* Section body — caller controls layout via contentClassName */}
    <div className={contentClassName}>{children}</div>
  </div>
);

export default SectionCard;