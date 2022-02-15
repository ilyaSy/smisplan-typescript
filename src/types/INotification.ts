export interface INotification {
  type: "error" | "success" | "warning" | "info";
  message: string;
  description?: string;
  duration?: number;
}
