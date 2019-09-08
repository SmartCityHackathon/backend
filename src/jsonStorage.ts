import * as fs from 'fs';

export class JsonStorage {
    static filename: string = 'data.json';

    static load() {
        return fs.readFileSync(this.filename).toJSON().data;
    }

    static save(data: any[]) {
        fs.writeFileSync(this.filename, data);
    }
}

export const jsonStorage = new JsonStorage();