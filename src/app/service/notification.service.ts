import {EventEmitter, Injectable, Output} from '@angular/core';
import {INotification, NotificationType} from "../model/notification.model";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  @Output()
  private notification$: EventEmitter<INotification> = new EventEmitter();

  success(title: string, message: string) {
    this.notify(title, message, NotificationType.success);
  }

  info(title: string, message: string) {
    this.notify(title, message, NotificationType.information);
  }

  warning(title: string, message: string) {
    this.notify(title, message, NotificationType.warning);
  }

  error(title: string, message: string) {
    this.notify(title, message, NotificationType.error);
  }

  private notify(title: string, message: string, type: NotificationType) {
    this.notification$.emit({
      message: message,
      type: type,
      title: title
    } as INotification);

  }

  get notification() {
    return this.notification$.asObservable();
  }
}
