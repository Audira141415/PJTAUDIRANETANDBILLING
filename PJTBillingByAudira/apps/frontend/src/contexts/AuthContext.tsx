import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useRouter } from 'next/router'

export type UserRole = 'ADMIN' | 'BILLING' | 'NOC' | 'CS' | 'TECHNICIAN'

interface User {
  id: string
  email: string
  name: string
  role: UserRole
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in by calling backend (cookie-based)
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const response = await fetch('http://localhost:4000/auth/me', {
        method: 'GET',
        credentials: 'include', // Send httpOnly cookies
      })

      if (response.ok) {
        const data = await response.json()
        // Normalize role to uppercase
        if (data.role) {
          data.role = data.role.toUpperCase()
        }
        console.log('👤 User authenticated:', data.email, 'Role:', data.role)
        setUser(data)
      }
    } catch (error) {
      console.error('Auth check failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch('http://localhost:4000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // Send/receive httpOnly cookies
        body: JSON.stringify({ email, password })
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || 'Login failed')
      }

      const data = await response.json()
      
      // Normalize role to uppercase
      const userRole = (data.user.role || 'ADMIN').toUpperCase() as UserRole
      
      const userData: User = {
        id: data.user.id,
        email: data.user.email,
        name: data.user.name,
        role: userRole
      }

      console.log('✅ Login successful:', userData.email, 'Role:', userData.role)

      setUser(userData)
      // No need to store in localStorage - token is in httpOnly cookie

      // Always redirect to home after login
      router.push('/')
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  }

  const logout = async () => {
    try {
      await fetch('http://localhost:4000/auth/logout', {
        method: 'POST',
        credentials: 'include', // Send httpOnly cookies
      })
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      setUser(null)
      router.push('/login')
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
