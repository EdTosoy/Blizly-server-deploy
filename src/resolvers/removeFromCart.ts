import { Arg, Mutation, Resolver } from "type-graphql";

import { CartList } from "../entity/CartList";
@Resolver()
export class RemoveFromCart {
  @Mutation(() => Boolean)
  async removeFromCart(
    @Arg("id") id: number,
    @Arg("username") username: string
  ) {
    try {
      await CartList.delete({ id, username });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
