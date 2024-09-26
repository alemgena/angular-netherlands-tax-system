import { Injectable } from '@angular/core';
import {formatDate} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class DateConvertService {

  convertDate(dateString: string | undefined) {
    if (dateString != null) {
      const [day, month, year] = dateString.split('-').map(Number);
      const date = new Date(year, month - 1, day, 12, 0, 0);

      const formattedDate = formatDate(date, "yyyy-MM-dd'T'HH:mm:ss", 'en-US');
      const timezoneOffset = '+01:00';

      return formattedDate + timezoneOffset;
    }
  }
}
