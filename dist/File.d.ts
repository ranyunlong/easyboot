export declare class File {
    size: number;
    path: string;
    name: string;
    type: string;
    lastModifiedDate?: Date;
    hash?: string;
    toJSON(): Object;
}