export interface UserType {
  id: number;
  name: string;
  image?: string;
  lastSeen?: string;
  userId?: string;
  bio?: string;
  phoneNumber?: string;
}

export interface MessageType {
  id: number;
  text: string;
  date: string;
  sender: UserType;
  seen: boolean;
}
export interface ConversationType {
  id: number;
  users: UserType[];
  messages: MessageType[];
}
