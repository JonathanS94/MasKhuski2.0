import React from "react";

// core components
//import IndexNavbar from "components/Navbars/IndexNavbar.js";
import PageHeader from "components/PageHeader/PageHeader.js";
//import Footer from "components/Footer/Footer.js";

// sections for this page/view
//import Basics from "views/IndexSections/Basics.js";

export default function Index() {
  React.useEffect(() => {
    document.body.classList.toggle("index-page");
    // Specify how to clean up after this effect:
    return function cleanup() {
      document.body.classList.toggle("index-page");
    };
  }, []);
  return (
    <>
      <PageHeader />
    </>
  );
}
