"use client";

import { useTranslations } from "next-intl";
import BlacklistPage from "../_components/blacklist/BlacklistPage";
import Header from "../_components/header/Header";
import Footer from "../_components/footer/Footer";

const ClientPage = () => {
  return (
    <div>
      <Header />
      <BlacklistPage />
      <Footer />
    </div>
  );
};

export default ClientPage;
