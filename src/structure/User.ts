export class User {
    userId: string = '';
    type: string = '';
    password: string = '';  // TODO Do not store password in plain text!!!
    email: string = '';
    fullname: string = '';
    children?: string[] = [];
}