const fs = require('fs');
const path = require('path');

const filePath = path.join(process.cwd(), 'src', 'routes', 'analytics', 'ai.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Fix Top Row (Maturity + Quick Metrics)
// Replace: <div className="flex flex-col xl:flex-row gap-6 mb-8">
content = content.replace(
  /<div className="flex flex-col xl:flex-row gap-6 mb-8">/,
  '<div className="grid grid-cols-1 xl:grid-cols-12 gap-6 mb-8">'
);

// Replace Maturity Score wrapper: xl:w-[380px] xl:flex-none h-fit self-start ...
content = content.replace(
  /className="xl:w-\[380px\] xl:flex-none h-fit self-start bg-white dark:bg-\[#111111\] rounded-2xl p-6 border border-gray-200 dark:border-white\/10 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-\[#01AC9F\] dark:hover:border-\[#01AC9F\] group flex flex-col justify-between relative overflow-hidden"/,
  'className="col-span-1 xl:col-span-4 bg-white dark:bg-[#111111] rounded-2xl p-6 border border-gray-200 dark:border-white/10 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#01AC9F] dark:hover:border-[#01AC9F] group flex flex-col justify-between relative overflow-hidden h-full"'
);

// Replace Quick Metrics wrapper: grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 flex-[1.5]
content = content.replace(
  /className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 flex-\[1\.5\]"/,
  'className="col-span-1 xl:col-span-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"'
);


// 2. Fix Middle Row (Funnel + Tools + Champions)
// The wrapper is already: <div className="grid grid-cols-12 gap-6 mb-8">
// Let's modify Funnel: className="col-span-12 lg:col-span-6 bg-white ... self-start h-fit"
// And Right Column wrapper: className="col-span-12 lg:col-span-6 flex flex-col gap-6"
content = content.replace(
  /className="col-span-12 lg:col-span-6 bg-white dark:bg-\[#111111\] p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-white\/10 transition-all duration-300 hover:-translate-y-1 hover:border-\[#6C1D5F\] dark:hover:border-\[#FFACE8\] group flex flex-col justify-between self-start h-fit"/,
  'className="col-span-12 lg:col-span-4 bg-white dark:bg-[#111111] p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-white/10 transition-all duration-300 hover:-translate-y-1 hover:border-[#6C1D5F] dark:hover:border-[#FFACE8] group flex flex-col justify-between h-full"'
);

// We need to unwrap the right column so Tools and Champions are direct children of the grid!
// It currently is:
// <div className="col-span-12 lg:col-span-6 flex flex-col gap-6">
//   {/* Tool Adoption Stats */}
//   <div className="bg-white ..."> ... </div>
//   {/* AI Champions */}
//   <div className="bg-white ..."> ... </div>
// </div>
//
// We want:
// {/* Tool Adoption Stats */}
// <div className="col-span-12 lg:col-span-4 bg-white ..."> ... </div>
// {/* AI Champions */}
// <div className="col-span-12 lg:col-span-4 bg-white ..."> ... </div>

const middleRowRegex = /\{\/\* Right Column \*\/\}\s*<div className="col-span-12 lg:col-span-6 flex flex-col gap-6">([\s\S]*?)<\/div>\s*<\/div>\s*\{\/\* Readiness Heatmap Section \*\/\}/;

const rightColumnContent = content.match(middleRowRegex);
if(rightColumnContent && rightColumnContent[1]) {
  let inner = rightColumnContent[1];
  
  // Update Tool Adoption classes
  inner = inner.replace(
    /className="bg-white dark:bg-\[#111111\] p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-white\/10 flex-1 relative overflow-hidden group hover:border-\[#01AC9F\] transition-all duration-300 hover:-translate-y-1"/,
    'className="col-span-12 lg:col-span-4 bg-white dark:bg-[#111111] p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-white/10 relative overflow-hidden group hover:border-[#01AC9F] transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between h-full"'
  );
  
  // Update Champions classes
  inner = inner.replace(
    /className="bg-white dark:bg-\[#111111\] p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-white\/10 transition-all duration-300 hover:-translate-y-1 hover:border-\[#FF6200\] dark:hover:border-\[#FF6200\] group"/,
    'className="col-span-12 lg:col-span-4 bg-white dark:bg-[#111111] p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-white/10 transition-all duration-300 hover:-translate-y-1 hover:border-[#FF6200] dark:hover:border-[#FF6200] group flex flex-col justify-between h-full"'
  );
  
  content = content.replace(middleRowRegex, inner + '\n\n      </div>\n\n      {/* Readiness Heatmap Section */}');
}

fs.writeFileSync(filePath, content);
console.log("Layout grids standardized successfully.");
