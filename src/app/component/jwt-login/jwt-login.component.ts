import {Component, HostListener, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../service/auth.service";

@Component({
  selector: 'app-jwt-login',
  templateUrl: './jwt-login.component.html',
  styleUrls: ['./jwt-login.component.css']
})
export class JwtLoginComponent implements OnInit {
  form: FormGroup;
  message: string | null = null;
  performingLogin: boolean = false;
  @Input() successUrl!: string;

  constructor(private fb:FormBuilder,
              private authService: AuthService,
              private router: Router) {

    this.form = this.fb.group({
      username: ['',Validators.required],
      password: ['',Validators.required]
    });
  }

  login() {
    const val = this.form.value;

    if (val.username && val.password) {
      this.performingLogin = true
      this.authService.login(val.username, val.password)
        .subscribe({
            next: () => {
              this.router.navigateByUrl(this.successUrl);
              this.performingLogin = false
            },
            error: () => {
              this.message = "Gebruikersnaam of wachtwoord ongeldig.";
              this.performingLogin = false
            }
          });
    }
  }

  ngOnInit(): void {
    //Intentional
  }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === "Enter") {
      // We delay the login slightly to allow Bold's form to catch up with its data.
      setTimeout(() => {
        this.login()
      }, 100)
    }
  }
}
