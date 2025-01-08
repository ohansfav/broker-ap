'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { UserCircle } from 'lucide-react'

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isPasswordStep, setIsPasswordStep] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsPasswordStep(true)
  }

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, you would validate the credentials here
    // For demonstration purposes, we'll just redirect to Gmail
    router.push(`https://mail.google.com/mail/u/${encodeURIComponent(email)}`)
  }

  return (
    <div className="min-h-screen bg-[#202124] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-[450px] bg-[#2d2f31] rounded-2xl p-12 space-y-8">
        {/* Google Logo */}
        <div className="flex justify-start mb-2">
          <svg viewBox="0 0 75 24" width="150" height="48" xmlns="http://www.w3.org/2000/svg" className="filter drop-shadow-md">
            <path fill="#4285F4" d="M14.11 13.252c0-.642-.057-1.252-.164-1.841H7.2v3.481h3.87a3.3 3.3 0 0 1-1.435 2.17v1.803h2.326c1.36-1.252 2.148-3.097 2.148-5.613z"/>
            <path fill="#34A853" d="M7.2 19.2c1.944 0 3.57-.644 4.76-1.739l-2.326-1.803c-.645.43-1.47.683-2.434.683-1.873 0-3.461-1.264-4.027-2.963H.797v1.86A7.198 7.198 0 0 0 7.2 19.2z"/>
            <path fill="#FBBC05" d="M3.173 13.378a4.33 4.33 0 0 1-.226-1.378c0-.478.082-.943.226-1.378v-1.86H.797a7.198 7.198 0 0 0 0 6.476l2.376-1.86z"/>
            <path fill="#EA4335" d="M7.2 6.916c1.058 0 2.004.363 2.743 1.076l2.064-2.064C10.87 4.869 9.243 4.2 7.2 4.2A7.198 7.198 0 0 0 .797 8.762l2.376 1.86C3.739 8.18 5.327 6.916 7.2 6.916z"/>
          </svg>
        </div>

        {!isPasswordStep ? (
          /* Email Step */
          <form onSubmit={handleEmailSubmit} className="space-y-6">
            <div className="space-y-1.5">
              <h1 className="text-2xl text-white">Sign in</h1>
              <p className="text-base text-white">Use your Google Account</p>
            </div>

            <div className="space-y-1">
              <Input
                type="email"
                placeholder="Email or phone"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-14 bg-transparent border-gray-600 text-white placeholder:text-gray-400"
                required
              />
              <Link href="#" className="text-sm text-[#8ab4f8] hover:text-blue-400">
                Forgot email?
              </Link>
            </div>

            <div className="text-sm text-[#8ab4f8]">
              <p>Not your computer? Use Guest mode to sign in privately.</p>
              <Link href="#" className="hover:text-blue-400">
                Learn more about using Guest mode
              </Link>
            </div>

            <div className="flex items-center justify-between pt-4">
              <Link href="#" className="text-sm text-[#8ab4f8] hover:text-blue-400">
                Create account
              </Link>
              <Button 
                type="submit"
                className="bg-[#8ab4f8] text-black hover:bg-[#aecbfa]"
              >
                Next
              </Button>
            </div>
          </form>
        ) : (
          /* Password Step */
          <form onSubmit={handlePasswordSubmit} className="space-y-6">
            <div className="space-y-1.5">
              <h1 className="text-2xl text-white">Welcome</h1>
              <div className="flex items-center gap-2 text-white bg-[#3c4043] px-3 py-2 rounded-full w-fit">
                <span>{email}</span>
                <UserCircle 
                  className="h-5 w-5 text-[#8ab4f8] hover:text-blue-400 cursor-pointer"
                  onClick={() => setIsPasswordStep(false)}
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-14 bg-transparent border-gray-600 text-white placeholder:text-gray-400"
                  required
                />
              </div>
              <div className="flex items-center gap-2 pt-2">
                <Checkbox 
                  id="show-password" 
                  checked={showPassword}
                  onCheckedChange={(checked) => setShowPassword(checked as boolean)}
                  className="border-gray-600 data-[state=checked]:bg-[#8ab4f8] data-[state=checked]:border-[#8ab4f8]"
                />
                <label htmlFor="show-password" className="text-white text-sm">
                  Show password
                </label>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4">
              <Link href="#" className="text-sm text-[#8ab4f8] hover:text-blue-400">
                Forgot password?
              </Link>
              <Button 
                type="submit"
                className="bg-[#8ab4f8] text-black hover:bg-[#aecbfa]"
              >
                Next
              </Button>
            </div>
          </form>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between w-full max-w-[450px] mt-4 px-2 text-sm">
        <select className="bg-transparent text-[#8ab4f8] border-none focus:outline-none cursor-pointer">
          <option>English (United States)</option>
        </select>
        <div className="flex gap-8 text-[#8ab4f8]">
          <Link href="#" className="hover:text-blue-400">Help</Link>
          <Link href="#" className="hover:text-blue-400">Privacy</Link>
          <Link href="#" className="hover:text-blue-400">Terms</Link>
        </div>
      </div>
    </div>
  )
}

