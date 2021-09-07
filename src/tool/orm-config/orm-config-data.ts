export interface ORMConfigData {
    name?: string;
    type: string;
    host: string;
    database: string;
    migrations: string[];
    entities:   string[];
    cli?: {
        migrationsDir: string;
        entitiesDir:   string;
    };
}
