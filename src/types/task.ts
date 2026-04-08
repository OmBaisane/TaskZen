export type Status = "pending" | "done";

export interface Task {
  id: number;
  text: string;
  status: Status;
}
