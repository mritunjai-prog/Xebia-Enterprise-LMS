const fs = require('fs');
const path = require('path');

const filePath = path.join(process.cwd(), 'src', 'routes', 'analytics', 'ai.jsx');
let content = fs.readFileSync(filePath, 'utf8');

const newCard = `
          <div className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#6C1D5F] dark:hover:border-[#FFACE8] group flex flex-col justify-between h-full">
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-[#6C1D5F]/10 text-[#6C1D5F] dark:bg-[#FFACE8]/10 dark:text-[#FFACE8] rounded-xl">
                <Star className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider text-[#6C1D5F] dark:text-[#FFACE8] px-3 py-1 bg-[#6C1D5F]/10 dark:bg-[#FFACE8]/10 rounded-lg">IMPACT</span>
            </div>
            <div className="flex justify-between items-end">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Training Satisfaction</p>
                <h4 className="text-3xl font-black text-gray-900 dark:text-white mt-1">4.8<span className="text-xl text-gray-400">/5</span></h4>
              </div>
              <div className="text-sm font-bold text-[#6C1D5F]">+0.2</div>
            </div>
          </div>
        </div>
`;

content = content.replace(/<\/div>\s*<\/div>\s*\{\/\* Adoption & Funnel Bento \*\/\}/, newCard + '      </div>\n\n      {/* Adoption & Funnel Bento */}');

fs.writeFileSync(filePath, content);
console.log("6th metric card added successfully.");
