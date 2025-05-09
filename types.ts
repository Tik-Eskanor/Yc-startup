type Author=
{
    id: string|null|undefined,
    name: string|null|undefined,
    userName: string|null|undefined,
    email: string|null|undefined,
    image: string|null|undefined,
    bio: string|null|undefined,
    _id?: string,
    __v?: number
}

type Startup=
{
    _id: string,
    title: string,
    slug: string,
    author:Author,
    email: string,
    views: number,
    description: string,
    category:string,
    image: string,
    pitch: string,
    createdAt: string,
    updatedAt: string,
    __v: number
}