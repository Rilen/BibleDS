import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environments/environment';

/**
 * Interceptor funcional (Angular 15+) que injeta o header
 * `Authorization: Bearer <TOKEN>` em todas as requisições
 * direcionadas à ABíbliaDigital.
 *
 * NOTA: Se o token não estiver configurado (placeholder), a requisição
 * é enviada sem autenticação (limite de 20 req/hora pelo IP).
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
    // Só adiciona o token para chamadas à API bíblica
    if (!req.url.includes(environment.apiBaseUrl)) {
        return next(req);
    }

    // Só injeta o header se o token foi configurado pelo usuário
    const hasToken =
        environment.apiToken &&
        environment.apiToken !== 'SEU_TOKEN_JWT_AQUI' &&
        environment.apiToken.length > 10;

    if (!hasToken) {
        return next(req);
    }

    const authReq = req.clone({
        setHeaders: {
            Authorization: `Bearer ${environment.apiToken}`,
            'Content-Type': 'application/json',
        },
    });

    return next(authReq);
};
