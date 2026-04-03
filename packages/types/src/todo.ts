export type Todo = {
  id: string;
  title: string;
  isCompleted: boolean;
  createdAt: string; // ISO 8601 format in UTC
  updatedAt: string; // ISO 8601 format in UTC
};
