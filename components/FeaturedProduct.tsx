import { useEffect } from "react"
import { useRouter } from 'next/router'

export default function FeaturedProduct() {
    const router = useRouter();

    useEffect(() => {
        console.log(`Featured Product`, window.location);
        router.push(`/product`);
    }, [])

    return (
        <div>Featured Product</div>
    )
}