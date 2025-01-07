import { z } from "zod";
import { OnboardingData } from "./type";
import {
  contactForm,
  interestsForm,
  nisitInfoForm,
  personalInfoForm,
} from "@/data/form";

export const fieldOfStudy: {
  [key: string]: { value: string; label: string }[];
} = {
  agriculture: [
    { value: "entomology", label: "Entomology" },
    { value: "farm-mechanics", label: "Farm Mechanics" },
    { value: "home-economics", label: "Home Economics" },
    { value: "soil-science", label: "Soil Science" },
    { value: "agronomy", label: "Agronomy" },
    { value: "horticulture", label: "Horticulture" },
    { value: "plant-pathology", label: "Plant Pathology" },
    {
      value: "agricultural-extension-and-communication",
      label: "Agricultural Extension and Communication",
    },
    { value: "animal-science", label: "Animal Science" },
  ],
  "business-administration": [
    { value: "finance", label: "Finance" },
    { value: "marketing", label: "Marketing" },
    { value: "management", label: "Management" },
    { value: "accounting", label: "Accounting" },
    {
      value: "technology-and-operations-management",
      label: "Technology and Operations Management",
    },
  ],
  fisheries: [
    { value: "fishery-management", label: "Fishery Management" },
    { value: "fishery-biology", label: "Fishery Biology" },
    { value: "fishery-products", label: "Fishery Products" },
    { value: "aquaculture", label: "Aquaculture" },
    { value: "marine-science", label: "Marine Science" },
  ],
  humanities: [
    { value: "music", label: "Music" },
    {
      value: "communication-arts-and-information-science",
      label: "Communication Arts and Information Science",
    },
    { value: "foreign-languages", label: "Foreign Languages" },
    { value: "literature", label: "Literature" },
    { value: "linguistics", label: "Linguistics" },
    { value: "thai-language", label: "Thai Language" },
    { value: "eastern-languages", label: "Eastern Languages" },
    { value: "philosophy-and-religion", label: "Philosophy and Religion" },
    {
      value: "tourism-and-hospitality-industry",
      label: "Tourism and Hospitality Industry",
    },
  ],
  forestry: [
    { value: "forest-management", label: "Forest Management" },
    { value: "forest-biology", label: "Forest Biology" },
    { value: "forest-engineering", label: "Forest Engineering" },
    { value: "forest-products", label: "Forest Products" },
    { value: "silviculture", label: "Silviculture" },
    { value: "conservation", label: "Conservation" },
  ],
  science: [
    { value: "mathematics", label: "Mathematics" },
    { value: "chemistry", label: "Chemistry" },
    { value: "microbiology", label: "Microbiology" },
    { value: "biochemistry", label: "Biochemistry" },
    { value: "botany", label: "Botany" },
    { value: "genetics", label: "Genetics" },
    { value: "physics", label: "Physics" },
    {
      value: "applied-radiation-and-isotope",
      label: "Applied Radiation and Isotope",
    },
    { value: "computer-science", label: "Computer Science" },
    { value: "earth-science", label: "Earth Science" },
    { value: "materials-science", label: "Materials Science" },
    { value: "statistics", label: "Statistics" },
    { value: "zoology", label: "Zoology" },
  ],
  engineering: [
    { value: "aerospace-engineering", label: "Aerospace Engineering" },
    { value: "computer-engineering", label: "Computer Engineering" },
    { value: "chemical-engineering", label: "Chemical Engineering" },
    { value: "mechanical-engineering", label: "Mechanical Engineering" },
    {
      value: "water-resources-engineering",
      label: "Water Resources Engineering",
    },
    { value: "electrical-engineering", label: "Electrical Engineering" },
    { value: "materials-engineering", label: "Materials Engineering" },
    { value: "civil-engineering", label: "Civil Engineering" },
    { value: "environmental-engineering", label: "Environmental Engineering" },
    { value: "industrial-engineering", label: "Industrial Engineering" },
  ],
  education: [
    { value: "education", label: "Education" },
    {
      value: "educational-psychology-and-guidance",
      label: "Educational Psychology and Guidance",
    },
    { value: "educational-technology", label: "Educational Technology" },
    { value: "physical-education", label: "Physical Education" },
    { value: "vocational-education", label: "Vocational Education" },
  ],
  economics: [
    { value: "economics", label: "Economics" },
    {
      value: "agricultural-and-resource-economics",
      label: "Agricultural and Resource Economics",
    },
    { value: "cooperative", label: "Cooperative" },
  ],
  architecture: [
    { value: "architecture", label: "Architecture" },
    { value: "landscape-architecture", label: "Landscape Architecture" },
    {
      value: "building-innovation-and-technology",
      label: "Building Innovation and Technology",
    },
  ],
  "social-sciences": [
    { value: "psychology", label: "Psychology" },
    { value: "law", label: "Law" },
    { value: "history", label: "History" },
    { value: "geography", label: "Geography" },
    {
      value: "political-science-and-public-administration",
      label: "Political Science and Public Administration",
    },
    {
      value: "sociology-and-anthropology",
      label: "Sociology and Anthropology",
    },
  ],
  "veterinary-medicine": [
    { value: "anatomy", label: "Anatomy" },
    { value: "physiology", label: "Physiology" },
    {
      value: "microbiology-and-immunology",
      label: "Microbiology and Immunology",
    },
    { value: "pharmacology", label: "Pharmacology" },
    { value: "pathology", label: "Pathology" },
    { value: "parasitology", label: "Parasitology" },
    { value: "veterinary-public-health", label: "Veterinary Public Health" },
    {
      value: "companion-animals-clinical-sciences",
      label: "Companion Animals Clinical Sciences",
    },
    {
      value: "farm-resources-and-production-medicine",
      label: "Farm Resources and Production Medicine",
    },
    {
      value: "large-animal-and-wildlife-clinical-science",
      label: "Large Animal and Wildlife Clinical Science",
    },
  ],
  "agro-industry": [
    {
      value: "agro-industrial-technology",
      label: "Agro-Industrial Technology",
    },
    { value: "biotechnology", label: "Biotechnology" },
    {
      value: "food-science-and-technology",
      label: "Food Science & Technology",
    },
    {
      value: "packaging-and-materials-technology",
      label: "Packaging & Materials Technology",
    },
    { value: "product-development", label: "Product Development" },
    { value: "textile-science", label: "Textile Science" },
    {
      value: "agro-industrial-innovation-and-technology",
      label: "Agro-Industrial Innovation and Technology",
    },
  ],
  "veterinary-technology": [
    { value: "veterinary-technology", label: "Veterinary Technology" },
    { value: "animal-nursing", label: "Animal Nursing" },
  ],
  environment: [
    {
      value: "environmental-technology-and-management",
      label: "Environmental Technology and Management",
    },
    { value: "environmental-science", label: "Environmental Science" },
  ],
};

