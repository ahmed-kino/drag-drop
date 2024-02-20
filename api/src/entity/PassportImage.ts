import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  BaseEntity,
} from "typeorm";

@Entity()
export class PassportImage extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fileName: string;

  @Column()
  fileType: string;

  @Column()
  dateOfBirth: string;

  @Column()
  expiryDate: string;

  @Column()
  passportNumber: string;

  @Column()
  fullName: string;

  @CreateDateColumn()
  createdAt: Date;
}
