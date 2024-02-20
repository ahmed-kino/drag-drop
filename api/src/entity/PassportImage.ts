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

  @Column({ type: "bytea" })
  imageData: Buffer;

  @Column()
  fileName: string;

  @Column()
  fileType: string;

  @Column()
  dateOfBirth: string;

  @Column()
  expiryDate: string;

  @CreateDateColumn()
  createdAt: Date;
}
