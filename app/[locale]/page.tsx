"use client";

import { useTranslations } from "next-intl";
import BlacklistPage from "../_components/blacklist/BlacklistPage";
import Header from "../_components/header/Header";
import Footer from "../_components/footer/Footer";

const ClientPage = () => {
  const t = useTranslations("HomePage");
  return (
    <div>
      <Header />
      <BlacklistPage />
      <Footer />
    </div>
  );
};

export default ClientPage;
