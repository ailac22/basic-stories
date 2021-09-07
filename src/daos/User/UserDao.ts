import { IUser } from '@entities/User';
// import { UserModel } from '@db/Models/UserModel';

export interface IUserDao {
  // getOne: (email: string) => Promise<IUser | null>;
  getAll: () => Promise<IUser[]>;
  add: (user: IUser) => Promise<void>;
  update: (user: IUser) => Promise<void>;
  delete: (id: number) => Promise<void>;
}

class UserDao implements IUserDao {
  /**
   *
   */
  public getAll(): Promise<IUser[]> {
    // TODO
    // const a = UserModel.find({});
    const b: IUser[] = [];
    return Promise.resolve(b);
  }

  /**
   *
   * @param user
   */
  public async add(user: IUser): Promise<void> {
    // TODO
    return Promise.resolve(undefined);
  }

  /**
   *
   * @param user
   */
  public async update(user: IUser): Promise<void> {
    // TODO
    return Promise.resolve(undefined);
  }

  /**
   *
   * @param id
   */
  public async delete(id: number): Promise<void> {
    // TODO
    return Promise.resolve(undefined);
  }
}

export default UserDao;
