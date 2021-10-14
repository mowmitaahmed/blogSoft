export class BlogsModel{
    _id: number = 0;
    title: string = '';
    slug: string = '';
    author: string = '';
    shortDescription: string = '';
    createdAt?: Date = new Date();
    updatedAt?: Date = new Date();
}