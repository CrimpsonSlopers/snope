'use client'
import { useState, useEffect } from 'react';

import Image from 'next/image'

import {
    getStrapiMedia,
    getFactChecks,

} from "./_api";

interface ImageFormat {
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

interface ImageAttributes {
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

interface Attributes {
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
}

interface Data {
    id: number;
    attributes: Attributes;
}

interface Pagination {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
}

interface Meta {
    pagination: Pagination;
}

interface ResponseData {
    data: Data[];
    meta: Meta;
}

export default function Home() {
    const [facts, setFacts] = useState<Data[]>([])

    useEffect(() => {
        fetch('http://localhost:1337/api/fact-checks?populate=*')
            .then((resp) => resp.json())
            .then((d) => setFacts(d.data))
    }, [])

    return (
        <main className="flex min-h-screen flex-col items-center justify-start p-8 gap-4">
            <div className="justify-center items-center gap-2.5 inline-flex mb-8">
                <img className="w-auto h-40" src="/Brand.png" alt="Atriopes" />
            </div>
            {facts.map((item, index) => {
                const contentImage = item.attributes.image.data.attributes;
                const pfpUrl = getStrapiMedia(contentImage.url);
                return (
                    <div key={index} className="max-w-lg mx-auto rounded-3xl overflow-hidden lg:max-w-4xl border border-gray-300 p-2 hover:bg-[#EED464] duration-300 hover:cursor-pointer">
                        <div className="lg:flex">
                            <div className="lg:shrink-0">
                                <img className="h-48 w-full object-cover lg:h-full lg:w-48 rounded-2xl aspect-square" src={pfpUrl} />
                            </div>
                            <div className="px-2">
                                <div className="self-stretch text-neutral-800 text-2xl font-bold mb-2">{item.attributes.title}</div>
                                <div className="text-black text-base font-normal mb-1">Source: {item.attributes.claimSource}</div>
                                <div className="w-36 justify-start items-center gap-2 inline-flex mb-1">
                                    <p className="text-black text-base font-normal">Rating: </p>
                                    {item.attributes.rating ?
                                        <>
                                            <p className="text-black text-base font-normal">True</p>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#00D26A" className="w-6 h-6">
                                                <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                                            </svg>
                                        </>
                                        :
                                        <>
                                            <p className="text-black text-base font-normal">False</p>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#F76E5F" className="w-6 h-6">
                                                <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clipRule="evenodd" />
                                            </svg>
                                        </>
                                    }
                                </div>
                                <div className="content self-stretch text-zinc-900 text-base font-normal mb-2">{item.attributes.shortContent}</div>
                                <div className="w-96 text-zinc-500 text-sm font-normal">Fact checked by: {item.attributes.checkedBy}</div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </main>
    )
}
