import type { Metadata } from "next"; import { TrustPage } from "../seo-pages";
export const metadata:Metadata={title:"Đặt lịch hato Beauty",description:"Gửi yêu cầu tư vấn và đặt lịch chăm sóc tại hato Beauty.",alternates:{canonical:"/dat-lich/",languages:{"vi-VN":"/dat-lich/",en:"/en/book/","x-default":"/dat-lich/"}}}; export default function Page(){return <TrustPage lang="vi" kind="book"/>}
