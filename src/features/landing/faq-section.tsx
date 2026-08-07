import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FadeIn } from "@/components/motion/fade-in";

const FAQS = [
  {
    question: "How long does it take to set up AuraHR?",
    answer:
      "Most teams import their employee records and are running attendance and leave tracking within a day. Payroll and recruitment setup typically take a little longer depending on your policies.",
  },
  {
    question: "Can AuraHR handle multiple subsidiaries or business units?",
    answer:
      "Yes. AuraHR supports multi-entity organizations, so you can manage several companies under one workspace while keeping reporting, payroll, and permissions separated where needed.",
  },
  {
    question: "Is our data secure?",
    answer:
      "Data is encrypted in transit and at rest, access is controlled through role-based permissions, and every sensitive action is captured in an audit log.",
  },
  {
    question: "Can we migrate data from spreadsheets or another HR system?",
    answer:
      "Yes. Our onboarding team helps you import existing employee, attendance, and payroll data so you don't start from zero.",
  },
  {
    question: "Do employees need their own login?",
    answer:
      "Yes — employees get a self-service view to request leave, view payslips, and update personal details, while HR admins retain full organizational control.",
  },
];

export function FAQSection() {
  return (
    <section id="faq" className="section-y border-border border-t">
      <div className="container-shell grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_1.4fr]">
        <div>
          <span className="text-primary text-xs font-semibold tracking-wider uppercase">
            FAQ
          </span>
          <h2 className="font-display text-foreground mt-3 text-3xl font-medium tracking-tight text-balance sm:text-[34px]">
            Questions, answered.
          </h2>
          <p className="text-muted-foreground mt-4 max-w-sm text-[15px] leading-relaxed">
            Can&apos;t find what you&apos;re looking for? Reach out and our team will get
            back to you within a business day.
          </p>
        </div>

        <FadeIn>
          <Accordion
            type="single"
            collapsible
            className="border-border bg-card rounded-xl border px-6"
          >
            {FAQS.map((faq) => (
              <AccordionItem key={faq.question} value={faq.question}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </FadeIn>
      </div>
    </section>
  );
}
