import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();
const SECRET_KEY = process.env.JWT_SECRET as string;  // Ensure this is in your .env file

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        // Find the user in the database
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

        // Check if the password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

        // Generate a JWT token
        const token = jwt.sign({ userId: user.id, email: user.email }, SECRET_KEY, { expiresIn: "1h" });

        return NextResponse.json({ message: "Login successful", token }, { status: 200 });
    } catch (error) {
        console.error("Login Error:", error);
        return NextResponse.json({ error: "Login failed", details: error }, { status: 500 });
    }
}
