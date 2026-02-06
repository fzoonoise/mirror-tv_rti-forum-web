'use client'

import { zodResolver } from '@hookform/resolvers/zod'
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
  const { login, isAuthenticated } = useAuth()
  const [error, setError] = useState<string | null>(null)

  // If session restoration discovers user is already logged in, redirect away
  useEffect(() => {
    if (isAuthenticated) {
      const from = searchParams.get('from') || '/'
      router.push(from)
    }
  }, [isAuthenticated, router, searchParams])

  const loginSchema = useMemo(
    () =>
      z.object({
        email: z.string().email(t('validationEmail')),
        password: z
          .string()
          .min(8, t('validationPasswordMin'))
          .regex(/[A-Z]/, t('validationPasswordUppercase'))
          .regex(/[a-z]/, t('validationPasswordLowercase'))
          .regex(
            /[!@#$%^&*(),.?":{}|<>]/,
            t('validationPasswordSpecial'),
          ),
      }),
    [t],
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
      router.push(from)
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
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="you@example.com"
                        {...field}
                      />
                    </FormControl>
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
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {error && (
                <div className="rounded-md bg-red-50 p-3 text-sm text-red-600">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting}
              >
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
