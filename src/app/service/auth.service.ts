import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "@belastingdienst/bldc-components";
import {ConfigService} from "./config.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
              private configService: ConfigService) {
  }

  login(username: string, password: string) {
    return this.http.post<User>(this.configService.apiConfiguration.baseUrl + '/jwt/login', {username, password});
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  setGroups(){
    let tokenDataBase64 = localStorage.getItem('token');
    if (!tokenDataBase64) {
      return;
    }

    const tokenData = window.atob(tokenDataBase64.split('.')[1]);
    const groups = JSON.stringify(JSON.parse(tokenData).groups.map((group: string) => group.toUpperCase()));
    localStorage.setItem('groups', groups);
  }

  getGroups(): string[] {
    const groups = localStorage.getItem('groups');
    return groups ? JSON.parse(groups) : [];
  }

  hasGroup(group: string) {
    return this.getGroups().includes(group)
  }

  logout() {
    localStorage.removeItem("token");
  }

  public isLoggedIn() {
    const now = new Date();
    const exp = this.getExpiration();
    return now < exp;
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    try {
      const tokenDataBase64 = localStorage.getItem("token");
      if (tokenDataBase64) {
        const tokenData = window.atob(tokenDataBase64.split('.')[1]);
        const data = JSON.parse(tokenData);
        return new Date(data.exp * 1000);
      }
      return new Date(0);
    } catch (Error) {
      return new Date(0);
    }

  }


}
