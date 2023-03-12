import { injectable } from 'inversify';
import { readFile, writeFile } from 'fs';
import { join } from 'path';
import { EDatabaseFiles } from './dictionary.database';

@injectable()
export class DatabaseService {
  getFileData(fileName: EDatabaseFiles): Promise<any> {
    return new Promise((resolve, reject) => {
      readFile(join(__dirname, fileName), 'utf-8', (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(JSON.parse(data));
        }
      });
    });
  }

  writeDataToFile(fileName: EDatabaseFiles, data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      writeFile(join(__dirname, fileName), JSON.stringify(data), 'utf-8', (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(true);
        }
      });
    });
  }
}
