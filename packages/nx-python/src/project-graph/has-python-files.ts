import recursive from 'recursive-readdir';
import * as path from 'path';

function notPythonFile(file, stats) {
  // `file` is the path to the file, and `stats` is an `fs.Stats`
  // object returned from `fs.lstat()`.
  return stats.isDirectory() || path.extname(file) !== '.py';
}

export const hasPythonFiles = (folder: string): Promise<string[] | string> =>
  new Promise((resolve, reject) => {
    recursive(folder, [notPythonFile], (err, files) => {
      if (err) reject(err.message);
      resolve(files);
    });
  });
