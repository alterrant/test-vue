export interface ProfileSocial {
  github: string
  linkedin: string
  twitter: string
}

export interface Profile {
  id: number
  heroTitle: string
  name: string
  tagline: string
  bio: string
  email: string
  location: string
  image: string
  social: ProfileSocial
}
