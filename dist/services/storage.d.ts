export declare class StorageService {
    static saveMedia(channel_id: bigint, channel_message_id: bigint, url: string, media: any): Promise<any>;
    static getMediaByUrl(url: string): Promise<{
        id: number;
        channel_id: bigint;
        channel_message_id: bigint;
        url: string;
        media: unknown;
        createdAt: Date | null;
        updatedAt: Date | null;
    }[]>;
}
//# sourceMappingURL=storage.d.ts.map