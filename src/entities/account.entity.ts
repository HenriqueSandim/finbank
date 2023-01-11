import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import Transference from "./transference.entity";
import User from "./user.entity";

@Entity("accounts")
class Account {
  @PrimaryGeneratedColumn({ type: "int" })
  id: number;

  @Column({ type: "decimal", precision: 30, scale: 2, default: 0 })
  money: number;

  @OneToOne(() => User)
  user: User;

  @OneToMany(() => Transference, (transference) => transference.account)
  transference: Transference[];
}

export default Account;
