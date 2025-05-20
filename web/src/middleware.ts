import { NextRequest, NextResponse } from 'next/server';

const PUBLIC_ROUTES = [
    { prefix: '/', whenAuthenticated: 'next' },
    { prefix: '/auth/login', whenAuthenticated: 'redirect' },
    { prefix: '/auth/register', whenAuthenticated: 'redirect' },
    { prefix: '/auth/forgot-password', whenAuthenticated: 'next' },
    { prefix: '/auth/reset-password', whenAuthenticated: 'next' },
] as const;

const PRIVATE_ROUTES = [
    { prefix: '/retailer', type: 'retailer' },
    { prefix: '/industry', type: 'industry' },
] as const;

function isPublicRoute(path: string) {
    return PUBLIC_ROUTES.find(route => path === route.prefix || path.startsWith(route.prefix + '/'));
};

function getPrivateRouteType(path: string): 'retailer' | 'industry' | null {
    for (const route of PRIVATE_ROUTES) {
        if (path.startsWith(route.prefix)) {
            return route.type;
        };
    };
    return null;
};

const REDIRECT_WHEN_NOT_AUTHENTICATED = '/auth/login';

export default function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    const token = request.cookies.get('access_token')?.value;
    const type = request.cookies.get('user_type')?.value;

    const publicRoute = isPublicRoute(path);
    const requiredType = getPrivateRouteType(path);

    // ✅ 1. Não autenticado acessando rota pública → OK
    if (!token && publicRoute) {
        return NextResponse.next();
    }

    // ✅ 2. Não autenticado tentando acessar rota privada → redireciona
    if (!token && !publicRoute) {
        const redirectUrl = request.nextUrl.clone();
        redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED;
        return NextResponse.redirect(redirectUrl);
    }

    // ✅ 3. Autenticado acessando rota pública com `whenAuthenticated: 'redirect'`
    if (token && publicRoute?.whenAuthenticated === 'redirect') {
        const redirectUrl = request.nextUrl.clone();
        redirectUrl.pathname = type === 'retailer' ? '/retailer' : '/industry';
        return NextResponse.redirect(redirectUrl);
    }

    // ✅ 4. Autenticado tentando acessar rota de outro tipo → redireciona para sua rota correta
    if (requiredType && type !== requiredType) {
        const redirectUrl = request.nextUrl.clone();
        redirectUrl.pathname = type === 'retailer' ? '/retailer' : '/industry';
        return NextResponse.redirect(redirectUrl);
    }

    // ✅ 5. Tudo OK → segue para rota solicitada
    return NextResponse.next();
}

export const config = {
    matcher: [
        "/((?!api/|_next/|favicon.ico|placeholder.svg|.*\\.png$|.*\\.jpg$|.*\\.svg$|.well-known/).*)",
    ],
};
