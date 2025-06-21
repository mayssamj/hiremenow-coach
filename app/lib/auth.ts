
import { NextAuthOptions, getServerSession } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '@/lib/db';
import bcrypt from 'bcryptjs';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      username: string;
      name?: string;
      role: string;
    };
  }
  
  interface User {
    id: string;
    username: string;
    name?: string;
    role: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role?: string;
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        console.log('🔐 NextAuth authorize called with:', { username: credentials?.username, hasPassword: !!credentials?.password });
        
        try {
          if (!credentials?.username || !credentials?.password) {
            console.log('❌ Missing credentials');
            return null;
          }

          console.log('🔍 Looking for user:', credentials.username);
          const user = await prisma.user.findUnique({
            where: {
              username: credentials.username
            }
          });

          if (!user) {
            console.log('❌ User not found');
            return null;
          }

          console.log('✅ User found, checking if active');
          if (!user.isActive) {
            console.log('❌ User is not active');
            return null;
          }

          console.log('🔑 Verifying password');
          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isPasswordValid) {
            console.log('❌ Password verification failed');
            return null;
          }

          console.log('✅ Authentication successful for user:', user.username);
          const result = {
            id: user.id,
            username: user.username,
            name: user.name || undefined,
            role: user.role,
          };
          console.log('✅ Returning user object:', result);
          return result;
        } catch (error) {
          console.error('❌ Exception in authorize function:', error);
          return null;
        }
      }
    })
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub!;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
};

// Helper function to get server session
export const getServerAuthSession = () => getServerSession(authOptions);
