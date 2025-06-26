import { NextRequest, NextResponse } from 'next/server';

import { decodeJwt } from 'jose';

const PUBLIC_ROUTES = [
    { prefix: '/', whenAuthenticated: 'next' },
    { prefix: '/auth/login', whenAuthenticated: 'redirect' },
    { prefix: '/auth/register', whenAuthenticated: 'redirect' },
] as const;

const PRIVATE_ROUTES = [
    { prefix: '/retailer', type: 'retailer' },
    { prefix: '/industry', type: 'industry' },
] as const;

export default async function middleware(request: NextRequest) {
    const url = request.nextUrl;
    const path = url.pathname;
    const token = request.cookies.get('access_token')?.value;

    const publicRoute = PUBLIC_ROUTES.find(
        (r) => path === r.prefix || path.startsWith(r.prefix + '/')
    );
    const privateRoute = PRIVATE_ROUTES.find((r) => path.startsWith(r.prefix));

    // 1. Não autenticado + rota pública → segue + cache otimizado
    if (!token && publicRoute) {
        const response = NextResponse.next();
        response.headers.set('cache-control', 'public, max-age=3600, stale-while-revalidate=59');
        return response;
    }

    // 2. Não autenticado + rota privada → login
    if (!token && !publicRoute) {
        return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    // 3. Checagem leve de JWT (expiração + claims básicas)
    let payload: any;
    try {
        payload = decodeJwt(token!) as any;
        if (!payload.exp || Date.now() / 1000 > payload.exp) {
            throw new Error('Token expirado');
        }
    } catch (err) {
        console.error(err);
        return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    // 4. Autorização claim-based para rotas privadas
    if (privateRoute && payload.type !== privateRoute.type) {
        const dest = payload.type === 'retailer' ? '/retailer' : '/industry';
        return NextResponse.redirect(new URL(dest, request.url));
    }

    // 5. Tudo ok → prossegue. Verificação de assinatura completa fica no backend.
    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!api/|_next/|favicon.ico|placeholder.svg|.*\\.png$|.*\\.jpg$|.*\\.svg$|.well-known/).*)',
    ],
};
