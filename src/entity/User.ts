import { Field, Int, ObjectType } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
} from "typeorm";
import { CartList } from "./CartList";

@ObjectType()
@Entity("users")
export class User extends BaseEntity {
  @Field(() => Int, { nullable: true })
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  email: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  username: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  password: string;

  @OneToMany(() => CartList, (cartList: CartList) => cartList.user, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  cartList: CartList[];
}
