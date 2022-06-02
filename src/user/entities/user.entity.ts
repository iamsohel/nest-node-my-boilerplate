import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    Unique,
    UpdateDateColumn,
  } from 'typeorm';
  
  
  @Entity('users')
  export class User {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ length: 100 })
    name: string;
  
    @Column()
    password: string;
  
    @Column('simple-array')
    roles: string[];
  
    @Unique('ithacaId', ['ithacaId'])
    @Column({ length: 200 })
    ithacaId: string;
  
    @Unique('email', ['email'])
    @Column({ length: 200 })
    email: string;
  
    @CreateDateColumn({ name: 'createdAt', nullable: true })
    createdAt: Date;
  
    @UpdateDateColumn({ name: 'updatedAt', nullable: true })
    updatedAt: Date;
  }
  