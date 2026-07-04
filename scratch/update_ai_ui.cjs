const fs = require('fs');
const path = require('path');

const filePath = path.join(process.cwd(), 'src', 'routes', 'analytics', 'ai.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Fix grid for Quick Metrics
content = content.replace(
  'className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-2 gap-4 flex-[1.5]"',
  'className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 flex-[1.5]"'
);

// 2. Reduce card sizing & add proper background
// We replace bg-gray-50 dark:bg-black/20 rounded-2xl p-6 border border-gray-200 ...
content = content.replace(/bg-gray-50 dark:bg-black\/20 rounded-2xl p-6 border border-gray-200/g, 'bg-white dark:bg-[#111111] rounded-2xl p-5 border border-gray-200');

// 3. Make text-3xl to text-2xl for all 5 core metrics
content = content.replace(/<h4 className="text-3xl font-black text-gray-900/g, '<h4 className="text-2xl font-black text-gray-900');

// 4. Update the coloring staggered (Purple, Teal, Orange, Teal, Orange)
content = content.replace(
  /<Video className="w-6 h-6 text-\[#6C1D5F\] mb-4 transition-transform" \/>/g,
  '<Video className="w-6 h-6 text-[#01AC9F] mb-4 transition-transform" />'
);

const videoCardOld = `hover:border-[#6C1D5F] transition-all group">
            <Video className="w-6 h-6 text-[#6C1D5F]`;
const videoCardNew = `hover:border-[#01AC9F] transition-all group hover:shadow-md">
            <Video className="w-6 h-6 text-[#01AC9F]`;
content = content.replace(videoCardOld, videoCardNew);
content = content.replace(
  /hover:border-\[#6C1D5F\] transition-all group md:col-span-1 xl:col-span-1">/g,
  'hover:border-[#01AC9F] transition-all group">'
);

const lineChartOld = `hover:border-[#01AC9F] transition-all group md:col-span-2 xl:col-span-2">
            <LineChart className="w-6 h-6 text-[#01AC9F]`;
const lineChartNew = `hover:border-[#FF6200] transition-all group hover:shadow-md md:col-span-2 lg:col-span-1 xl:col-span-1">
            <LineChart className="w-6 h-6 text-[#FF6200]`;
content = content.replace(lineChartOld, lineChartNew);
content = content.replace(
  /<div className="text-sm font-bold text-\[#01AC9F\]">\+4\.1% vs last month<\/div>/,
  '<div className="text-sm font-bold text-[#FF6200]">+4.1% vs last month</div>'
);

// Add hover:shadow-md to all metric cards
content = content.replace(/transition-all group">/g, 'transition-all group hover:shadow-md">');

// 5. Update Funnel Colors
content = content.replace(
  /<div className="h-full bg-gradient-to-r from-\[#6C1D5F\]\/90 to-\[#802270\]\/90 rounded-lg w-\[74%\] transition-all duration-1000 delay-100"><\/div>/,
  '<div className="h-full bg-gradient-to-r from-[#01AC9F] to-[#018F84] rounded-lg w-[74%] transition-all duration-1000 delay-100"></div>'
);
content = content.replace(
  /<span className="group-hover:text-\[#6C1D5F\] transition-colors">Completed Learning<\/span>/,
  '<span className="group-hover:text-[#FF6200] transition-colors">Completed Learning</span>'
);
content = content.replace(
  /<div className="h-full bg-gradient-to-r from-\[#6C1D5F\]\/75 to-\[#802270\]\/75 rounded-lg w-\[51%\] transition-all duration-1000 delay-200"><\/div>/,
  '<div className="h-full bg-gradient-to-r from-[#FF6200] to-[#E55800] rounded-lg w-[51%] transition-all duration-1000 delay-200"></div>'
);
content = content.replace(
  /<span className="group-hover:text-\[#01AC9F\] transition-colors">Certified<\/span>/,
  '<span className="group-hover:text-[#6C1D5F] transition-colors">Certified</span>'
);
content = content.replace(
  /<div className="h-full bg-gradient-to-r from-\[#01AC9F\] to-\[#018F84\] rounded-lg w-\[14%\] transition-all duration-1000 delay-300"><\/div>/,
  '<div className="h-full bg-gradient-to-r from-[#6C1D5F] to-[#802270] rounded-lg w-[14%] transition-all duration-1000 delay-300"></div>'
);
content = content.replace(
  /<span className="group-hover:text-\[#FF6200\] transition-colors">Using AI Tools<\/span>/,
  '<span className="group-hover:text-[#01AC9F] transition-colors">Using AI Tools</span>'
);
content = content.replace(
  /<div className="h-full bg-gradient-to-r from-\[#FF6200\] to-\[#E55800\] rounded-lg w-\[10%\] transition-all duration-1000 delay-400"><\/div>/,
  '<div className="h-full bg-gradient-to-r from-[#01AC9F] to-[#018F84] rounded-lg w-[10%] transition-all duration-1000 delay-400"></div>'
);

// 6. Tool Adoption Bento card
content = content.replace(
  '<div className="bg-gradient-to-br from-[#6C1D5F] to-[#510047] text-white p-8 rounded-2xl shadow-xl flex-1 relative overflow-hidden group">',
  '<div className="glass p-8 rounded-2xl shadow-sm border border-gray-200 dark:border-white/10 flex-1 relative overflow-hidden group hover:border-[#6C1D5F] transition-colors">'
);
content = content.replace(
  /<p className="text-\[10px\] font-black uppercase tracking-wider text-white\/60 mb-6">AI TOOLS ADOPTION<\/p>/,
  '<p className="text-[10px] font-black uppercase tracking-wider text-gray-500 mb-6">AI TOOLS ADOPTION</p>'
);
content = content.replace(/bg-white\/10/g, 'bg-gray-100 dark:bg-white/10');
content = content.replace(/border border-white\/20/g, 'border border-gray-200 dark:border-white/20');
content = content.replace(
  /<div className="flex justify-between text-sm font-bold mb-1">/g,
  '<div className="flex justify-between text-sm font-bold mb-1 text-gray-900 dark:text-white">'
);
content = content.replace('<div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-[30px] transition-transform duration-700"></div>', '');
content = content.replace(
  /<Terminal className="w-5 h-5" \/>/g,
  '<Terminal className="w-5 h-5 text-[#01AC9F]" />'
);
content = content.replace(
  /<Zap className="w-5 h-5" \/>/g,
  '<Zap className="w-5 h-5 text-[#FFACE8]" />'
);
content = content.replace(
  /<Bot className="w-5 h-5" \/>/g,
  '<Bot className="w-5 h-5 text-yellow-500" />'
);
content = content.replace(
  /<LayoutGrid className="w-5 h-5" \/>/g,
  '<LayoutGrid className="w-5 h-5 text-[#FF6200]" />'
);

// 7. Remove the FAB button entirely
content = content.replace(/\{\/\* Float FAB Contextual Action \*\/\}[\s\S]*?<\/button>/, '');


fs.writeFileSync(filePath, content);
console.log("ai.jsx updated successfully.");
