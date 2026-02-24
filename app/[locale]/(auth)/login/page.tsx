'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff, Mail } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'
import { useAuth } from '@/hooks/useAuth'

export default function LoginPage() {
  const t = useTranslations('auth')
  const tCommon = useTranslations('common')
  const router = useRouter()
  const searchParams = useSearchParams()
  const { login, authStatus } = useAuth()
  const [error, setError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)

  // If session restoration discovers user is already logged in, redirect away
  useEffect(() => {
    if (authStatus === 'authenticated') {
      const from = searchParams.get('from') || '/'
      router.push(from)
    }
  }, [authStatus, router, searchParams])

  const loginSchema = useMemo(
    () =>
      z.object({
        email: z.string().email(t('validationEmail')),
        password: z
          .string()
          .min(8, t('validationPasswordMin'))
          .regex(/[A-Z]/, t('validationPasswordUppercase'))
          .regex(/[a-z]/, t('validationPasswordLowercase'))
          .regex(/[!@#$%^&*(),.?":{}|<>]/, t('validationPasswordSpecial')),
      }),
    [t]
  )

  type LoginForm = z.infer<typeof loginSchema>

  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const isSubmitting = form.formState.isSubmitting

  const onSubmit = async (data: LoginForm) => {
    try {
      setError(null)
      await login(data.email, data.password)

      const from = searchParams.get('from') || '/'
      // Validate redirect path to prevent Open Redirect attacks
      // Only allow relative paths (starting with '/'), reject absolute URLs and protocol-relative URLs
      // Example attacks: /login?from=https://evil.com or /login?from=//evil.com
      const safePath =
        from.startsWith('/') && !from.startsWith('//') ? from : '/'
      router.push(safePath)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Login failed'
      setError(message)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{t('loginTitle')}</CardTitle>
          <CardDescription>{t('loginDescription')}</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('email')}</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="you@example.com"
                          className="pr-10"
                          {...field}
                        />
                      </FormControl>
                      <Mail className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted-foreground" />
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('password')}</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          className="pr-10"
                          {...field}
                        />
                      </FormControl>
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        aria-label={
                          showPassword ? 'Hide password' : 'Show password'
                        }
                      >
                        {showPassword ? (
                          <EyeOff className="size-4" />
                        ) : (
                          <Eye className="size-4" />
                        )}
                      </button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {error && (
                <div className="rounded-md bg-red-50 p-3 text-sm text-red-600">
                  {error}
                </div>
              )}

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? tCommon('loading') : tCommon('login')}
                {isSubmitting && <Spinner className="mr-2 size-4" />}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
