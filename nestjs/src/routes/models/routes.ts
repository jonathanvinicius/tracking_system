import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity({ name: 'routes' })
export class Route {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('json')
  source: any;

  @Column('json')
  destination: any;

  @Column('float')
  distance: number;

  @Column('float')
  duration: number;

  @Column('json')
  directions: any;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  generateId() {
    if (this.id) {
      return;
    }

    this.id = uuidv4();
  }
}
