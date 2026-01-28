import { useTranslations } from 'next-intl'

export default function Home() {
  const t = useTranslations('nav')

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold">RTI Forum</h1>
      <p className="mt-4 text-lg">Welcome to RTI Forum</p>
      <div className="mt-8 flex gap-4">
        <span>{t('home')}</span>
        <span>{t('forum')}</span>
        <span>{t('profile')}</span>
      </div>
    </main>
  )
}
