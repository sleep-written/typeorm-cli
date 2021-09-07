export interface TSConfigData {
    compilerOptions?: {
        outDir?: string;
        rootDir?: string;
        baseUrl?: string;
        paths?: {
            [key: string]: string[];
        }
    }
}
