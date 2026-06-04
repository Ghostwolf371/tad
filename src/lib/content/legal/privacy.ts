export type LegalSection = { title: string; paragraphs: string[]; list?: string[] };

export const privacyPolicy = {
  title: "Privacy Policy",
  intro:
    "At TAD, accessible from https://www.tad.sr, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by TAD and how we use it. If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us. This Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collect in TAD. This policy is not applicable to any information collected offline or via channels other than this website.",
  sections: [
    {
      title: "Consent",
      paragraphs: [
        "By using our website, you hereby consent to our Privacy Policy and agree to its terms.",
      ],
    },
    {
      title: "Information we collect",
      paragraphs: [
        "The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.",
        "If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.",
        "When you register for an Account, we may ask for your contact information, including items such as name, company name, address, email address, and telephone number.",
      ],
    },
    {
      title: "How we use your information",
      paragraphs: ["We use the information we collect in various ways, including to:"],
      list: [
        "Provide, operate, and maintain our website",
        "Improve, personalize, and expand our website",
        "Understand and analyze how you use our website",
        "Develop new products, services, features, and functionality",
        "Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes",
        "Send you emails",
        "Find and prevent fraud",
      ],
    },
    {
      title: "Log Files",
      paragraphs: [
        "TAD follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information.",
      ],
    },
    {
      title: "Google DoubleClick DART Cookie",
      paragraphs: [
        "Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to www.website.com and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy.",
      ],
    },
    {
      title: "Advertising Partners Privacy Policies",
      paragraphs: [
        "You may consult this list to find the Privacy Policy for each of the advertising partners of TAD. Third-party ad servers or ad networks uses technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on TAD, which are sent directly to users' browser. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit. Note that TAD has no access to or control over these cookies that are used by third-party advertisers.",
      ],
    },
    {
      title: "Third Party Privacy Policies",
      paragraphs: [
        "TAD's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options. You can choose to disable cookies through your individual browser options.",
      ],
    },
    {
      title: "CCPA Privacy Rights (Do Not Sell My Personal Information)",
      paragraphs: [
        "Under the CCPA, among other rights, California consumers have the right to request that a business that collects a consumer's personal data disclose the categories and specific pieces of personal data that a business has collected about consumers; request that a business delete any personal data about the consumer that a business has collected; and request that a business that sells a consumer's personal data, not sell the consumer's personal data. If you make a request, we have one month to respond to you.",
      ],
    },
    {
      title: "GDPR Data Protection Rights",
      paragraphs: [
        "We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following: the right to access, rectification, erasure, restrict processing, object to processing, and data portability. If you make a request, we have one month to respond to you.",
      ],
    },
    {
      title: "Children's Information",
      paragraphs: [
        "Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity. TAD does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.",
      ],
    },
  ] satisfies LegalSection[],
};
