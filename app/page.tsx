"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import {
  Scan,
  Shield,
  TrendingUp,
  Upload,
  Search,
  FileText,
  Leaf,
  ArrowRight,
  Sprout,
  Heart,
} from "lucide-react";

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.5, ease: [0.25, 0.4, 0.25, 1] },
  }),
};

const features = [
  {
    icon: Scan,
    title: "Instant Detection",
    description:
      "Upload a crop image and get disease identification in seconds using state-of-the-art deep learning models.",
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-500/10",
  },
  {
    icon: Shield,
    title: "Treatment Plans",
    description:
      "Receive actionable treatment recommendations tailored to the specific disease and severity level detected.",
    color: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-500/10",
  },
  {
    icon: TrendingUp,
    title: "Track & Monitor",
    description:
      "Dashboard analytics to track crop health over time, monitor treatment progress, and prevent future outbreaks.",
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-500/10",
  },
];

const steps = [
  {
    step: "01",
    icon: Upload,
    title: "Upload Image",
    description: "Take a photo of the affected crop and upload it to our platform.",
  },
  {
    step: "02",
    icon: Search,
    title: "AI Analysis",
    description: "Our AI model analyzes the image and detects diseases with high accuracy.",
  },
  {
    step: "03",
    icon: FileText,
    title: "Get Report",
    description:
      "Receive a detailed report with treatment plans and preventive measures.",
  },
];

export default function LandingPage() {
  return (
    <div className="relative">
      {/* ===== HERO SECTION ===== */}
      <section className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-forest-50 via-sage-50 to-wheat-50 dark:from-forest-950/50 dark:via-sage-950/30 dark:to-background" />
        <div className="absolute top-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 sm:w-96 sm:h-96 bg-terracotta-400/5 rounded-full blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-40">
          <div className="max-w-3xl">
            <motion.div
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              <motion.div
                variants={fadeIn}
                custom={0}
                className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary"
              >
                <Sprout className="h-4 w-4" />
                AI-Powered AgriTech Platform
              </motion.div>

              <motion.h1
                variants={fadeIn}
                custom={1}
                className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground"
              >
                AI-Powered{" "}
                <span className="bg-gradient-to-r from-forest-600 to-primary bg-clip-text text-transparent dark:from-forest-400 dark:to-emerald-400">
                  Crop Intelligence
                </span>
              </motion.h1>

              <motion.p
                variants={fadeIn}
                custom={2}
                className="text-xl sm:text-2xl font-medium text-muted-foreground"
              >
                Detect. Diagnose. Protect.
              </motion.p>

              <motion.p
                variants={fadeIn}
                custom={3}
                className="text-base text-muted-foreground max-w-xl leading-relaxed"
              >
                Leverage advanced AI to detect crop diseases early, get instant
                treatment recommendations, and safeguard your harvest — all from
                a single image upload.
              </motion.p>

              <motion.div
                variants={fadeIn}
                custom={4}
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2"
              >
                <Link
                  href="/analyze"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-3 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:bg-primary/90 transition-all duration-300 w-full sm:w-auto"
                >
                  <Scan className="h-5 w-5" />
                  Analyze Crop
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/dashboard"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-border px-6 py-3 text-base font-semibold text-foreground hover:bg-muted transition-all duration-200 w-full sm:w-auto"
                >
                  View Dashboard
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== FEATURES SECTION ===== */}
      <section className="py-20 sm:py-28 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-14"
          >
            <motion.h2
              variants={fadeIn}
              custom={0}
              className="text-3xl sm:text-4xl font-bold tracking-tight"
            >
              Protect Your Crops with AI
            </motion.h2>
            <motion.p
              variants={fadeIn}
              custom={1}
              className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              From detection to treatment — our AI platform covers every step of
              crop disease management.
            </motion.p>
          </motion.div>

          <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeIn}
                custom={i}
                className="group relative rounded-2xl border border-border/50 bg-card p-7 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative space-y-4">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${feature.bg}`}
                  >
                    <feature.icon className={`h-6 w-6 ${feature.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-14"
          >
            <motion.h2
              variants={fadeIn}
              custom={0}
              className="text-3xl sm:text-4xl font-bold tracking-tight"
            >
              How It Works
            </motion.h2>
            <motion.p
              variants={fadeIn}
              custom={1}
              className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              Three simple steps to protect your crops and maximize your yield.
            </motion.p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            {steps.map((item, i) => (
              <motion.div
                key={item.step}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeIn}
                custom={i}
                className="relative text-center"
              >
                {/* Connector line */}
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-px bg-gradient-to-r from-border to-transparent" />
                )}
                <div className="flex flex-col items-center gap-4">
                  <div className="relative">
                    <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10">
                      <item.icon className="h-8 w-8 text-primary" />
                    </div>
                    <span className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground max-w-xs">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="border-t border-border/40 bg-card/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Leaf className="h-5 w-5 text-primary" />
              <span className="font-bold">
                Chedii<span className="text-primary">AI</span>
              </span>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <Link href="/analyze" className="hover:text-foreground transition-colors">
                Analyze
              </Link>
              <Link href="/dashboard" className="hover:text-foreground transition-colors">
                Dashboard
              </Link>
            </div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              Built with <Heart className="h-3 w-3 text-red-500" /> for farmers
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
