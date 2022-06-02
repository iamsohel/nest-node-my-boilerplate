import { TypeOrmModuleOptions } from "@nestjs/typeorm";
export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'mysql',
    host: 'localhost',
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : null,
    username: 'root',
    password: 'example',
    database: process.env.DB_NAME,
    entities: [__dirname + '/src/**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
    migrationsRun: false,
    cli: {
      entitiesDir: 'src',
      migrationsDir: 'migrations',
    },
    // Timezone configured on the MySQL server.
    // This is used to typecast server date/time values to JavaScript Date object and vice versa.
    timezone: 'Z',
    synchronize: true,
    debug: process.env.NODE_ENV === 'development' ? true : false,
  };
  