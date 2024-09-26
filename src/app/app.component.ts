import {Component, HostListener} from '@angular/core';
import {Router, ActivationEnd} from "@angular/router";
import {filter} from 'rxjs/operators';
import {AuthService} from "./service/auth.service";
import {RoleGroupsModel} from "./model/role-groups.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private router: Router,
              public authService: AuthService) {
    this.router.events.pipe(filter(event => event instanceof ActivationEnd)).subscribe(event => this.updateRoute(event as ActivationEnd));
  }

  @HostListener('bldcRouter', ['$event'])
  handleRoute(event: any): void {
    this.router.navigateByUrl(event.detail.routerLink);
  }

  path: string | null = null;

  updateRoute(event: ActivationEnd) {
    this.path = event.snapshot.url[0]?.toString();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(["/login"]);
  }

  protected readonly RoleGroupsModel = RoleGroupsModel;
}
