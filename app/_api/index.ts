import type {
    Fact,
    ResponseData
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

export const getFactChecks = (): Promise<Fact[]> =>
    getEntities("api/fact-checks?populate=*").then((d: ResponseData) => {
        console.log(d)
        return d.data
    });
