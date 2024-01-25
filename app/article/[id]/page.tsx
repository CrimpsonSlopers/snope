
'use client'
import { Fact } from '@/app/_api/types';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown'


export default function Page({ params }: { params: { id: string } }) {
    const [post, setPost] = useState<Fact | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetch(`http://localhost:1337/api/fact-checks/${params.id}`).then((res) => res.json())
            setPost(data.data)
        }
        fetchData()
    }, [])
    if (post) {
        return <ReactMarkdown>{post.attributes?.article}</ReactMarkdown>
    }

}