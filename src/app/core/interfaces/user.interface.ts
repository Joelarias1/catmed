// Estado de salud del gato
export interface CatHealth {
  vacunado: boolean;
  esterilizado: boolean;
  sobrepeso: boolean;
}

// Interfaz del gato
export interface Cat {
  id: string;
  nombre: string;
  edad: string;
  raza: string;
  imagen_gato: string;
  estado: CatHealth;
  historialMedico: any[];
}

// Interfaz del usuario
export interface User {
  id: string;
  nombre: string;
  apellidos: string;
  email: string;
  telefono: string;
  password: string;
  role: string;
  terms: boolean;
  createdAt: string;
  imagen_perfil: string;
  cats: Cat[];
}

// Interfaz de respuesta de la API
export interface ApiResponse {
  users: User[];
} 