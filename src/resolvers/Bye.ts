import { Ctx, Query, Resolver, UseMiddleware } from "type-graphql";
import { isAuth } from "../isAuth";
import { MyContext } from "../MyContext";

@Resolver()
export class Bye {
  @Query(() => String)
  @UseMiddleware(isAuth)
  bye(@Ctx() { payload }: MyContext) {
    console.log(payload);
    return `your user id is : ${payload!.userId}`;
  }
}
