import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    private router: Router
  ) {}
  form = this.fb.group({
    email: ['', Validators.required],
    senha: ['', Validators.required],
  });

  entrar() {
    if (this.form.value.email && this.form.value.senha) {
      this.authService
        .login(this.form.value.email, this.form.value.senha)
        .then(() => {
          this.router.navigate(['']);
        })
        .catch((err) => console.log(err));
    }
  }
}
