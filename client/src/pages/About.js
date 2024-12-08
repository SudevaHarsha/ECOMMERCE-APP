import React from "react";
import Layout from "../components/layout/Layout";

const About = () => {
  return (
    <Layout title={"About ecommerce"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/about.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <p className="text-justify mt-2">
            Welcome to my personal e-commerce project. This project is a personal endeavor to
            explore the world of e-commerce. Here, you'll find a curated
            collection of products that reflect my passion. Every
            item is thoughtfully selected to bring value for a online e-commerce web site. While
            not an official website, it showcases my dedication to crafting a
            meaningful shopping experience. Thank you for visiting and
            supporting this personal project!
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
