import { hashSync } from "bcrypt";
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Account from "./account.entity";

@Entity("users")
class User {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ length: 150 })
    name: string

    @Column({ unique: true })
    email: string

    @Column()
    password: string

    @BeforeInsert()
    @BeforeUpdate()
    encryptPassword() {
        this.password = hashSync(this.password, 10)
    }

    @Column({ type: "date" })
    birthdate: string

    @Column({ unique: true })
    CPF: string

    @Column({ default: true })
    isActive: boolean

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @DeleteDateColumn({ default: null })
    deletedAt: Date

    @OneToOne(() => Account, (accounts) => accounts.id)
    @JoinColumn()
    account: number
}

export default User