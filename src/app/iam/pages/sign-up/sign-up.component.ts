
import { Component } from '@angular/core';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
} from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import {MatOption, MatSelect} from '@angular/material/select';
import {AuthService} from '../../services/auth.service';
import {SignUpRequest} from '../../model/requests/sign-up.request';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sign-up',
  imports: [
    MatCard,
    MatCardContent,
    MatCardActions,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    MatSelect,
    MatOption,
  ],
  template: `
    <section class="flex flex-col justify-center h-full">
      <form [formGroup]="form" (ngSubmit)="onSubmit()" class="p-4 min-w-8/12 mx-auto ">
        <mat-card appearance="outlined">
          <mat-card-content>
            <div class="grid md:grid-cols-2 gap-6">
              <div class="flex flex-col space-y-4 p-4">
                <img
                  src="../../../../assets/images/kuota-pe.png"
                  alt="Logo"
                  height="160"
                  width="160"
                  class="inline" />
                <h1 class="text-3xl">Create an Account</h1>
                <p>to get started with Application</p>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-4 p-4 md:mt-12">
                <mat-form-field class="w-full sm:col-span-2">
                  <mat-label>Username</mat-label>
                  <input matInput formControlName="username" />
                  @if (form.get('username')?.touched && form.get('username')?.hasError('required')) {
                    <mat-error>Username is required</mat-error>
                  }
                </mat-form-field>

                <mat-form-field class="w-full">
                  <mat-label>Name</mat-label>
                  <input matInput formControlName="name" />
                  @if (form.get('name')?.touched && form.get('name')?.hasError('required')) {
                    <mat-error>Name is required</mat-error>
                  }
                </mat-form-field>

                <mat-form-field class="w-full">
                  <mat-label>Surname</mat-label>
                  <input matInput formControlName="surname" />
                  @if (form.get('surname')?.touched && form.get('surname')?.hasError('required')) {
                    <mat-error>Surname is required</mat-error>
                  }
                </mat-form-field>

                <mat-form-field class="w-full sm:col-span-2">
                  <mat-label>Email</mat-label>
                  <input matInput type="email" formControlName="email" />
                  @if (form.get('email')?.touched && form.get('email')?.hasError('required')) {
                    <mat-error>Email is required</mat-error>
                  }
                  @if (form.get('email')?.touched && form.get('email')?.hasError('email')) {
                    <mat-error>Please enter a valid email address</mat-error>
                  }
                </mat-form-field>

                <mat-form-field class="w-full sm:col-span-2">
                  <mat-label>Password</mat-label>
                  <input matInput type="password" formControlName="password" />
                  @if (form.get('password')?.touched && form.get('password')?.hasError('required')) {
                    <mat-error>Password is required</mat-error>
                  }
                </mat-form-field>

                <mat-form-field class="w-full sm:col-span-2">
                  <mat-label>Role</mat-label>
                  <mat-select formControlName="role">
                    <mat-option value="ROLE_ISSUER">Emisor de bonos</mat-option>
                    <mat-option value="ROLE_BONDHOLDER">Bonista</mat-option>
                  </mat-select>
                  @if (form.get('role')?.touched && form.get('role')?.hasError('required')) {
                    <mat-error>Role is required</mat-error>
                  }
                </mat-form-field>
              </div>
            </div>
          </mat-card-content>
          <mat-card-actions align="end">
            <a mat-button (click)="onGotoSignIn()">Sign in instead</a>
            <button mat-flat-button type="submit">Sign Up</button>
          </mat-card-actions>
        </mat-card>
      </form>
    </section>
  `,
  styles: ``
})
export class SignUpComponent {
  constructor(private authService: AuthService, private router: Router) {
  }

  form = new FormGroup({
    username: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    role: new FormControl('', [Validators.required]),
  });

  onSubmit() {

    if (this.form.invalid) {
      return;
    }

    const username = this.form.value.username ?? '';
    const name = this.form.value.name ?? '';
    const surname = this.form.value.surname ?? '';
    const email = this.form.value.email ?? '';
    const password = this.form.value.password ?? '';
    const role = this.form.value.role ?? '';

    this.authService.signUp(new SignUpRequest(
      username,
      name,
      surname,
      email,
      password,
      [role]
    ));
  }

  onGotoSignIn() {
    this.router.navigate(['/sign-in']).then();
  }



}
