import Link from 'next/link';
import Image from 'next/image';

import { Button } from '@/components/ui/button';

import { ChevronRight, BarChart3, ShoppingBag, Upload, PieChart } from 'lucide-react';

import Header from '@/components/home/header';
import Footer from '@/components/home/footer';

export default function Home() {
    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">
                <section className="py-20 md:py-28">
                    <div className="container px-4 md:px-6">
                        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
                            <div className="flex flex-col justify-center space-y-4">
                                <div className="space-y-2">
                                    <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                                        Retail Intelligence for{' '}
                                        <span className="gradient-text">Everyone</span>
                                    </h1>
                                    <p className="max-w-[600px] text-muted-foreground md:text-xl">
                                        Simplifying data collection for small retailers and
                                        empowering industry players with actionable insights.
                                    </p>
                                </div>
                                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                                    <Link href="/auth/register?role=retailer">
                                        <Button size="lg" className="gap-1">
                                            Join as Retailer <ChevronRight className="h-4 w-4" />
                                        </Button>
                                    </Link>
                                    <Link href="/auth/register?role=industry">
                                        <Button size="lg" variant="outline" className="gap-1">
                                            Join as Industry <ChevronRight className="h-4 w-4" />
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                            <div className="mx-auto lg:mx-0 relative">
                                <div className="absolute -top-4 -left-4 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-2xl opacity-50 dark:bg-purple-900"></div>
                                <div className="absolute -bottom-4 -right-4 w-72 h-72 bg-violet-300 rounded-full mix-blend-multiply filter blur-2xl opacity-50 dark:bg-violet-900"></div>
                                <div className="relative p-2 shadow-lg">
                                    <Image
                                        src="/dashboard-preview.svg?height=200&width=600"
                                        alt="Dashboard Preview"
                                        width={550}
                                        height={350}
                                        className="rounded-md"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="features" className="py-16 bg-muted/50 scroll-mt-24">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                                    Key Features
                                </h2>
                                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                    Designed to make retail data collection and analysis seamless
                                    and insightful
                                </p>
                            </div>
                        </div>
                        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
                            <div className="flex flex-col items-center space-y-2 rounded-lg border bg-card p-6 shadow-sm">
                                <div className="rounded-full bg-primary/10 p-3">
                                    <Upload className="h-6 w-6 text-primary" />
                                </div>
                                <h3 className="text-xl font-bold">OCR Document Upload</h3>
                                <p className="text-center text-muted-foreground">
                                    Easily upload receipts and let our AI extract all the important
                                    data automatically
                                </p>
                            </div>
                            <div className="flex flex-col items-center space-y-2 rounded-lg border bg-card p-6 shadow-sm">
                                <div className="rounded-full bg-primary/10 p-3">
                                    <ShoppingBag className="h-6 w-6 text-primary" />
                                </div>
                                <h3 className="text-xl font-bold">Guided Submissions</h3>
                                <p className="text-center text-muted-foreground">
                                    Our chatbot guides retailers through the data submission process
                                    step by step
                                </p>
                            </div>
                            <div className="flex flex-col items-center space-y-2 rounded-lg border bg-card p-6 shadow-sm">
                                <div className="rounded-full bg-primary/10 p-3">
                                    <BarChart3 className="h-6 w-6 text-primary" />
                                </div>
                                <h3 className="text-xl font-bold">Intelligent Dashboards</h3>
                                <p className="text-center text-muted-foreground">
                                    Powerful analytics dashboards with actionable insights for
                                    industry players
                                </p>
                            </div>
                            <div className="flex flex-col items-center space-y-2 rounded-lg border bg-card p-6 shadow-sm">
                                <div className="rounded-full bg-primary/10 p-3">
                                    <PieChart className="h-6 w-6 text-primary" />
                                </div>
                                <h3 className="text-xl font-bold">Data Visualization</h3>
                                <p className="text-center text-muted-foreground">
                                    Interactive charts and graphs to help understand market trends
                                    and patterns
                                </p>
                            </div>
                            <div className="flex flex-col items-center space-y-2 rounded-lg border bg-card p-6 shadow-sm">
                                <div className="rounded-full bg-primary/10 p-3">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="h-6 w-6 text-primary"
                                    >
                                        <path d="M12 8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                                        <path d="M12 2c-4.4 0-8 3.6-8 8 0 5.4 7 11.5 7.3 11.8.2.1.5.2.7.2.2 0 .5-.1.7-.2.3-.3 7.3-6.4 7.3-11.8 0-4.4-3.6-8-8-8zm0 12c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold">Regional Insights</h3>
                                <p className="text-center text-muted-foreground">
                                    Analyze data by geographic regions to identify market
                                    opportunities
                                </p>
                            </div>
                            <div className="flex flex-col items-center space-y-2 rounded-lg border bg-card p-6 shadow-sm">
                                <div className="rounded-full bg-primary/10 p-3">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="h-6 w-6 text-primary"
                                    >
                                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                                        <path d="m9 12 2 2 4-4" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold">Secure & Private</h3>
                                <p className="text-center text-muted-foreground">
                                    Enterprise-grade security to protect sensitive retail data and
                                    maintain privacy
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="how-it-works" className="py-16 scroll-mt-24">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                                    How It Works
                                </h2>
                                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                    Simple process for both retailers and industry analysts
                                </p>
                            </div>
                        </div>
                        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-2">
                            <div className="rounded-lg border bg-card p-8 shadow-sm">
                                <h3 className="text-2xl font-bold mb-4 flex items-center">
                                    <ShoppingBag className="h-6 w-6 mr-2 text-primary" />
                                    For Retailers
                                </h3>
                                <ol className="space-y-4">
                                    <li className="flex gap-3">
                                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                                            1
                                        </div>
                                        <div>
                                            <h4 className="font-medium leading-none">Sign Up</h4>
                                            <p className="text-sm text-muted-foreground mt-1">
                                                Create your account as a retailer in just a few
                                                steps
                                            </p>
                                        </div>
                                    </li>
                                    <li className="flex gap-3">
                                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                                            2
                                        </div>
                                        <div>
                                            <h4 className="font-medium leading-none">
                                                Submit Data
                                            </h4>
                                            <p className="text-sm text-muted-foreground mt-1">
                                                Upload receipts via photo, chat with our bot, or use
                                                the manual form
                                            </p>
                                        </div>
                                    </li>
                                    <li className="flex gap-3">
                                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                                            3
                                        </div>
                                        <div>
                                            <h4 className="font-medium leading-none">
                                                Verify & Submit
                                            </h4>
                                            <p className="text-sm text-muted-foreground mt-1">
                                                Review the extracted data and confirm submission
                                            </p>
                                        </div>
                                    </li>
                                    <li className="flex gap-3">
                                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                                            4
                                        </div>
                                        <div>
                                            <h4 className="font-medium leading-none">
                                                Earn Rewards
                                            </h4>
                                            <p className="text-sm text-muted-foreground mt-1">
                                                Get points and climb the leaderboard for consistent
                                                submissions
                                            </p>
                                        </div>
                                    </li>
                                </ol>
                            </div>
                            <div className="rounded-lg border bg-card p-8 shadow-sm">
                                <h3 className="text-2xl font-bold mb-4 flex items-center">
                                    <BarChart3 className="h-6 w-6 mr-2 text-primary" />
                                    For Industry Analysts
                                </h3>
                                <ol className="space-y-4">
                                    <li className="flex gap-3">
                                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                                            1
                                        </div>
                                        <div>
                                            <h4 className="font-medium leading-none">Sign Up</h4>
                                            <p className="text-sm text-muted-foreground mt-1">
                                                Create your account as an industry analyst
                                            </p>
                                        </div>
                                    </li>
                                    <li className="flex gap-3">
                                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                                            2
                                        </div>
                                        <div>
                                            <h4 className="font-medium leading-none">
                                                Access Dashboard
                                            </h4>
                                            <p className="text-sm text-muted-foreground mt-1">
                                                View comprehensive analytics and insights from
                                                retailer data
                                            </p>
                                        </div>
                                    </li>
                                    <li className="flex gap-3">
                                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                                            3
                                        </div>
                                        <div>
                                            <h4 className="font-medium leading-none">
                                                Analyze Trends
                                            </h4>
                                            <p className="text-sm text-muted-foreground mt-1">
                                                Discover patterns and opportunities in sell-out data
                                            </p>
                                        </div>
                                    </li>
                                    <li className="flex gap-3">
                                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                                            4
                                        </div>
                                        <div>
                                            <h4 className="font-medium leading-none">
                                                Create Campaigns
                                            </h4>
                                            <p className="text-sm text-muted-foreground mt-1">
                                                Develop targeted campaigns based on data insights
                                            </p>
                                        </div>
                                    </li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="testimonials" className="py-16 bg-muted/50 scroll-mt-24">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                                    What Our Users Say
                                </h2>
                                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                    Hear from retailers and industry analysts who use Descomplica
                                </p>
                            </div>
                        </div>
                        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
                            <div className="flex flex-col justify-between rounded-lg border bg-card p-6 shadow-sm">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <svg
                                                key={star}
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                                className="h-5 w-5 text-yellow-500"
                                            >
                                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                            </svg>
                                        ))}
                                    </div>
                                    <p className="text-muted-foreground">
                                        "Descomplica has simplified our data reporting process. The
                                        OCR feature saves us hours of manual data entry each week."
                                    </p>
                                </div>
                                <div className="mt-6 flex items-center gap-4 pt-4 border-t">
                                    <div className="rounded-full bg-muted p-1">
                                        <div className="h-8 w-8 rounded-full bg-primary/20" />
                                    </div>
                                    <div>
                                        <p className="font-medium">Maria Silva</p>
                                        <p className="text-sm text-muted-foreground">
                                            Small Grocery Owner
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col justify-between rounded-lg border bg-card p-6 shadow-sm">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <svg
                                                key={star}
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                                className="h-5 w-5 text-yellow-500"
                                            >
                                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                            </svg>
                                        ))}
                                    </div>
                                    <p className="text-muted-foreground">
                                        "The insights we get from Descomplica have transformed our
                                        marketing strategy. We can now target specific regions with
                                        precision."
                                    </p>
                                </div>
                                <div className="mt-6 flex items-center gap-4 pt-4 border-t">
                                    <div className="rounded-full bg-muted p-1">
                                        <div className="h-8 w-8 rounded-full bg-primary/20" />
                                    </div>
                                    <div>
                                        <p className="font-medium">Carlos Mendes</p>
                                        <p className="text-sm text-muted-foreground">
                                            Marketing Director
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col justify-between rounded-lg border bg-card p-6 shadow-sm">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <svg
                                                key={star}
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                                className="h-5 w-5 text-yellow-500"
                                            >
                                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                            </svg>
                                        ))}
                                    </div>
                                    <p className="text-muted-foreground">
                                        "The gamification aspect keeps our team engaged. We actually
                                        look forward to submitting our data now!"
                                    </p>
                                </div>
                                <div className="mt-6 flex items-center gap-4 pt-4 border-t">
                                    <div className="rounded-full bg-muted p-1">
                                        <div className="h-8 w-8 rounded-full bg-primary/20" />
                                    </div>
                                    <div>
                                        <p className="font-medium">Ana Ferreira</p>
                                        <p className="text-sm text-muted-foreground">
                                            Pharmacy Manager
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-16 bg-primary text-primary-foreground">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                                    Ready to Get Started?
                                </h2>
                                <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                    Join Descomplica today and transform how you handle retail data
                                </p>
                            </div>
                            <div className="flex flex-col gap-2 min-[400px]:flex-row">
                                <Link href="/auth/register?role=retailer">
                                    <Button size="lg" variant="secondary" className="gap-1">
                                        Join as Retailer <ChevronRight className="h-4 w-4" />
                                    </Button>
                                </Link>
                                <Link href="/auth/register?role=industry">
                                    <Button
                                        size="lg"
                                        variant="outline"
                                        className="gap-1 bg-primary/20 hover:bg-primary/30 border-primary-foreground/20"
                                    >
                                        Join as Industry <ChevronRight className="h-4 w-4" />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
