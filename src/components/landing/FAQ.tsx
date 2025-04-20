
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";

const FAQ = () => {
  const faqs = [
    {
      question: "How does DSTRO7's AI improve my playlist pitches?",
      answer: "Our AI system has been trained on thousands of successful playlist submissions, learning the patterns and language that resonate with curators. It analyzes your music's characteristics and creates personalized pitches that highlight your unique strengths while maintaining a professional tone."
    },
    {
      question: "What makes DSTRO7 different from traditional pitching?",
      answer: "DSTRO7 combines AI intelligence with industry best practices. While traditional pitching relies on templates or guesswork, our system learns from real successful pitches, adapting to current trends and curator preferences. Plus, you can generate multiple versions and refine them based on AI suggestions."
    },
    {
      question: "How long does it take to create a pitch?",
      answer: "With DSTRO7, you can create a professional, customized pitch in minutes. Our AI processes your input instantly, allowing you to generate, review, and refine your pitch quickly. Traditional pitch writing often takes hours to perfect."
    },
    {
      question: "Can I customize the AI-generated pitches?",
      answer: "Absolutely! While our AI creates the initial pitch based on your input and successful patterns, you have full control to edit, refine, and personalize the content. The system also accepts your feedback to generate alternative versions."
    },
    {
      question: "Do you guarantee playlist placement?",
      answer: "While we can't guarantee placement, our AI-powered system significantly improves your chances by crafting compelling, curator-focused pitches based on proven successful submissions. We provide the tools and insights for optimal outreach."
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-background via-primary/5 to-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
          <p className="text-muted-foreground">Everything you need to know about our AI-powered pitching service</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="glass-card mb-4">
                <AccordionTrigger className="text-lg font-medium px-4">{faq.question}</AccordionTrigger>
                <AccordionContent className="px-4 text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
