import postgres from 'postgres';
export declare const db: import("drizzle-orm/postgres-js").PostgresJsDatabase<Record<string, never>> & {
    $client: postgres.Sql<{}>;
};
export declare function runMigrations(): Promise<void>;
export declare function closeConnection(): Promise<void>;
//# sourceMappingURL=config.d.ts.map