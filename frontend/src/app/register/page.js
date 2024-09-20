"use client"
import Link from "next/link"
import { useState } from "react"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from 'next/navigation';

const api = process.env.NEXT_PUBLIC_API_URL;

const registerSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters" }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
})

async function registerUser(data) {
  const response = await fetch(`${api}/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error("Registration failed")
  }

  return response.json()
}

export default function RegisterPage() {
  return (
    <div className="flex items-center justify-center h-screen">
      <RegisterForm />
    </div>
  )
}

export const description =
  "A sign up form with first name, last name, email and password inside a card. There's a link to login if you already have an account"

export function RegisterForm() {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault()

    // Use zod to validate the form data
    const formData = { firstName, lastName, email, password }
    const validation = registerSchema.safeParse(formData)

    if (!validation.success) {
      const errorMessages = validation.error.errors.map((err) => err.message).join(", ")
      setError(errorMessages)
      router.push("/login");
      return
    }

    try {
      setError(null)
      const result = await registerUser(formData)
      console.log("Registration successful:", result)
      setSuccess(true)
    } catch (err) {
      console.error(err)
      setError("Failed to register. Please try again.")
    }
  }

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="first-name">First name</Label>
                <Input
                  id="first-name"
                  placeholder="Max"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="last-name">Last name</Label>
                <Input
                  id="last-name"
                  placeholder="Robinson"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Create an account
            </Button>
          </div>

          {error && <p className="mt-4 text-red-500">{error}</p>}
          {success && <p className="mt-4 text-green-500">Registration successful!</p>}

          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="login" className="underline">
              Sign in
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
