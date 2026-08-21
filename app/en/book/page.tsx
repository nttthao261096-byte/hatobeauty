import type { Metadata } from "next"; import { TrustPage } from "../../seo-pages";
export const metadata:Metadata={title:"Book hato Beauty",description:"Send a consultation and appointment request to hato Beauty.",alternates:{canonical:"/en/book/",languages:{"vi-VN":"/dat-lich/",en:"/en/book/","x-default":"/dat-lich/"}}}; export default function Page(){return <TrustPage lang="en" kind="book"/>}
