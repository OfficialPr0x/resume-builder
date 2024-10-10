export interface ResumeData {
  personalInfo: {
    name: string
    email: string
    phone: string
    location: string
    title: string
  }
  summary: string
  experience: {
    title: string
    company: string
    date: string
    responsibilities: string[]
  }[]
  education: {
    degree: string
    school: string
    date: string
  }[]
  skills: string[]
  languages: {
    name: string
    proficiency: string
  }[]
  interests: string[]
  organizations: string[]
  certificates: string[]
}