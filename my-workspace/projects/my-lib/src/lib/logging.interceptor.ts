import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpHandlerFn
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';

// Class-based interceptor for legacy usage
@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('HTTP Request:', req);
    return next.handle(req).pipe(
      tap(
        event => {
          // You can log the event here if needed
        },
        error => {
          console.error('HTTP Error:', error);
        }
      )
    );
  }
}

// Function-based interceptor for Angular functional providers
export function loggingInterceptor(
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  console.log('[Outgoing Request  test kkk]');
  console.log(request);
  return next(request).pipe(
    tap({
      next: event => {
        if (event.type === 4) { // HttpEventType.Response
          console.log('[Incoming Response test lll]');
          console.log(event.status);
          console.log(event.body);
        }
      }
    })
  );
}
