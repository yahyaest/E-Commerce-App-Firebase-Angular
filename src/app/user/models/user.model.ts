type UserRole = 'USER' | 'PREMIUM_USER' | 'ADMIN' | 'OBSERVER'

export interface User {
  username: string;
  email: string;
  password: string;
  role:UserRole;
  photoURL?: string;
  emailVerified : boolean
}
