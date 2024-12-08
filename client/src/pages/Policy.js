import React from "react";
import Layout from "../components/layout/Layout";

const Policy = () => {
  return (
    <Layout title={"privacy policy"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/contactus.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <p>
            This website is a personal project, and while it is not an official
            e-commerce platform, I value your trust.
          </p>
          <p>
            This site does collect personal data like email to login or register
            in to web site.
          </p>
          <p>
            Any information shared will solely be used to improve the website or
            respond to inquiries and will not be sold, shared, or used for
            marketing purposes.
          </p>
          <p>This policy reflects the nature of this personal project and may be updated as needed.</p>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;
