import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"

const prisma = new PrismaClient()

export async function POST(req: Request) {
  try {
    const { email, password, role } = await req.json()

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user in database
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role,
      },
    })

    return NextResponse.json({ user }, { status: 201 })
  } catch (error) {
    console.error("Error creating user:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
