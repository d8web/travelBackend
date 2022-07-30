export interface FeedType {
    id?: string;
    authorId: string;
    type: "photo" | "video" | "text";
    body: string;
}