import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError, map, switchMap } from 'rxjs';
import { User, Cat, ApiResponse } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly S3_URL = 'https://bucket-catmed.s3.us-east-2.amazonaws.com/users.json';
  private readonly USER_PLACEHOLDER = 'https://bucket-catmed.s3.us-east-2.amazonaws.com/img/user-placeholder.png';
  private readonly CAT_PLACEHOLDER = 'https://bucket-catmed.s3.us-east-2.amazonaws.com/img/cat-placeholder.webp';

  constructor(private http: HttpClient) { }

  // Método para validar login
  login(email: string, password: string): Observable<User> {
    return this.http.get<ApiResponse>(this.S3_URL).pipe(
      map(response => {
        const user = response.users.find(u => 
          u.email === email && u.password === password
        );
        
        if (!user) {
          throw new Error('Credenciales incorrectas');
        }
        
        return user;
      }),
      catchError(error => {
        console.error('Error en login:', error);
        return throwError(() => error.message || 'Error en el login');
      })
    );
  }

  // Método existente de createUser
  createUser(formData: any): Observable<User> {
    const newCat: Cat = {
      id: `cat${Date.now()}`,
      nombre: formData.mascota?.nombre || '',
      edad: formData.mascota?.edad || '',
      raza: formData.mascota?.raza || '',
      imagen_gato: this.CAT_PLACEHOLDER,
      estado: {
        vacunado: false,
        esterilizado: false,
        sobrepeso: false
      },
      historialMedico: []
    };

    const newUser: User = {
      id: `user${Date.now()}`,
      nombre: formData.nombre,
      apellidos: formData.apellidos,
      email: formData.email,
      telefono: formData.telefono,
      password: formData.password,
      role: 'user',
      terms: formData.terms,
      createdAt: new Date().toISOString(),
      imagen_perfil: this.USER_PLACEHOLDER,
      cats: [newCat]
    };

    return this.http.get<ApiResponse>(this.S3_URL).pipe(
      switchMap(response => {
        const emailExists = response.users.some(user => user.email === newUser.email);
        if (emailExists) {
          throw new Error('El email ya está registrado');
        }

        const updatedData = {
          users: [...response.users, newUser]
        };
        return this.http.put<User>(this.S3_URL, updatedData).pipe(
          map(() => newUser)
        );
      }),
      catchError(error => {
        console.error('Error al crear usuario:', error);
        return throwError(() => error.message || 'Error al crear usuario');
      })
    );
  }
}