import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

// Secret key for JWT
const JWT_SECRET = process.env.JWT_SECRET || "910143346ca852c104de334b543dd17ea4fa7b44f895829c830c833729f5c19fdd253d18495dde93165840cfee08198be943723b36d250b3dd1144755234c992"; // Make sure to set this in your .env file

/** Signup Function */
export async function signup(name: string, email: string, password: string) {
  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new Error("User already exists");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    // Generate JWT Token
    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "7d",
    });

    return { message: "Signup successful", token, user };
  } catch (error) {
    throw new Error(error.message);
  }
}

/** Login Function */
export async function login(email: string, password: string) {
  try {
    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error("Invalid credentials");
    }

    // Compare password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new Error("Invalid credentials");
    }

    // Generate JWT Token
    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "7d",
    });

    return { message: "Login successful", token, user };
  } catch (error) {
    throw new Error(error.message);
  }
}
