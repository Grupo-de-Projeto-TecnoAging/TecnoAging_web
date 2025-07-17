import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

// Rotas públicas que não exigem autenticação
const PUBLIC_PATHS = ["/signin", "/signup", "/unauthorized"];

// Rotas permitidas por perfil
const roleAccess = {
    patient: ["/home", "/evaluations"],
    healthProfessional: ["/home", "/users", "/users/profile"],
    researcher: ["*"],
};

export async function middleware(request) {
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
    const { pathname } = request.nextUrl;

    // Redirecionamento da raiz
    if (pathname === "/") {
        if (token) {
            return NextResponse.redirect(new URL("/home", request.url));
        } else {
            return NextResponse.redirect(new URL("/signin", request.url));
        }
    }

    // Usuário autenticado acessando rota pública? Redireciona
    if (token && PUBLIC_PATHS.includes(pathname)) {
        return NextResponse.redirect(new URL("/home", request.url));
    }

    // Rota protegida e usuário não autenticado? Redireciona
    const isPublic = PUBLIC_PATHS.includes(pathname);
    if (!isPublic && !token) {
        return NextResponse.redirect(new URL("/signin", request.url));
    }

    // Verificação de permissões
    if (token) {
        const userRole = token?.profile;
        const allowedPaths = roleAccess[userRole] || [];

        const isAllowed =
            allowedPaths.includes("*") ||
            allowedPaths.some((allowedPath) => pathname.startsWith(allowedPath));

        if (!isAllowed) {
            return NextResponse.redirect(new URL("/unauthorized", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico|signin|signup|unauthorized|.*\\.(?:svg|png|jpg|jpeg|webp|ico|css|js)).*)"
    ],
};

