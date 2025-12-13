// data/users.ts
export interface UserModel {
  id?: string
  image?: string
  name: string
  phone: string
  email: string
  gender: "male" | "female" | "other" | ""
  dob: string
}
