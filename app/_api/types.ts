
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
    formats: {
        thumbnail: ImageFormat;
        small: ImageFormat;
    };
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: string | null;
    provider: string;
    provider_metadata: any; // You might want to define this type if available
    createdAt: string;
    updatedAt: string;
}

export type Fact = {
    id: number;
    attributes: {
        title: string;
        claimSource: string;
        rating: boolean;
        checkedBy: string;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
        shortContent: string;
        image: {
            data: {
                attributes: ImageAttributes;
            };
        };
    };
}

export interface ResponseData {
    data: Fact[];
    meta: {
        page: number;
        pageSize: number;
        pageCount: number;
        total: number;
    };
}