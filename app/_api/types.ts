
type ImageFormat = {
    name: string;
    hash: string;
    ext: string;
    mime: string;
    path: string | null;
    width: number;
    height: number;
    size: number;
    url: string;
}

type ImageAttributes = {
    id: number;
    name: string;
    alternativeText: string | null;
    caption: string | null;
    width: number;
    height: number;
    url: string;
}

export interface Fact {
    id: number;
    attributes: {
        title: string;
        claimSource: string;
        rating: boolean;
        checkedBy: string;
        shortContent: string;
        article: string;
        image: {
            data: {
                id: number;
                attributes: ImageAttributes;
            };
        };
    };
}

export type Facts = Fact[];

export interface ResponseData {
    data: Facts;
    meta: {
        page: number;
        pageSize: number;
        pageCount: number;
        total: number;
    };
}