"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar as CalendarIcon, Clock, ArrowRight, CheckCircle2, Info } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

const TIME_SLOTS = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "13:30", "14:00", "15:30", "16:00"
];

const TOOLTIPS: Record<string, string> = {
  "09:00": "Early bird slot — great for quick decisions",
  "09:30": "Fresh morning energy for deep dives",
  "10:00": "Our most popular slot",
  "10:30": "Mid-morning clarity",
  "11:00": "Last morning slot before lunch",
  "13:30": "Post-lunch power session",
  "14:00": "Afternoon focus block",
  "15:30": "Late afternoon strategy",
  "16:00": "Final slot of the day",
};

const monthFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  year: "numeric",
});
const selectedDateFormatter = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
});

export default function BookingWidget() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [hoveredTime, setHoveredTime] = useState<string | null>(null);
  const [serviceInterest, setServiceInterest] = useState("");
  const [otherDetails, setOtherDetails] = useState("");

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(step + 1 as 2 | 3);
  };

  const today = new Date();
  const displayYear = today.getFullYear();
  const displayMonth = today.getMonth();
  const monthLabel = monthFormatter.format(new Date(displayYear, displayMonth, 1));
  const daysInMonth = new Date(displayYear, displayMonth + 1, 0).getDate();
  const firstWeekday = (new Date(displayYear, displayMonth, 1).getDay() + 6) % 7;
  const selectedDateValue =
    selectedDate === null
      ? null
      : new Date(displayYear, displayMonth, selectedDate);
  const selectedDateLabel = selectedDateValue
    ? selectedDateFormatter.format(selectedDateValue)
    : null;

  // World clocks
  const paramariboTime = new Date().toLocaleTimeString("en-US", {
    timeZone: "America/Paramaribo",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const localTime = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return (
    <Reveal>
      <div className="overflow-hidden rounded-2xl border border-swamp/10 bg-white shadow-[0_20px_48px_-26px_rgba(0,30,28,0.35)]">
        <div className="flex items-center gap-2 border-b border-swamp/10 bg-bone-50 px-4 py-3">
          <div className="w-3 h-3 rounded-full bg-red-400/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
          <div className="w-3 h-3 rounded-full bg-malachite/80" />
          <span className="ml-3 text-xs font-mono text-swamp/45">tad.sr/book</span>
        </div>

        <div className="flex min-h-[620px] flex-col overflow-hidden bg-white p-0 md:flex-row">
          {/* Left sidebar */}
          <div className="flex flex-col border-b border-swamp/10 bg-bone-50/70 p-8 md:w-1/3 md:border-b-0 md:border-r">
            <div className="mb-8">
              <span className="label-tech text-malachite-700">Strategy Call</span>
              <h3 className="mt-2 text-2xl font-semibold text-swamp">Discovery & Scoping</h3>
              <div className="mt-6 space-y-4 text-sm font-medium text-swamp/75">
                <div className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-malachite-700" />
                  30 min
                </div>
                <div className="flex items-center gap-3">
                  <CalendarIcon className="h-4 w-4 text-malachite-700" />
                  Google Meet / Zoom
                </div>
              </div>
            </div>
            <p className="mt-auto text-sm leading-relaxed text-swamp/75">
              During this free call, we will discuss your current challenges, explore potential solutions, and outline a high-level roadmap for your digital transformation.
            </p>

            {/* World clocks */}
            <div className="mt-6 rounded-lg border border-swamp/10 bg-white p-3 font-mono text-[11px] text-swamp/60">
              <div className="flex justify-between">
                <span>Paramaribo (AST)</span>
                <span className="text-malachite-700 font-semibold">{paramariboTime}</span>
              </div>
              <div className="flex justify-between mt-1">
                <span>Your local time</span>
                <span className="text-swamp font-semibold">{localTime}</span>
              </div>
            </div>
          </div>

          {/* Right Side: Interactive Panel */}
          <div className="relative bg-white p-8 md:w-2/3">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="h-full flex flex-col"
                >
                  <h4 className="mb-6 text-xl font-semibold text-swamp">Select a Date & Time</h4>
                  <div className="grid md:grid-cols-2 gap-8 flex-1">
                    {/* Calendar Mock */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-medium text-swamp">{monthLabel}</span>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            aria-label="Previous month"
                            disabled
                            className="flex h-8 w-8 cursor-not-allowed items-center justify-center rounded-full text-swamp/25"
                          >
                            &lt;
                          </button>
                          <button
                            type="button"
                            aria-label="Next month"
                            disabled
                            className="flex h-8 w-8 cursor-not-allowed items-center justify-center rounded-full text-swamp/25"
                          >
                            &gt;
                          </button>
                        </div>
                      </div>
                      <div className="mb-2 grid grid-cols-7 gap-1 text-center text-xs font-medium text-swamp/50">
                        <div>MON</div><div>TUE</div><div>WED</div><div>THU</div><div>FRI</div><div>SAT</div><div>SUN</div>
                      </div>
                      <div className="grid grid-cols-7 gap-1 text-sm">
                        {Array.from({ length: firstWeekday }).map((_, i) => (
                          <div key={`empty-${i}`} aria-hidden />
                        ))}
                        {Array.from({ length: daysInMonth }).map((_, i) => {
                          const date = i + 1;
                          const dateValue = new Date(displayYear, displayMonth, date);
                          const isPast =
                            dateValue <
                            new Date(today.getFullYear(), today.getMonth(), today.getDate());
                          const isSelected = selectedDate === date;
                          return (
                            <button
                              key={i}
                              type="button"
                              disabled={isPast}
                              aria-pressed={isSelected}
                              aria-label={selectedDateFormatter.format(dateValue)}
                              onClick={() => setSelectedDate(date)}
                              className={`aspect-square rounded-full flex items-center justify-center transition-all ${
                                isPast
                                  ? "text-swamp/20 cursor-not-allowed"
                                  : isSelected
                                  ? "bg-malachite text-swamp font-bold shadow-sm"
                                  : "text-swamp hover:bg-malachite/10 font-medium"
                              }`}
                            >
                              {date}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Time Slots */}
                    <div className="relative border-t border-swamp/10 pt-8 md:border-l md:border-t-0 md:pl-8 md:pt-0">
                      <span className="mb-4 block font-medium text-swamp">
                        {selectedDateLabel ?? "Select a date first"}
                      </span>
                      <div className="space-y-2 h-[280px] overflow-y-auto pr-2 custom-scrollbar">
                        {selectedDate ? (
                          TIME_SLOTS.map((time) => (
                            <div key={time} className="relative">
                              <button
                                type="button"
                                onClick={() => setSelectedTime(time)}
                                onMouseEnter={() => setHoveredTime(time)}
                                onMouseLeave={() => setHoveredTime(null)}
                                aria-pressed={selectedTime === time}
                                aria-label={`Select ${time}`}
                                className={`relative w-full rounded-lg border py-3 text-sm font-medium transition-all ${
                                  selectedTime === time
                                    ? "border-malachite bg-malachite/10 text-swamp"
                                    : "border-swamp/12 bg-bone-50/30 text-swamp/70 hover:border-malachite/40 hover:bg-malachite/[0.04]"
                                }`}
                              >
                                {time}
                                <Info className={`absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 transition-opacity ${hoveredTime === time ? "opacity-60" : "opacity-0"}`} />
                              </button>
                              {/* Tooltip */}
                              <AnimatePresence>
                                {hoveredTime === time && TOOLTIPS[time] && (
                                  <motion.div
                                    initial={{ opacity: 0, y: 4 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 4 }}
                                    className="absolute -top-8 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded bg-swamp px-2 py-1 font-mono text-[10px] text-white"
                                  >
                                    {TOOLTIPS[time]}
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          ))
                        ) : (
                          <div className="flex h-full items-center justify-center text-center text-sm text-swamp/40">
                            Please select a date to view available times.
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 flex justify-end">
                    <Button
                      onClick={() => setStep(2)}
                      disabled={!selectedDate || !selectedTime}
                      className="w-full md:w-auto"
                    >
                      Next Step <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="h-full flex flex-col"
                >
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    aria-label="Back to date and time selection"
                          className="mb-6 flex items-center gap-1 text-sm font-medium text-swamp/50 hover:text-malachite-700"
                  >
                    &lt; Back
                  </button>
	                  <h4 className="mb-6 text-xl font-semibold text-swamp">Your Details</h4>
	                  <form onSubmit={handleNext} className="space-y-4 flex-1">
	                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label htmlFor="first-name" className="text-sm font-medium text-swamp/80">First Name</label>
                        <input id="first-name" name="firstName" autoComplete="given-name" required className="w-full rounded-lg border border-swamp/12 bg-bone-50/35 px-4 py-2.5 text-sm text-swamp outline-none transition focus:border-malachite/45 focus:bg-white focus:ring-2 focus:ring-malachite/15" />
                      </div>
                      <div className="space-y-1.5">
                        <label htmlFor="last-name" className="text-sm font-medium text-swamp/80">Last Name</label>
                        <input id="last-name" name="lastName" autoComplete="family-name" required className="w-full rounded-lg border border-swamp/12 bg-bone-50/35 px-4 py-2.5 text-sm text-swamp outline-none transition focus:border-malachite/45 focus:bg-white focus:ring-2 focus:ring-malachite/15" />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="work-email" className="text-sm font-medium text-swamp/80">Work Email</label>
                      <input id="work-email" name="email" autoComplete="email" required type="email" className="w-full rounded-lg border border-swamp/12 bg-bone-50/35 px-4 py-2.5 text-sm text-swamp outline-none transition focus:border-malachite/45 focus:bg-white focus:ring-2 focus:ring-malachite/15" />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="service-interest" className="text-sm font-medium text-swamp/80">What do you need help with?</label>
                      <select
                        id="service-interest"
                        name="service"
                        required
                        value={serviceInterest}
                        onChange={(e) => {
                          const value = e.target.value;
                          setServiceInterest(value);
                          if (value !== "other") setOtherDetails("");
                        }}
                        className="w-full rounded-lg border border-swamp/12 bg-bone-50/35 px-4 py-2.5 text-sm text-swamp outline-none transition focus:border-malachite/45 focus:bg-white focus:ring-2 focus:ring-malachite/15"
                      >
                        <option value="">Select a service...</option>
                        <option value="web">Web Development</option>
                        <option value="ecommerce">E-Commerce</option>
                        <option value="mobile">Mobile App</option>
                        <option value="marketing">Digital Marketing</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <AnimatePresence>
                      {serviceInterest === "other" && (
                        <motion.div
                          key="other-details"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="space-y-1.5 overflow-hidden"
                        >
                          <label htmlFor="other-details" className="text-sm font-medium text-swamp/80">
                            Tell us what you&apos;re looking for
                          </label>
                          <textarea
                            id="other-details"
                            name="otherDetails"
                            required
                            rows={3}
                            value={otherDetails}
                            onChange={(e) => setOtherDetails(e.target.value)}
                            placeholder="Describe your project, goals, or what you need help with..."
                            className="w-full resize-none rounded-lg border border-swamp/12 bg-bone-50/35 px-4 py-2.5 text-sm text-swamp outline-none transition placeholder:text-swamp/35 focus:border-malachite/45 focus:bg-white focus:ring-2 focus:ring-malachite/15"
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <div className="space-y-1.5">
                      <label htmlFor="budget-range" className="text-sm font-medium text-swamp/80">Estimated Budget</label>
                      <select id="budget-range" name="budget" className="w-full rounded-lg border border-swamp/12 bg-bone-50/35 px-4 py-2.5 text-sm text-swamp outline-none transition focus:border-malachite/45 focus:bg-white focus:ring-2 focus:ring-malachite/15">
                        <option value="">Select budget range...</option>
                        <option value="<5k">&lt; $5,000</option>
                        <option value="5k-15k">$5,000 - $15,000</option>
                        <option value="15k-50k">$15,000 - $50,000</option>
                        <option value=">50k">&gt; $50,000</option>
                      </select>
                    </div>
                    <div className="pt-6 flex justify-end">
                      <Button type="submit" className="w-full md:w-auto">
                        Confirm Booking
                      </Button>
                    </div>
                  </form>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center py-12"
                >
                  <div className="h-20 w-20 rounded-full bg-malachite/20 flex items-center justify-center mb-6 text-malachite-700">
                    <CheckCircle2 className="h-10 w-10" />
                  </div>
                  <h4 className="mb-2 text-2xl font-semibold text-swamp">You&apos;re all set!</h4>
                  <p className="mx-auto mb-8 max-w-sm text-swamp/60">
                    A calendar invitation for your strategy call has been sent to your email address.
                  </p>
	                  <div className="inline-block rounded-xl border border-swamp/10 bg-bone-50/70 p-4 text-left">
	                    <div className="text-sm font-semibold text-swamp">Discovery & Scoping Call</div>
	                    <div className="mt-1 flex items-center gap-2 text-sm text-swamp/70">
	                      <CalendarIcon className="h-3.5 w-3.5" />
                      {selectedDateLabel} at {selectedTime}
	                    </div>
	                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
