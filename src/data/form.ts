import { FormDataType } from "@/components/form/type";
import { z } from "zod";

export const contactForm: FormDataType[] = [
  {
    id: "facebook",
    type: "text",
    label: "Facebook",
    placeholder: "Enter your Facebook profile link",
  },
  {
    id: "line",
    type: "text",
    label: "Line",
    placeholder: "Enter your Line ID",
  },
  {
    id: "instagram",
    type: "text",
    label: "Instagram",
    placeholder: "@yourusername",
  },
  {
    id: "other",
    type: "textarea",
    label: "Other",
    placeholder: "Enter other contact details",
  },
];

export const personalInfoForm: FormDataType[] = [
  {
    id: "displayName",
    type: "text",
    label: "Display Name",
    placeholder: "Enter your name",
    required: true,
  },
  {
    id: "bio",
    type: "textarea",
    label: "Bio",
    placeholder: "Enter your bio",
  },
];

export const nisitInfoForm: FormDataType[] = [
  {
    id: "faculty",
    type: "combobox",
    label: "Faculty",
    placeholder: "Select your faculty",
    data: [
      { value: "agriculture", label: "Agriculture" },
      { value: "business-administration", label: "Business Administration" },
      { value: "fisheries", label: "Fisheries" },
      { value: "humanities", label: "Humanities" },
      { value: "forestry", label: "Forestry" },
      { value: "science", label: "Science" },
      { value: "engineering", label: "Engineering" },
      { value: "education", label: "Education" },
      { value: "economics", label: "Economics" },
      { value: "architecture", label: "Architecture" },
      { value: "social-sciences", label: "Social Sciences" },
      { value: "veterinary-medicine", label: "Veterinary Medicine" },
      { value: "agro-industry", label: "Agro-Industry" },
      { value: "veterinary-technology", label: "Veterinary Technology" },
      { value: "environment", label: "Environment" },
    ],
  },
  {
    id: "department",
    type: "combobox",
    label: "Department",
    placeholder: "Select your department",
    data: [],
  },
  {
    id: "year",
    type: "select",
    label: "Year of Study",
    placeholder: "Select year",
    data: [
      { value: "1", label: "1st year" },
      { value: "2", label: "2nd year" },
      { value: "3", label: "3rd year" },
      { value: "4", label: "4th year" },
      { value: ">4", label: "More than 4 years" },
      { value: "graduated", label: "Graduated" },
    ],
  },
];

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

export type SystemInterest = {
  id: string,
  name: string,
}

/**
 * Interests form take system interests and return form data
 * 
 * @param systemInterests - data from backend
 * @returns form data
 */
export const interestsForm = (systemInterests: SystemInterest[]) => [
  {
    id: "interests",
    type: "pill",
    data: systemInterests.map((interest) => ({
      value: interest.id,
      label: interest.name,
    })),
  },
];

export const formSchema = z.object({
  faculty: z.string(),
  department: z.string(),
  year: z.string(),
  displayName: z.string(),
  bio: z.string(),
  line: z.string(),
  facebook: z.string(),
  instagram: z.string(),
  other: z.string(),
  interests: z.array(z.string()),
});

export type ProfileForm = z.infer<typeof formSchema>;