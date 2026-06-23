import { transformFileSync } from "@babel/core";
import fs from "fs";
import path from "path";

const dir = "d:/Xebia LMS/src/routes/trainer";

function processDir(directory) {
  const files = fs.readdirSync(directory);
  for (const file of files) {
    const fullPath = path.join(directory, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith(".jsx")) {
      console.log(`Transforming ${fullPath}`);
      const result = transformFileSync(fullPath, {
        presets: [["@babel/preset-react", { runtime: "automatic" }]],
        filename: fullPath,
      });

      const newPath = fullPath.replace(/\.jsx$/, ".js");
      fs.writeFileSync(newPath, result.code);
      fs.unlinkSync(fullPath);
    }
  }
}

// Also process trainer.jsx
const trainerLayoutPath = "d:/Xebia LMS/src/routes/trainer.jsx";
if (fs.existsSync(trainerLayoutPath)) {
  console.log(`Transforming ${trainerLayoutPath}`);
  const result = transformFileSync(trainerLayoutPath, {
    presets: [["@babel/preset-react", { runtime: "automatic" }]],
    filename: trainerLayoutPath,
  });
  const newPath = trainerLayoutPath.replace(/\.jsx$/, ".js");
  fs.writeFileSync(newPath, result.code);
  fs.unlinkSync(trainerLayoutPath);
}

processDir(dir);
