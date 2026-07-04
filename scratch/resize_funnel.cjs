const fs = require('fs');
const path = require('path');

const filePath = path.join(process.cwd(), 'src', 'routes', 'analytics', 'ai.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// Change col-spans and add self-start to the Funnel so it doesn't stretch vertically
content = content.replace(
  /className="col-span-12 lg:col-span-8 bg-white dark:bg-\[#111111\] p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-white\/10 transition-all duration-300 hover:-translate-y-1 hover:border-\[#6C1D5F\] dark:hover:border-\[#FFACE8\] group flex flex-col justify-between"/,
  'className="col-span-12 lg:col-span-6 bg-white dark:bg-[#111111] p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-white/10 transition-all duration-300 hover:-translate-y-1 hover:border-[#6C1D5F] dark:hover:border-[#FFACE8] group flex flex-col justify-between self-start h-fit"'
);

// Change right column span from 4 to 6
content = content.replace(
  /className="col-span-12 lg:col-span-4 flex flex-col gap-6"/,
  'className="col-span-12 lg:col-span-6 flex flex-col gap-6"'
);

// Make the right column's items flex-row on large screens if we want to save space?
// No, they are fine stacked. Just the flex flex-col gap-6 is good.

fs.writeFileSync(filePath, content);
console.log("Funnel card resized.");
