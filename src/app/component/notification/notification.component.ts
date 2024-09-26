import {Component, OnDestroy, OnInit} from '@angular/core';
import {takeWhile} from "rxjs";
import {NotificationService} from "../../service/notification.service";
import {INotification, NotificationType} from "../../model/notification.model";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit, OnDestroy {

  constructor(
    private service: NotificationService) {
  }

  private _subscribed: boolean = true;

  notifications: INotification[] = [];

  notificationTypes = NotificationType;

  ngOnInit(): void {
    this.service.notification
      .pipe(takeWhile(() => this._subscribed))
      .subscribe(notification => {
        if (notification) this.showNotification(notification);
      });
  }

  ngOnDestroy() {
    this._subscribed = false;
    this.notifications = [];
  }


  private showNotification(notification: INotification) {
    this.notifications.push(notification);
  }

  onCloseNotification(indexToRemove: number) {
    this.notifications.splice(indexToRemove, 1);
  }

}
