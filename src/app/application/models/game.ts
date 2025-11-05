import { Category } from "./category";

export interface Game {
    id:string ;
    name: string;
    price:number;
    madeIn:string;
    category:Category;
    isNew:boolean;
    shops?: string[];
}
