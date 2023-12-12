import type { NextAuthConfig } from 'next-auth';
import { NextResponse } from 'next/server';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request }) {
      const isLoggedIn = !!auth?.user;
      const noneLoggedInPages =
        request.nextUrl.pathname === '/' ||
        request.nextUrl.pathname === '/login' ||
        request.nextUrl.pathname === '/signup';

      if (isLoggedIn) {
        const isVerified = (auth.user as any).isVerified;
        const onVerifyPage = request.nextUrl.pathname === '/main/verify';

        if (isVerified) {
          if (noneLoggedInPages || onVerifyPage)
            return NextResponse.redirect(new URL('/main', request.nextUrl));
        } else {
          if (!onVerifyPage)
            return NextResponse.redirect(
              new URL('/main/verify', request.nextUrl)
            );
        }
      } else {
        if (!noneLoggedInPages)
          return NextResponse.redirect(new URL('/', request.nextUrl));
      }
      return true;
    },
    async jwt({ token, user }: { user: any; token: any }) {
      if (user) token.isVerified = user.isVerified;
      return token;
    },
    async session({ token, session }: { session: any; token: any }) {
      delete session.user;
      session.user = { id: '' };
      session.user.isVerified = token.isVerified;
      session.user.id = token.sub;
      return session;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
