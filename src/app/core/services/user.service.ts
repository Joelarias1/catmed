import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError, map, tap, of, switchMap } from 'rxjs';
import { User, Cat, ApiResponse } from '../interfaces/user.interface';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly S3_URL = 'https://bucket-catmed.s3.us-east-2.amazonaws.com/users.json';
  private readonly USER_PLACEHOLDER = 'https://bucket-catmed.s3.us-east-2.amazonaws.com/img/user-placeholder.png';
  private readonly CAT_PLACEHOLDER = 'https://bucket-catmed.s3.us-east-2.amazonaws.com/img/cat-placeholder.jpg';
  private readonly STORAGE_KEY = 'currentUser';

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  private get isInBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  // Método para validar login
  login(email: string, password: string): Observable<User> {
    return this.http.get<ApiResponse>(this.S3_URL).pipe(
      tap(response => console.log('Respuesta del API:', response)),
      map(response => {
        console.log('Buscando usuario con email:', email);
        const user = response.users.find(u => 
          u.email === email && u.password === password
        );
        
        if (!user) {
          console.log('Usuario no encontrado');
          throw new Error('Credenciales incorrectas');
        }
        
        console.log('Usuario encontrado:', user);
        // Guardar usuario en localStorage
        try {
          localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
          console.log('Usuario guardado en localStorage');
        } catch (error) {
          console.error('Error al guardar en localStorage:', error);
        }
        
        return user;
      }),
      catchError(error => {
        console.error('Error en login:', error);
        return throwError(() => error.message || 'Error en el login');
      })
    );
  }

  // Obtener usuario actual
  getCurrentUser(): User | null {
    if (!this.isInBrowser) return null;
    const userStr = localStorage.getItem(this.STORAGE_KEY);
    return userStr ? JSON.parse(userStr) : null;
  }

  setCurrentUser(user: User): void {
    if (!this.isInBrowser) return;
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
  }

  // Cerrar sesión
  logout(): void {
    if (!this.isInBrowser) return;
    console.log('Cerrando sesión');
    localStorage.removeItem(this.STORAGE_KEY);
  }

  // Verificar si hay usuario logueado
  isLoggedIn(): boolean {
    return this.isInBrowser && !!this.getCurrentUser();
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
        console.log('Buscando usuario con email:', newUser.email);
        const users = response.users;
        const existingUser = users.find(u => u.email === newUser.email);
        
        if (existingUser) {
          console.log('Usuario encontrado');
          throw new Error('El email ya está registrado');
        }
        
        console.log('Usuario no encontrado, procediendo a crear');
        // Agregamos el nuevo usuario al array
        users.push(newUser);

        // Actualizamos el archivo en S3
        return this.http.put<ApiResponse>(this.S3_URL, { users }).pipe(
          map(() => {
            // Removemos el setCurrentUser para que no se auto-loguee
            return newUser;
          }),
          catchError(error => {
            console.error('Error al actualizar S3:', error);
            return throwError(() => error);
          })
        );
      }),
      catchError(error => {
        console.error('Error al crear usuario:', error);
        return throwError(() => error.message || 'Error al crear usuario');
      })
    );
  }

  updateCat(updatedCat: Cat): Observable<User> {
    const currentUser = this.getCurrentUser();
    if (!currentUser) {
      return throwError(() => new Error('No hay usuario autenticado'));
    }

    const updatedUser: User = {
      ...currentUser,
      cats: [updatedCat]
    };

    this.setCurrentUser(updatedUser);

    return this.http.get<ApiResponse>(this.S3_URL).pipe(
      switchMap(response => {
        const users = response.users;
        const userIndex = users.findIndex(u => u.id === currentUser.id);
        
        if (userIndex === -1) {
          throw new Error('Usuario no encontrado en S3');
        }

        users[userIndex] = updatedUser;
        return this.http.put<ApiResponse>(this.S3_URL, { users }).pipe(
          map(() => updatedUser)
        );
      }),
      catchError(error => {
        console.error('Error al actualizar:', error);
        return throwError(() => error);
      })
    );
  }

  deleteUser(userId: string): Observable<void> {
    return this.http.get<ApiResponse>(this.S3_URL).pipe(
      switchMap(response => {
        const users = response.users;
        const userIndex = users.findIndex(u => u.id === userId);
        
        if (userIndex === -1) {
          throw new Error('Usuario no encontrado');
        }

        // Eliminamos el usuario del array
        users.splice(userIndex, 1);

        // Actualizamos el archivo en S3
        return this.http.put<ApiResponse>(this.S3_URL, { users }).pipe(
          map(() => {
            // Limpiamos el localStorage
            this.logout();
          }),
          catchError(error => {
            console.error('Error al eliminar usuario en S3:', error);
            return throwError(() => error);
          })
        );
      }),
      catchError(error => {
        console.error('Error al obtener usuarios de S3:', error);
        return throwError(() => error);
      })
    );
  }
}