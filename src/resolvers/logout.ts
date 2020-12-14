import { Mutation, Ctx, Resolver } from "type-graphql";
import { MyContext } from "../MyContext";
import { sendRefreshToken } from "../sendRefreshToken";

@Resolver()
export class Logout {
  @Mutation(() => Boolean)
  async logout(@Ctx() { res }: MyContext) {
    await sendRefreshToken(res, "");
    return true;
  }
}
