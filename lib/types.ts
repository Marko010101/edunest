export interface University {
  id: string
  slug: string
  name: string
  location: string
  established: number
  programs: string[]
  annualFee: {
    min: number
    max: number
    currency: string
  }
  ranking?: string
  accreditation: string[]
  imageUrl: string
  featured: boolean
  description: string
  highlights: string[]
}

export interface Service {
  id: string
  iconName: string
  title: string
  description: string
}

export interface FAQ {
  id: string
  question: string
  answer: string
  category: string
}

export interface Testimonial {
  id: string
  name: string
  program: string
  university: string
  year: string
  text: string
  avatarInitials: string
}

export interface ContactFormData {
  name: string
  email: string
  phone: string
  program: string
  message: string
}
