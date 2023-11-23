// Strapi Basic Types
type StrapiResponse<T> = {
    data: T[];
    meta: {
        pagination: {
            page: number;
            pageSize: number;
            pageCount: number;
            total: number;
        };
    };
};

export type StrapiEntity<T> = {
    id: number;
    attributes: BaseAttributes & T;
};

type BaseAttributes = {
    createdAt: Date;
    updatedAt: Date;
    publishedAt: Date;
};

// Fact Checks
export type FetchFactChecks = StrapiResponse<FactCheck>;
export type FactCheck = StrapiEntity<{
    title: string;
    claimSource: string;
    rating: boolean;
    checkedBy: string;
    fullContent: string | null;
    shortContent: string;
    image: {
        data: StrapiEntity<{
            name: string;
            alternativeText: null | string;
            caption: null;
            width: number;
            height: number;
            hash: string;
            size: number;
            url: string;
        }>;
    };
}>;