export const data: OnboardingData = {
  steps: [
    {
      step: 1,
      title:
        "Welcome to KU Connect,\n<green>Winai Klahan!<green>\nLet's set up your profile.",
      description: "",
      skippable: false,
      card: true,
      group: [
        {
          form: nisitInfoForm,
        },
      ],
    },
    {
      step: 2,
      skippable: true,
      card: true,
      title: "Tell us more about yourself",
      description:
        "Add optional details to personalize your profile. You can skip this step if you'd like.",
      group: [
        {
          form: personalInfoForm,
        },
      ],
    },
    {
      step: 3,
      skippable: true,
      card: true,
      title: "How can people reach you?",
      description:
        "Add your contact details. People can only see this after you match with them.",
      group: [
        {
          form: contactForm,
        },
      ],
    },
    {
      step: 4,
      title: "What are you interested in?",
      description:
        "Choose what you're passionate about to find your perfect connections.",
      group: [
        {
          form: interestsForm,
        },
      ],
    },
  ],
};

export const formSchema = z.object({
  faculty: z.string().min(1, "Faculty should not be empty"),
  department: z.string().min(1, "Department should not be empty"),
  year: z.string().min(1, "Year should not be empty"),
  name: z.string(),
  bio: z.string(),
  birthday: z.date(),
  line: z.string(),
  facebook: z.string(),
  instagram: z.string(),
  other: z.string(),
  interests: z.array(z.string()),
});

export type ProfileForm = z.infer<typeof formSchema>;

export const defaultProfile = {
  faculty: "",
  department: "",
  year: "",
  name: "",
  bio: "",
  birthdate: undefined,
  line: "",
  facebook: "",
  instagram: "",
  other: "",
  interests: [],
};
