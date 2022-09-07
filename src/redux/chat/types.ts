export type Chat = {
    name: string;
    uid: string;
}

export type Message = {
    text: string;
    uid: string;
    media: string | null;
    avatar: { url: string, size: number }
    createdAt: any;
}

export type Profile = {
    name: string;
    avatar: { url: string; size: number };
    uid: string
}

export interface ChatSliceState {
    chat: Chat | null;
    messages: Message[];
    profile: Profile | null
    isModal: boolean
}