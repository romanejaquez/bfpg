export class User {
    public id:string;
    public email:string;
    public name:string;
    public username:string;

    constructor(usuario:any) {
        this.id = usuario.id;
        this.email = usuario.email;
        this.name = usuario.name;
        this.username = usuario.username;
    }
}