export interface Blog {
    _id?: string;
    title: string;
    slug: string;
    author: string;
    shortDescription: string;
    createdAt?: Date;
    updatedAt?: Date;
    comment?: any[];
  }