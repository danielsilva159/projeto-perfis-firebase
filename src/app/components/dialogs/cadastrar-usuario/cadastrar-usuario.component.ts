import { Component } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../../services/auth-service.service';
import { MatDialogActions, MatDialogClose } from '@angular/material/dialog';

@Component({
  selector: 'app-cadastrar-usuario',
  standalone: true,
  imports: [
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDialogActions,
    MatDialogClose,
  ],
  templateUrl: './cadastrar-usuario.component.html',
  styleUrl: './cadastrar-usuario.component.scss',
})
export class CadastrarUsuarioComponent {
  constructor(private fb: FormBuilder, private authService: AuthService) {}
  form = this.fb.group({
    nome: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    senha: ['', Validators.required],
    perfil: ['', Validators.required],
  });

  salvar() {
    this.authService
      .register(
        this.form.controls.email.value as string,
        this.form.controls.senha.value as string,
        {
          nome: this.form.controls.nome.value,
          perfil: this.form.controls.perfil.value,
        }
      )
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
