import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
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
import {AuthService} from '../../services/auth.service';
import {SignInRequest} from '../../model/requests/sign-in.request';
import {Router} from '@angular/router';

// @ts-ignore
@Component({
  selector: 'app-sign-in',
  imports: [
    MatCard,
    MatCardContent,
    MatCardActions,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    NgOptimizedImage,
  ],
  template: `
    <section class="h-full">
      <div class="flex flex-col justify-center h-full">
        <form [formGroup]="form" (ngSubmit)="onSubmit()" class=" p-4 min-w-8/12   mx-auto ">
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
                  <h1 class="text-3xl">Log in</h1>
                </div>

                <div class="flex flex-col space-y-2 p-4 md:mt-12">
                  <mat-form-field class="w-full">
                    <mat-label>Username</mat-label>
                    <input matInput type="" formControlName="username" />
                    @if (
                      (form.get('username')?.touched || form.get('username')?.dirty) &&
                      (form.get('username')?.hasError('required'))
                      ) {
                      <mat-error>
                        <mat-icon class="form-field-error-icon">error</mat-icon>
                        Username is required</mat-error
                      >
                    }
                  </mat-form-field>
                  <mat-form-field class="w-full">
                    <mat-label>Password</mat-label>
                    <input matInput type="password" formControlName="password" />
                    @if (
                      (form.get('password')?.touched || form.get('password')?.dirty) &&
                      form.get('password')?.hasError('required')
                      ) {
                      <mat-error>
                        <mat-icon class="form-field-error-icon">error</mat-icon>
                        Password is required</mat-error
                      >
                    }
                  </mat-form-field>
                </div>
              </div>
            </mat-card-content>
            <mat-card-actions align="end">
              <a mat-button (click)="onGotoSignUp()">Create account</a>
              <button mat-flat-button type="submit">Sign in</button>
            </mat-card-actions>
          </mat-card>
        </form>
      </div>
    </section>
  `,
  styles: ``
})
export class SignInComponent {

  //get the auth service from the auth module injected in the constructor
  constructor(private authService : AuthService, private router: Router) {
  }


  submitted = false;
  form = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  onSubmit() {
    if (this.form.invalid) return;

    const username = this.form.value.username ?? '';
    const password = this.form.value.password ?? '';

    this.authService.signIn(new SignInRequest(username, password));
    this.submitted = true;
  }

  onGotoSignUp() {
    this.router.navigate(['/sign-up']).then();
  }

}
