const fs = require('fs');
let content = fs.readFileSync('src/components/WeatherWidget.tsx', 'utf8');

// Add state for isExpanded
content = content.replace(
  "  const [selectedDistrict, setSelectedDistrict] = useState<string>('Nashik');",
  "  const [selectedDistrict, setSelectedDistrict] = useState<string>('Nashik');\n  const [isExpanded, setIsExpanded] = useState<boolean>(false);"
);

// Add ChevronUp import if not there (ChevronDown is there)
content = content.replace(
  "  ChevronDown",
  "  ChevronDown,\n  ChevronUp"
);

// Make the header clickable to toggle
content = content.replace(
  '<div className="bg-slate-900 text-white p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">',
  `<div 
        className="bg-slate-900 text-white p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer select-none"
        onClick={() => setIsExpanded(!isExpanded)}
      >`
);

// Add Chevron indicator in the header (maybe next to refresh button)
// Wait, the inner buttons (select, refresh) will trigger onClick on the parent. We need to stop propagation.
content = content.replace(
  "onChange={(e) => setSelectedDistrict(e.target.value)}",
  "onChange={(e) => setSelectedDistrict(e.target.value)}\n              onClick={(e) => e.stopPropagation()}"
);

content = content.replace(
  "onClick={handleRefresh}",
  "onClick={(e) => { e.stopPropagation(); handleRefresh(); }}"
);

// Add an overall expand/collapse arrow
content = content.replace(
  "        </div>\n      </div>\n\n      <div className=\"p-4 sm:p-5 pt-0 space-y-4\">",
  `          <button 
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer ml-1"
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {isExpanded && (
      <div className="p-4 sm:p-5 pt-0 space-y-4 mt-4">`
);

// Add closing brace for isExpanded
content = content.replace(
  "      </div>\n    </div>\n  );\n};\n",
  "      </div>\n      )}\n    </div>\n  );\n};\n"
);


fs.writeFileSync('src/components/WeatherWidget.tsx', content, 'utf8');
