import { Query, Resolver } from "type-graphql";

@Resolver()
export class Register {
  @Query(() => String)
  hello() {
    return "hi";
  }
}
