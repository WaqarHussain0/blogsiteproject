import React from "react";
import Row from "../../row";

const techData = [
  {
    "Artificial Intelligence": [
      "ChatGPT",
      "Conversational AI",
      "Deep Learning",
      "Large Language Models",
      "Machine Learning",
      "NLP",
    ],
  },
  {
    Programming: [
      "Android Development",
      "Coding",
      "Frontend Engineering",
      "Mobile Development",
      "Software Engineering",
      "Web Development",
    ],
  },
  {
    "Programming Languages": [
      "CSS",
      "HTML",
      "JavaScript",
      "Node.js",
      "React",
      "TypeScript",
    ],
  },
  {
    Blockchain: [
      "Bitcoin",
      "Cryptocurrency",
      "Decentralized Finance",
      "Ethereum",
      "NFT",
      "Web3",
    ],
  },

  {
    "Dev Ops": ["AWS", "Databricks", "Docker", "Kubernetes", "Terraform"],
  },
  {
    "Data Science": [
      "Analytics",
      "Data Engineering",
      "Data Visualization",
      "Database Design",
      "SQL",
    ],
  },
];

const TechTopics: React.FC = () => {
  return (
    <Row className="w-full justify-between items-start flex-wrap mt-4 ">
      {techData.map((data, index) => (
        <div key={index} className="flex w-[49%] md:w-[33%] mb-4">
          {Object.entries(data).map(([category, topics], idx) => (
            <div key={idx}>
              <h2 className="text-black my-2 text-[20px] md:text-[24px] text[#242424]">{category}</h2>
              <Row className="flex-col gap-2">
                {topics.map((topic: string, idx: string) => (
                  <p className="text-[16px] text-[#6b6b6b] pl-2 md:pl-4" key={idx}>
                    {topic}
                  </p>
                ))}
              </Row>
            </div>
          ))}
        </div>
      ))}
    </Row>
  );
};

export default TechTopics;
