import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BaseEntity,
  JoinColumn,
} from "typeorm";
import { User } from "./User";
import { Field, ObjectType, Int } from "type-graphql";

@ObjectType()
@Entity("cartlist")
export class CartList extends BaseEntity {
  @Field(() => Int, { nullable: true })
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  name: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  url: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  price: string;
  @Field({ nullable: true })
  @Column({ nullable: true })
  username: string;
  @ManyToOne(() => User, (user: User) => user.cartList)
  @JoinColumn({ name: "user_id" })
  user: User;
}
