import { Arg, Mutation, Resolver } from "type-graphql";

import { CartList } from "../entity/CartList";
@Resolver()
export class AddToCart {
  @Mutation(() => Boolean)
  async addToCart(
    @Arg("name") name: string,
    @Arg("price") price: string,
    @Arg("username") username: string,
    @Arg("url") url: string
  ) {
    const productExist = await CartList.find({ where: { name, username } });
    if (productExist.length !== 0) {
      return false;
    }
    try {
      await CartList.insert({
        name,
        price,
        username,
        url,
      });
    } catch (error) {
      console.error(error);
      return false;
    }
    return true;
  }
}
