import { Component, Inject, OnInit, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { CadastrarUsuarioComponent } from '../../components/dialogs/cadastrar-usuario/cadastrar-usuario.component';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { AuthService } from '../../services/auth-service.service';
import { IUsuarioModel } from '../../models/usuario.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  displayedColumns = ['nome', 'email', 'perfil'];
  dataSource: IUsuarioModel[] = [];
  readonly dialog = inject(MatDialog);
  perfil: string | null = null;

  ngOnInit(): void {
    this.atualizarLista();
    if (this.authService.user$) {
      this.authService.user$.subscribe((user) => {
        if (user && user.perfil) this.perfil = user.perfil;
      });
    }
  }
  abrirDialog() {
    this.dialog
      .open(CadastrarUsuarioComponent)
      .afterClosed()
      .subscribe(() => {
        this.atualizarLista();
      });
  }

  atualizarLista() {
    this.authService.listUsers().subscribe((users) => {
      this.dataSource = users;
    });
  }

  sair() {
    this.authService.logout().then(() => {
      this.router.navigate(['/login']);
    });
  }
}
