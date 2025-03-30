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
    description:
      "If left blank, your Google account name will be used by default.",
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
  id: string;
  name: string;
};

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

export function displayFacultyLabel(facultyValue: string): string {
  const faculties: any = {
    agriculture: "Agriculture",
    "business-administration": "Business Administration",
    fisheries: "Fisheries",
    humanities: "Humanities",
    forestry: "Forestry",
    science: "Science",
    engineering: "Engineering",
    education: "Education",
    economics: "Economics",
    architecture: "Architecture",
    "social-sciences": "Social Sciences",
    "veterinary-medicine": "Veterinary Medicine",
    "agro-industry": "Agro-Industry",
    "veterinary-technology": "Veterinary Technology",
    environment: "Environment",
  };

  return faculties[facultyValue] ? faculties[facultyValue] : "";
}

export function displayDepartmentLabel(departmentValue: string): string {
  const departments: any = {
    entomology: "Entomology",
    "farm-mechanics": "Farm Mechanics",
    "home-economics": "Home Economics",
    "soil-science": "Soil Science",
    agronomy: "Agronomy",
    horticulture: "Horticulture",
    "plant-pathology": "Plant Pathology",
    "agricultural-extension-and-communication":
      "Agricultural Extension and Communication",
    "animal-science": "Animal Science",
    finance: "Finance",
    marketing: "Marketing",
    management: "Management",
    accounting: "Accounting",
    "technology-and-operations-management":
      "Technology and Operations Management",
    "fishery-management": "Fishery Management",
    "fishery-biology": "Fishery Biology",
    "fishery-products": "Fishery Products",
    aquaculture: "Aquaculture",
    "marine-science": "Marine Science",
    music: "Music",
    "communication-arts-and-information-science":
      "Communication Arts and Information Science",
    "foreign-languages": "Foreign Languages",
    literature: "Literature",
    linguistics: "Linguistics",
    "thai-language": "Thai Language",
    "eastern-languages": "Eastern Languages",
    "philosophy-and-religion": "Philosophy and Religion",
    "tourism-and-hospitality-industry": "Tourism and Hospitality Industry",
    "forest-management": "Forest Management",
    "forest-biology": "Forest Biology",
    "forest-engineering": "Forest Engineering",
    "forest-products": "Forest Products",
    silviculture: "Silviculture",
    conservation: "Conservation",
    mathematics: "Mathematics",
    chemistry: "Chemistry",
    microbiology: "Microbiology",
    biochemistry: "Biochemistry",
    botany: "Botany",
    genetics: "Genetics",
    physics: "Physics",
    "applied-radiation-and-isotope": "Applied Radiation and Isotope",
    "computer-science": "Computer Science",
    "earth-science": "Earth Science",
    "materials-science": "Materials Science",
    statistics: "Statistics",
    zoology: "Zoology",
    "aerospace-engineering": "Aerospace Engineering",
    "computer-engineering": "Computer Engineering",
    "chemical-engineering": "Chemical Engineering",
    "mechanical-engineering": "Mechanical Engineering",
    "water-resources-engineering": "Water Resources Engineering",
    "electrical-engineering": "Electrical Engineering",
    "materials-engineering": "Materials Engineering",
    "civil-engineering": "Civil Engineering",
    "environmental-engineering": "Environmental Engineering",
    "industrial-engineering": "Industrial Engineering",
    education: "Education",
    "educational-psychology-and-guidance":
      "Educational Psychology and Guidance",
    "educational-technology": "Educational Technology",
    "physical-education": "Physical Education",
    "vocational-education": "Vocational Education",
    economics: "Economics",
    "agricultural-and-resource-economics":
      "Agricultural and Resource Economics",
    cooperative: "Cooperative",
    architecture: "Architecture",
    "landscape-architecture": "Landscape Architecture",
    "building-innovation-and-technology": "Building Innovation and Technology",
    psychology: "Psychology",
    law: "Law",
    history: "History",
    geography: "Geography",
    "political-science-and-public-administration":
      "Political Science and Public Administration",
    "sociology-and-anthropology": "Sociology and Anthropology",
    anatomy: "Anatomy",
    physiology: "Physiology",
    "microbiology-and-immunology": "Microbiology and Immunology",
    pharmacology: "Pharmacology",
    pathology: "Pathology",
    parasitology: "Parasitology",
    "veterinary-public-health": "Veterinary Public Health",
    "companion-animals-clinical-sciences":
      "Companion Animals Clinical Sciences",
    "farm-resources-and-production-medicine":
      "Farm Resources and Production Medicine",
    "large-animal-and-wildlife-clinical-science":
      "Large Animal and Wildlife Clinical Science",
    "agro-industrial-technology": "Agro-Industrial Technology",
    biotechnology: "Biotechnology",
    "food-science-and-technology": "Food Science & Technology",
    "packaging-and-materials-technology": "Packaging & Materials Technology",
    "product-development": "Product Development",
    "textile-science": "Textile Science",
    "agro-industrial-innovation-and-technology":
      "Agro-Industrial Innovation and Technology",
    "veterinary-technology": "Veterinary Technology",
    "animal-nursing": "Animal Nursing",
    "environmental-technology-and-management":
      "Environmental Technology and Management",
    "environmental-science": "Environmental Science",
  };

  return departments[departmentValue] ? departments[departmentValue] : "";
}

export function displayYearLabel(yearValue: string): string {
  const years: any = {
    "1": "1st year",
    "2": "2nd year",
    "3": "3rd year",
    "4": "4th year",
    ">4": "More than 4 years",
    graduated: "Graduated",
  };

  return years[yearValue] ? years[yearValue] : "";
}
