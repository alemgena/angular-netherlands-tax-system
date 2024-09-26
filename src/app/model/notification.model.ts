export interface INotification {
  message: string,
  title: string,
  type: NotificationType
}
export enum NotificationType {
  information,
  warning,
  suggestion,
  success,
  error
}
