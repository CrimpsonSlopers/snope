import type {
    FactCheck,
    FetchFactChecks
} from "./types";

const STRAPI_URL = process.env.API_URL;
const CDN_URL = process.env.NEXT_PUBLIC_CDN_URL;

const joinApiUrl = (path: string) => `${STRAPI_URL}/${path}`;
export const getStrapiMedia = (url: string) => `${CDN_URL}${url}`;


const getBaseOptions = () => ({
    headers: {
        "Content-type": "application/json",
    },
});

const getEntities = (url: string) =>
    fetch(joinApiUrl(url)).then((r) => r.json());

export const getFactChecks = (): Promise<FactCheck[]> =>
    getEntities("api/fact-checks?populate=*").then((d: FetchFactChecks) => d.data);
