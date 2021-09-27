import { Mongoose, ObjectId, Schema } from 'mongoose';

export interface IUser {
  _id?: Schema.Types.ObjectId;
  name: string;
  hash: string;
  salt: string;
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
