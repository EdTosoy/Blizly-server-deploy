import { hash } from "bcryptjs";
import { Arg, Mutation, Resolver } from "type-graphql";
import { User } from "../entity/User";

@Resolver()
export class Register {
  @Mutation(() => Boolean)
  async register(
    @Arg("username") username: string,
    @Arg("password") password: string
  ) {
    const hashedPassword = await hash(password, 12);
    const userExist = await User.findOne({ where: { username: username } });
    if (userExist) {
      throw new Error("User already exist");
    }
    try {
      await User;
      await User.insert({
        username,
        password: hashedPassword,
      });
    } catch (error) {
      console.error(error);
      return false;
    }
    return true;
  }
}
