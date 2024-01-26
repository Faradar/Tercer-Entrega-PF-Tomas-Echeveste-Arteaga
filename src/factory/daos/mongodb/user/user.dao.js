import Daos from "../class.dao.js";
import { UserModel } from "./user.model.js";
import { CartModel } from "../cart/cart.model.js";
import { createHash, isValidPass } from "../../../../utils/bcrypt.js";

export default class UserDaoMongoDB extends Daos {
  constructor() {
    super(UserModel);
  }

  async register(user) {
    try {
      const { email } = user;
      const exists = await UserModel.findOne({ email });
      let newUser;
      if (!exists) {
        if (user.isGithub || user.isGoogle) {
          newUser = await UserModel.create({
            ...user,
          });
        } else {
          newUser = await UserModel.create({
            ...user,
            password: createHash(user.password),
          });
        }
        const newCart = await CartModel.create({ user: newUser._id });
        await UserModel.findByIdAndUpdate(newUser._id, { cart: newCart._id });
        return newUser;
      } else return false;
    } catch (error) {
      throw new Error("Error in register dao");
    }
  }

  async login(email, password) {
    try {
      const userExist = await UserModel.findOne({ email });
      if (userExist) {
        const pass = isValidPass(password, userExist);
        return !pass ? false : userExist;
      } else return false;
    } catch (error) {
      throw new Error("Error in login dao");
    }
  }

  async getByEmail(email) {
    try {
      const userExist = await UserModel.findOne({ email });
      if (userExist) {
        return userExist;
      }
      return false;
    } catch (error) {
      throw new Error("Error in getByEmail dao");
    }
  }
}
