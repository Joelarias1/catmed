import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const modifiedReq = req.clone({
    setHeaders: {
      'Content-Type': 'application/json'
    }
  });

  return next(modifiedReq).pipe(
    catchError((error: HttpErrorResponse) => {
      const errorMsg = error.error instanceof ErrorEvent
        ? `Error del cliente: ${error.error.message}`
        : `Error del servidor: ${error.status}`;
      
      console.error(errorMsg);
      return throwError(() => errorMsg);
    })
  );
}; 