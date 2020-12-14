import { Ctx, Query, Resolver } from "type-graphql";
import { CartList } from "../entity/CartList";
import { User } from "../entity/User";
import { verify } from "jsonwebtoken";
import { MyContext } from "../MyContext";

@Resolver()
export class Cartlist {
  @Query(() => [CartList], { nullable: true })
  async cartList(@Ctx() context: MyContext): Promise<CartList[] | null> {
    const authorization = context.req.headers["authorization"];

    if (!authorization) {
      return null;
    }

    try {
      const token = authorization.split(" ")[1];
      const payload: any = verify(token, process.env.ACCESS_TOKEN_SECRET!);
      const user = await User.findOne(payload.userId);
      const cartlist = await CartList.find({
        where: { username: user?.username },
      });
      return cartlist;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
