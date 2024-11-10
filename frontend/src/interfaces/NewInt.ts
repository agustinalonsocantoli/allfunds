import { UserInt } from "./UserInt";

export interface NewInt {
    _id: string;
    title: string;
    description: string;
    category: string;
    image: string;
    content: string;
    author: UserInt;
    archiveDate: Date;
    createdAt: Date;
}