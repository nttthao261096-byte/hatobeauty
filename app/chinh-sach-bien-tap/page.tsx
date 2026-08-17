import type { Metadata } from "next"; import { TrustPage } from "../seo-pages";
export const metadata:Metadata={title:"Chính sách biên tập",description:"Nguyên tắc xây dựng và kiểm chứng nội dung kiến thức của hato Beauty.",alternates:{canonical:"/chinh-sach-bien-tap/"}}; export default function Page(){return <TrustPage lang="vi" kind="editorial"/>}
