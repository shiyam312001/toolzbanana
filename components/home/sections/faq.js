import { SectionWrapper } from "../../ui/SectionWrapper";
import { faqs } from "../home-data";

export function FAQ() {
  return (
    <SectionWrapper id="faq" className="border-t border-gray-100 bg-white">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <p className="text-[12px] font-medium text-gray-400">Need quick answers?</p>
          <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900">
            Frequently asked questions
          </h2>
          <p className="mt-3 text-sm text-gray-500">
            Common questions about ToolzBanana privacy, speed, and supported workflows.
          </p>
        </div>

        <div className="mt-8 space-y-3">
          {faqs.map((item) => (
            <details
              key={item.question}
              className="group rounded-2xl border border-gray-200 bg-gray-50/60 p-4 sm:p-5"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm sm:text-base font-semibold text-gray-900">
                {item.question}
                <span className="text-gray-400 transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
