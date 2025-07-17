import CredentialsProvider from "next-auth/providers/credentials";
import API_URL from '@/services/api';

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                cpf: { label: "CPF", type: "text" },
                password: { label: "Senha", type: "password" },
                rememberMe: { label: "Lembrar-me", type: "boolean" },
            },
            async authorize(credentials) {
                try {
                    const response = await fetch(`${API_URL}/auth/login`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            cpf: credentials.cpf,
                            password: credentials.password,
                        }),
                    });

                    if (!response.ok) {
                        console.error('Erro ao autenticar:', await response.text());
                        return null;
                    }

                    const { token, user } = await response.json();

                    if (token && user) {
                        return {
                            id: user.cpf,
                            name: user.name,
                            cpf: user.cpf,
                            token,
                            profile: user.profile,
                            rememberMe: credentials.rememberMe === 'true',
                        };
                    } else {
                        return null;
                    }
                } catch (error) {
                    console.error('Erro ao autenticar:', error);
                    return null;
                }
            },
        }),
    ],
    session: {
        strategy: "jwt",
        maxAge: 60 * 60 * 24 * 7,
    },
    pages: {
        signIn: "/(full-width-pages)/(auth)/signin",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.name = user.name;
                token.cpf = user.cpf;
                token.accessToken = user.token;
                token.profile = user.profile;
                token.rememberMe = user.rememberMe;

                const maxAge = user.rememberMe ? 60 * 60 * 24 * 7 : 60 * 60 * 24;
                token.exp = Math.floor(Date.now() / 1000) + maxAge;
            }
            return token;
        },
        async session({ session, token }) {
            session.user.id = token.id;
            session.user.name = token.name;
            session.user.cpf = token.cpf;
            session.user.accessToken = token.accessToken;
            session.user.profile = token.profile;
            session.user.rememberMe = token.rememberMe;
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: true,
};
