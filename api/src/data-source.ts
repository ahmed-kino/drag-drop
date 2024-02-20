import { DataSource } from "typeorm";
import { PassportImage } from "./entity/PassportImage";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "postgres-db",
  port: 5432,
  username: "borderless",
  password: "admin",
  database: "borderless",
  synchronize: true,
  logging: true,
  entities: [PassportImage],
  migrations: [],
  subscribers: [],
});
