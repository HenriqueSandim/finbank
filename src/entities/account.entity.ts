import { Column, Entity, OneToMany, OneToOne, PrimaryColumn } from "typeorm";
import Transference from "./transference.entity";
import User from "./user.entity";


@Entity("accounts")
class Account {
    @PrimaryColumn({ type: "int", width: 5 })
    id: number

    @Column({ type: "decimal", precision: 30, scale: 2, default: 0 })
    money: number
    
    @OneToOne(() => User, (users) => users.id )
    user: string

    @OneToMany(() => Transference, (transference) => transference.account)
    transference: Transference[]
}

export default Account