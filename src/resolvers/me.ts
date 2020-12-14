import { Ctx, Query, Resolver } from "type-graphql";
import { MyContext } from "../MyContext";
import { verify } from "jsonwebtoken";
import { User } from "../entity/User";

@Resolver()
export class Me {
  @Query(() => User, { nullable: true })
  me(@Ctx() context: MyContext) {
    const authorization = context.req.headers["authorization"];

    if (!authorization) {
      return null;
    }

    try {
      const token = authorization.split(" ")[1];
      const payload: any = verify(token, process.env.ACCESS_TOKEN_SECRET!);
      return User.findOne(payload.userId);
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}
