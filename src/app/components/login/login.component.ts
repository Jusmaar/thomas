import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Subscription } from '../../../../node_modules/rxjs';
import { Router } from '../../../../node_modules/@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  register: boolean = false;
  goLogin: boolean = false;
  loginForm: FormGroup;
  registerForm: FormGroup;

  emailL: AbstractControl;
  passwordL: AbstractControl;
  emailR: AbstractControl;
  passwordR: AbstractControl;


  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.createFormRegister();
    this.createFormLogin();
  }

  showRegister(): void {
    this.register = !this.register;
    this.goLogin = false;
  }
  registerSubmit(): void {
    if (this.registerForm.invalid) {
      return;
    } else {
      const objRegister = {
        email: this.emailR.value,
        password: this.passwordR.value
      }
      const register: Subscription = this._authService.register(objRegister)
        .subscribe(res => {
          this.goLogin = true;
          register.unsubscribe();
        })
    }
  }

  createFormLogin(): void {
    this.loginForm = this._formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
    this.emailL = this.loginForm.controls["email"];
    this.passwordL = this.loginForm.controls["password"];

  }
  createFormRegister() {
    this.registerForm = this._formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
    this.emailR = this.registerForm.controls["email"];
    this.passwordR = this.registerForm.controls["password"];
  }
  loginSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    } else {
      const objlogin = {
        email: this.emailL.value,
        password: this.passwordL.value
      }
      const login: Subscription = this._authService.login(objlogin)
        .subscribe(res => {
          this._authService.setTokenLS(res);
          this._router.navigate(['/users']);
          login.unsubscribe();
        })
    }
  }

}
