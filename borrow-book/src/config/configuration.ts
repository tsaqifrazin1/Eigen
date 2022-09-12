export default () => ({
  synchronize: JSON.parse(process.env.DB_SYNCHRONIZE),
  runMigrations: JSON.parse(process.env.DB_MIGRATIONS_RUN),
});
