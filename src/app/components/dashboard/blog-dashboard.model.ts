export class BlogsModel{
    _id ?: string;
    title: string = '';
    slug: string = '';
    author: string = '';
    shortDescription: string = '';
    createdAt?: Date = new Date();
    updatedAt?: Date = new Date();
}