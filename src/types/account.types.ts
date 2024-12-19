export interface User {
  id: number;
  userId: string;
  email: string;
  password: string;
  appList: number[]; 
}
export interface App {
  id: number;
  name: string;
  icon?: string;
  color?: string;
}