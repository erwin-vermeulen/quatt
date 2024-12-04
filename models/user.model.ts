export interface UserDetails {
    id?: number;
    name: string;
    email: string;
    gender: 'male' | 'female';
    status: 'active' | 'inactive';
  }

export interface UpdateUserDetails {
    id?: number;
    name?: string;
    email?: string;
    gender?: 'male' | 'female';
    status?: 'active' | 'inactive';
  }