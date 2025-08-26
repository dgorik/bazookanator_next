import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion/accordion'

export default function FAQSection() {
  interface FAQProps {
    question: string
    answer: string
    value: string
  }

  const faqs: FAQProps[] = [
    {
      question: 'What is the Bazookanator?',
      answer:
        'The Bazookanator is an innovative tool designed to help you create and customize your own Bazooka Bubblegum products with ease.',
      value: 'item-1',
    },
    {
      question: 'How do I get started?',
      answer:
        'Simply sign up for a free account, choose your favourite Bazooka products, and start customizing them in the Bazookanator dashboard.',
      value: 'item-2',
    },
    {
      question: 'Can I track my bubblegum production?',
      answer:
        'Yes! The Bazookanator includes dashboards where you can track production volume, sales, and even bubble size statistics.',
      value: 'item-3',
    },
    {
      question: 'Is there a free trial available?',
      answer:
        'Absolutely. We offer a 14-day free trial so you can explore all the features before committing.',
      value: 'item-4',
    },
    {
      question: 'Who can use the Bazookanator?',
      answer:
        'Whether you are a casual fan of bubblegum, a shop owner, or a global candy distributor, the Bazookanator is designed for everyone.',
      value: 'item-5',
    },
  ]

  return (
    <section
      id="faq"
      className="container mx-auto md: w-[700px] py-24 sm: py-32"
    >
      <div className="text-center mb-8">
        <h2>FAQ</h2>
        <h2 className="text-3xl md: text:4xl font-bold">Common Questions</h2>
      </div>
      <Accordion type="single" collapsible>
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  )
}
