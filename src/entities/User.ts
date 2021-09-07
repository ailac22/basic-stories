export interface IUser {
  id?: number;
  name: string;
}

// class User implements IUser {

//     public id: number;
//     public name: string;

//     constructor(nameOrUser: string | IUser, id?: number) {
//         if (typeof nameOrUser === 'string') {
//             this.name = nameOrUser;
//             this.id = id || -1;
//         } else {
//             this.name = nameOrUser.name;
//             this.id = nameOrUser.id;
//         }
//     }
// }

// export default User;
