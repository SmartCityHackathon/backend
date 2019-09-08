'use strict';
import * as fs from 'fs';
import { User } from './structure/User';
import { Child } from './structure/Child';
import { Class } from './structure/Class';
import { parseJsonBody, prettyJson } from './CustomUtils';

export class Storage {
    users: User[];
    children: Child[];
    classes: Class[];

    constructor(obj: any) {
        this.users = obj.users || [];
        this.children = obj.children || [];
        this.classes = obj.classes || [];
    }
}

export class JsonStorage {
    filename: string = 'data.json';
    sessions: {} = {};

    load(): Storage {
        let storage = new Storage({});
        try {
            storage = new Storage(parseJsonBody(fs.readFileSync(this.filename).toString()));
        } catch (e) {
            this.save(storage);
        }
        return storage;
    }

    save(data: Storage): void {
        fs.writeFileSync(this.filename, prettyJson(data));
    }
}

export const jsonStorage = new JsonStorage();