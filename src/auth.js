
import { authConfig } from './auth.config';
import NextAuth from 'next-auth';
import GoogleProvider from "next-auth/providers/google";
import CredentialProvider from 'next-auth/providers/credentials';
import bcrypt from "bcryptjs";
import connectToDatabase from "@/dbconfig/dbconfig";
import User from "@/models/userModels";


export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    GoogleProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? ''
    }),
    CredentialProvider({
      credentials: {
        email: {
          type: 'email',
          label: 'Email',
          required: true
        },
        password: {
          type: 'password',
          label: 'Password',
          required: true
        }
      },
      async authorize(credentials) {
        try {
          await connectToDatabase();

          if (!credentials?.email || !credentials?.password) {
            throw new Error('Email and password are required');
          }

          const user = await User.findOne({ email: credentials.email });
          if (!user) {
            throw new Error('Invalid email or password');
          }

          const isValidPassword = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isValidPassword) {
            throw new Error('Invalid email or password');
          }

          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
          };
        } catch (error) {
          console.error('Authentication error:', error);
          return null;
        }
      }
    })
  ],

});

