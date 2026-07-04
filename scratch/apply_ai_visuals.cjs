const fs = require('fs');
const path = require('path');

const filePath = path.join(process.cwd(), 'src', 'routes', 'analytics', 'ai.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Text color and 3D borders for Core Metrics
// Card 1: Purple
content = content.replace(
  /<Users className="w-6 h-6 text-\[#6C1D5F\] mb-4 transition-transform" \/>\s*<div>\s*<p className="text-\[10px\] font-bold uppercase tracking-wider text-gray-500">Employees Trained on AI<\/p>\s*<h4 className="text-2xl font-black text-gray-900 dark:text-white mt-1">4,280<\/h4>/,
  `<Users className="w-6 h-6 text-[#6C1D5F] mb-4 transition-transform" />
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Employees Trained on AI</p>
              <h4 className="text-2xl font-black text-[#6C1D5F] dark:text-[#FFACE8] mt-1">4,280</h4>`
);
content = content.replace(
  /className="bg-white dark:bg-\[#111111\] rounded-2xl p-5 border border-gray-200 dark:border-white\/10 flex flex-col justify-between hover:border-\[#6C1D5F\] transition-all group hover:shadow-md"/,
  'className="bg-white dark:bg-[#111111] rounded-2xl p-5 border border-gray-200 border-b-4 border-b-[#6C1D5F] dark:border-white/10 dark:border-b-[#FFACE8] flex flex-col justify-between hover:border-[#6C1D5F] transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl group"'
);

// Card 2: Teal
content = content.replace(
  /<Award className="w-6 h-6 text-\[#01AC9F\] mb-4 transition-transform" \/>\s*<div>\s*<p className="text-\[10px\] font-bold uppercase tracking-wider text-gray-500">Employees Certified on AI<\/p>\s*<h4 className="text-2xl font-black text-gray-900 dark:text-white mt-1">1,150<\/h4>/,
  `<Award className="w-6 h-6 text-[#01AC9F] mb-4 transition-transform" />
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Employees Certified on AI</p>
              <h4 className="text-2xl font-black text-[#01AC9F] dark:text-[#01AC9F] mt-1">1,150</h4>`
);
content = content.replace(
  /className="bg-white dark:bg-\[#111111\] rounded-2xl p-5 border border-gray-200 dark:border-white\/10 flex flex-col justify-between hover:border-\[#01AC9F\] transition-all group hover:shadow-md"/,
  'className="bg-white dark:bg-[#111111] rounded-2xl p-5 border border-gray-200 border-b-4 border-b-[#01AC9F] dark:border-white/10 dark:border-b-[#01AC9F] flex flex-col justify-between hover:border-[#01AC9F] transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl group"'
);

// Card 3: Orange
content = content.replace(
  /<Clock className="w-6 h-6 text-\[#FF6200\] mb-4 transition-transform" \/>\s*<div>\s*<p className="text-\[10px\] font-bold uppercase tracking-wider text-gray-500">AI Learning Hours<\/p>\s*<h4 className="text-2xl font-black text-gray-900 dark:text-white mt-1">18.4K<\/h4>/,
  `<Clock className="w-6 h-6 text-[#FF6200] mb-4 transition-transform" />
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">AI Learning Hours</p>
              <h4 className="text-2xl font-black text-[#FF6200] dark:text-[#FF6200] mt-1">18.4K</h4>`
);
content = content.replace(
  /className="bg-white dark:bg-\[#111111\] rounded-2xl p-5 border border-gray-200 dark:border-white\/10 flex flex-col justify-between hover:border-\[#FF6200\] transition-all group hover:shadow-md"/,
  'className="bg-white dark:bg-[#111111] rounded-2xl p-5 border border-gray-200 border-b-4 border-b-[#FF6200] dark:border-white/10 dark:border-b-[#FF6200] flex flex-col justify-between hover:border-[#FF6200] transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl group"'
);

// Card 4: Teal
content = content.replace(
  /<Video className="w-6 h-6 text-\[#01AC9F\] mb-4 transition-transform" \/>\s*<div>\s*<p className="text-\[10px\] font-bold uppercase tracking-wider text-gray-500">AI Sessions Conducted<\/p>\s*<h4 className="text-2xl font-black text-gray-900 dark:text-white mt-1">245<\/h4>/,
  `<Video className="w-6 h-6 text-[#01AC9F] mb-4 transition-transform" />
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">AI Sessions Conducted</p>
              <h4 className="text-2xl font-black text-[#01AC9F] dark:text-[#01AC9F] mt-1">245</h4>`
);
content = content.replace(
  /className="bg-white dark:bg-\[#111111\] rounded-2xl p-5 border border-gray-200 dark:border-white\/10 flex flex-col justify-between hover:border-\[#01AC9F\] transition-all group hover:shadow-md"/,
  'className="bg-white dark:bg-[#111111] rounded-2xl p-5 border border-gray-200 border-b-4 border-b-[#01AC9F] dark:border-white/10 dark:border-b-[#01AC9F] flex flex-col justify-between hover:border-[#01AC9F] transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl group"'
);

// Card 5: Orange
content = content.replace(
  /<LineChart className="w-6 h-6 text-\[#FF6200\] mb-4 transition-transform" \/>\s*<div className="flex justify-between items-end">\s*<div>\s*<p className="text-\[10px\] font-bold uppercase tracking-wider text-gray-500">AI Training Attendance %<\/p>\s*<h4 className="text-2xl font-black text-gray-900 dark:text-white mt-1">94.2%<\/h4>/,
  `<LineChart className="w-6 h-6 text-[#FF6200] mb-4 transition-transform" />
            <div className="flex justify-between items-end">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">AI Training Attendance %</p>
                <h4 className="text-2xl font-black text-[#FF6200] dark:text-[#FF6200] mt-1">94.2%</h4>`
);
content = content.replace(
  /className="bg-white dark:bg-\[#111111\] rounded-2xl p-5 border border-gray-200 dark:border-white\/10 flex flex-col justify-between hover:border-\[#FF6200\] transition-all group hover:shadow-md md:col-span-2 lg:col-span-1 xl:col-span-1"/,
  'className="bg-white dark:bg-[#111111] rounded-2xl p-5 border border-gray-200 border-b-4 border-b-[#FF6200] dark:border-white/10 dark:border-b-[#FF6200] flex flex-col justify-between hover:border-[#FF6200] transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl group md:col-span-2 lg:col-span-1 xl:col-span-1"'
);


// AI Maturity Score Card - Give it a border-b-4 too
content = content.replace(
  /className="flex-1 glass rounded-2xl p-8 flex flex-col justify-between overflow-hidden relative group transition-all duration-300 border border-gray-200 dark:border-white\/10"/,
  'className="flex-1 bg-white dark:bg-[#111111] rounded-2xl p-8 flex flex-col justify-between overflow-hidden relative group transition-all duration-300 border border-gray-200 border-b-4 border-b-[#01AC9F] dark:border-white/10 dark:border-b-[#01AC9F] transform hover:-translate-y-1 hover:shadow-xl"'
);

// Funnel size reduction and border
content = content.replace(
  /className="col-span-12 lg:col-span-8 glass p-8 rounded-2xl shadow-sm border border-gray-200 dark:border-white\/10"/,
  'className="col-span-12 lg:col-span-8 bg-white dark:bg-[#111111] p-6 rounded-2xl shadow-sm border border-gray-200 border-b-4 border-b-[#6C1D5F] dark:border-white/10 dark:border-b-[#FFACE8] transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"'
);
content = content.replace(/className="space-y-7"/, 'className="space-y-4"');
content = content.replace(/h-8/g, 'h-5');

// Tool Adoption border
content = content.replace(
  /className="glass p-8 rounded-2xl shadow-sm border border-gray-200 dark:border-white\/10 flex-1 relative overflow-hidden group hover:border-\[#6C1D5F\] transition-colors"/,
  'className="bg-white dark:bg-[#111111] p-6 rounded-2xl shadow-sm border border-gray-200 border-b-4 border-b-[#01AC9F] dark:border-white/10 dark:border-b-[#01AC9F] flex-1 relative overflow-hidden group hover:border-[#01AC9F] transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"'
);

// Champions border
content = content.replace(
  /className="glass p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-white\/10"/,
  'className="bg-white dark:bg-[#111111] p-6 rounded-2xl shadow-sm border border-gray-200 border-b-4 border-b-[#FF6200] dark:border-white/10 dark:border-b-[#FF6200] transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"'
);

// Heatmap border
content = content.replace(
  /className="glass p-8 rounded-2xl shadow-sm border border-gray-200 dark:border-white\/10 overflow-hidden"/,
  'className="bg-white dark:bg-[#111111] p-6 rounded-2xl shadow-sm border border-gray-200 border-b-4 border-b-[#6C1D5F] dark:border-white/10 dark:border-b-[#FFACE8] overflow-hidden transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"'
);

// Heatmap row colors staggering
// Currently all use #6C1D5F (except with different opacities).
// Let's replace the 2nd row (EMEA) base color #6C1D5F with #01AC9F
// Let's replace the 3rd row (APAC) base color #6C1D5F with #FF6200
// Let's replace the 4th row (LATAM) base color #6C1D5F with #01AC9F

let rows = content.split('<tr className="border-b border-gray-100 dark:border-white/5">');
// rows[0] = table start
// rows[1] = North America
// rows[2] = EMEA
// rows[3] = APAC
// there's a <tr> (no class) for LATAM
let emeaRow = rows[2];
if (emeaRow) {
  emeaRow = emeaRow.replace(/#6C1D5F/g, '#01AC9F');
  rows[2] = emeaRow;
}
let apacRow = rows[3];
if (apacRow) {
  // APAC splits on <tr> for latam at the end
  let parts = apacRow.split('<tr>');
  let topPart = parts[0];
  topPart = topPart.replace(/#6C1D5F/g, '#FF6200');
  let latamPart = parts[1];
  if(latamPart) {
     latamPart = latamPart.replace(/#6C1D5F/g, '#01AC9F');
  }
  rows[3] = topPart + '<tr>' + latamPart;
}
content = rows.join('<tr className="border-b border-gray-100 dark:border-white/5">');

fs.writeFileSync(filePath, content);
console.log("ai.jsx visuals applied successfully.");
