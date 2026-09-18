import Link from "next/link";
import {
  approvedServiceOptions,
  commercialNotice,
  publicServiceCatalog,
  serviceFacts,
} from "./business-data";
import { bookingPath } from "./route-paths";
import { servicePath, type SeoLang } from "./seo-data";

export function ServicePriceTable({ lang }: { lang: SeoLang }) {
  return (
    <section
      className="service-price-table"
      aria-labelledby="price-table-title"
    >
      <h2 id="price-table-title">
        {lang === "vi" ? "Dịch vụ & lựa chọn" : "Services & options"}
      </h2>
      <p>{commercialNotice[lang]}</p>
      <div
        className="table-scroll"
        tabIndex={0}
        role="region"
        aria-label={
          lang === "vi"
            ? "Bảng dịch vụ, cuộn ngang nếu cần"
            : "Service table, scroll horizontally if needed"
        }
      >
        <table>
          <caption className="sr-only">
            {lang === "vi"
              ? "Dịch vụ, giá và thời lượng"
              : "Services, pricing and duration"}
          </caption>
          <thead>
            <tr>
              <th scope="col">{lang === "vi" ? "Dịch vụ" : "Service"}</th>
              <th scope="col">{lang === "vi" ? "Giá" : "Price"}</th>
              <th scope="col">{lang === "vi" ? "Thời lượng" : "Duration"}</th>
              <th scope="col">{lang === "vi" ? "Đặt lịch" : "Request"}</th>
            </tr>
          </thead>
          <tbody>
            {publicServiceCatalog.map((service) => {
              const [price, duration] = serviceFacts(service.id, lang);
              return (
                <tr key={service.id}>
                  <th scope="row">
                    <Link href={servicePath(service, lang)}>
                      {service[lang].name}
                    </Link>
                    {approvedServiceOptions(service.id).map((option) => (
                      <div key={option.id}>
                        <Link href={bookingPath(lang, service.id, option.id)}>
                          {option.name[lang]}
                        </Link>
                      </div>
                    ))}
                  </th>
                  <td>{price}</td>
                  <td>{duration}</td>
                  <td>
                    <Link href={bookingPath(lang, service.id)}>
                      {lang === "vi" ? "Gửi yêu cầu" : "Request appointment"}
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
