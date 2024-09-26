import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import { Observable, from, switchMap } from 'rxjs';
import { IUsuarioModel } from '../models/usuario.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<IUsuarioModel | null>;

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {
    this.user$ = this.getLoggedInUserData();
  }

  // Login com email e senha
  login(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  // Registro com email e senha
  async register(email: string, password: string, profileData: any) {
    try {
      const result = await this.afAuth.createUserWithEmailAndPassword(
        email,
        password
      );

      // Após criar o usuário, salve o perfil no Firestore
      if (result.user) {
        await this.firestore
          .collection('usuario')
          .doc(result.user.uid)
          .set({
            uid: result.user.uid,
            email: result.user.email,
            ...profileData, // Inclua os dados adicionais do perfil
          });
      }

      return result;
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      throw error;
    }
  }

  // Logout
  logout() {
    return this.afAuth.signOut();
  }

  listUsers(): Observable<IUsuarioModel[]> {
    return this.firestore.collection('usuario').valueChanges() as Observable<
      IUsuarioModel[]
    >;
  }

  getLoggedInUserData(): Observable<IUsuarioModel | null> {
    return this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          // Usa o UID do usuário para buscar o documento correspondente no Firestore
          return this.firestore
            .collection('usuario')
            .doc(user.uid)
            .valueChanges() as Observable<IUsuarioModel>;
        } else {
          return from([null]); // Retorna null se o usuário não estiver logado
        }
      })
    );
  }
}
