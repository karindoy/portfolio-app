import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Contact - Suellen Karin Oliveira Doy",
  description:
    "Get in touch with Suellen Karin Oliveira Doy, Senior Software Engineer specializing in Java, Kotlin, and blockchain systems",
};

const ContactPage = () => {
  redirect("/#contact");
};

export default ContactPage;
