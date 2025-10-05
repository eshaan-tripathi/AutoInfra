'use client'

import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/24/outline'

const faqs = [
  { question: 'What is AutoInfra?', answer: 'AutoInfra automates cloud infrastructure deployment so businesses can scale faster and smarter.' },
  { question: 'Which cloud providers are supported?', answer: 'We support AWS, Azure, and GCP, with more coming soon.' },
  { question: 'Is there a free trial?', answer: 'Yes, you get a 14-day free trial with full feature access.' },
  { question: 'How secure is my data?', answer: 'We use industry-standard encryption, access control, and audits to keep your data safe.' },
]

export default function FAQ() {
  return (
    <section className="relative bg-gray-900 py-20 px-6 lg:px-32 overflow-hidden flex flex-col items-center" id="faq">
      {/* Centered Background Blobs */}
      <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 rounded-full opacity-30 blur-3xl animate-blob -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-tr from-purple-500 via-indigo-500 to-blue-500 rounded-full opacity-30 blur-3xl animate-blob animation-delay-2000 -translate-x-1/2 -translate-y-1/2"></div>

      {/* Section Header */}
      <div className="relative z-10 max-w-4xl text-center mb-12">
        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">Frequently Asked Questions</h2>
        <p className="text-gray-400 text-lg lg:text-xl">Everything you need to know about AutoInfra and how it can help your business.</p>
      </div>

      {/* FAQ Items */}
      <div className="relative z-10 max-w-4xl w-full space-y-4">
        {faqs.map((faq, i) => (
          <Disclosure key={i}>
            {({ open }) => (
              <div className="bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition hover:bg-gray-700">
                <Disclosure.Button className="flex cursor-pointer justify-between items-center w-full text-left font-medium text-lg text-white">
                  <span>{faq.question}</span>
                  <ChevronUpIcon className={`h-6 w-6 text-indigo-400 transition-transform ${open ? 'rotate-180' : ''}`} />
                </Disclosure.Button>
                <Disclosure.Panel className="mt-4 text-gray-300">{faq.answer}</Disclosure.Panel>
              </div>
            )}
          </Disclosure>
        ))}
      </div>
    </section>
  )
}
