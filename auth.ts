import NextAuth, { NextAuthConfig } from "next-auth"
import Google from "next-auth/providers/google"

export const config: NextAuthConfig = {
    providers: [
        Google({
            clientId: process.env.AUTH_GOOGLE_ID, 
            clientSecret: process.env.AUTH_GOOGLE_SECRET
        })
    ],
    basePath: "/api/auth/",
    callbacks: {
        authorized({request, auth}) {
            try {
                const {pathname} = request.nextUrl;
                if (pathname === "/") return !!auth;
                return true;
            } catch (err) {
                console.log(err);
            }
        }
    },
}
 
export const { handlers, auth, signIn, signOut } = NextAuth(config)