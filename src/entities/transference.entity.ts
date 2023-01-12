import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Account from "./account.entity";

@Entity("transferences")
class Transference {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    description: string

    @Column({ type: "date" })
    date: string

    @Column({ type: "decimal", precision: 30, scale: 2 })
    value: number

    @CreateDateColumn()
    createdAt: Date

    @ManyToOne(() => Account, (account) => account.transference)
    account: Account
}

export default Transference