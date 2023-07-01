import React from "react";
import { Provider } from "react-redux";
import Head from "next/head";
import { ThemeProvider } from "next-themes";
import { useRouter } from "next/router"; 
import Header from "../header";
import store from "../../store/index";
import Footer from "../footer";
import { ToastContainer } from "react-toastify";
import { useLanguage } from "../../hooks/useLanguage";
import NextNProgress from "nextjs-progressbar";
import cs from 'classnames'

const Layout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const { locale } = useLanguage();
  const router = useRouter();
  const isHomepage = router.pathname === "/";
  const paddingStyles = 'px-5 xl:px-16'

  return (
    <Provider store={store}>
      <ThemeProvider enableSystem={true}>
        <Head>
          <title>GeoShopr</title>
        </Head>
        <div className="flex flex-col min-h-[100vh]">
          <NextNProgress height={7} />
          <Header />
          <main className={cs('flex-grow',{[paddingStyles]:!isHomepage})}>{children}</main>
          {/* <Footer /> */}
        </div>
        <ToastContainer
          autoClose={2000}
          hideProgressBar={true}
          rtl={locale === "en" ? false : true}
          position={locale === "en" ? "top-right" : "top-left"}
        />
      </ThemeProvider>
    </Provider>
  );
};

export default Layout;
