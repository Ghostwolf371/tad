"use client";

import { useState, useEffect, useRef, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { MessageCircle, X } from "lucide-react";

const TYPING_MESSAGES = [
  "Hi there! Need help?",
  "We typically reply in minutes.",
  "Let's chat on WhatsApp!",
];

function TypewriterText({ messages }: { messages: string[] }) {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <div className="relative h-4 mt-1">
      <AnimatePresence mode="wait">
        <motion.p
          key={messageIndex}
          className="absolute inset-0 text-xs text-swamp/70"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={{
            hidden: { opacity: 0 },
            visible: { 
              opacity: 1,
              transition: { staggerChildren: 0.05 }
            },
            exit: { opacity: 0, transition: { duration: 0.2 } }
          }}
        >
          {messages[messageIndex].split("").map((char, index) => (
            <motion.span
              key={index}
              variants={{
                hidden: { opacity: 0, display: "none" },
                visible: { opacity: 1, display: "inline-block" }
              }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="inline-block w-0.75 h-3 ml-0.5 bg-malachite align-middle"
          />
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

const ROBOT_ANCHOR_CLASS =
  "fixed z-[60] flex flex-col items-end gap-3 overflow-visible pointer-events-none " +
  "bottom-[calc(2.75rem+env(safe-area-inset-bottom,0px))] " +
  "right-[calc(1rem+env(safe-area-inset-right,0px))] " +
  "sm:bottom-[calc(3.25rem+env(safe-area-inset-bottom,0px))] sm:right-8";

const subscribeToClientMount = (onStoreChange: () => void) => {
  queueMicrotask(onStoreChange);
  return () => {};
};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export default function WhatsAppRobot() {
  const [isHovered, setIsHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const shownRef = useRef(false);
  const portalReady = useSyncExternalStore(
    subscribeToClientMount,
    getClientSnapshot,
    getServerSnapshot
  );

  useEffect(() => {
    let closeTimer: ReturnType<typeof setTimeout>;
    const reveal = () => {
      if (shownRef.current) return;
      shownRef.current = true;
      setIsOpen(true);
      closeTimer = setTimeout(() => setIsOpen(false), 12000);
    };

    // Desktop: greet right away. Mobile: wait until the user scrolls down a
    // bit so the bubble doesn't stack on top of the cookie notice at load.
    if (window.matchMedia("(min-width: 768px)").matches) {
      reveal();
      return () => clearTimeout(closeTimer);
    }

    const onScroll = () => {
      if (window.scrollY > 700) reveal();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(closeTimer);
    };
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape" && isOpen) {
      setIsOpen(false);
    }
  };

  if (!portalReady) return null;

  return createPortal(
    <div
      className={ROBOT_ANCHOR_CLASS}
      aria-live="polite"
      role="complementary"
      aria-label="WhatsApp chat widget"
      onKeyDown={handleKeyDown}
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="pointer-events-auto origin-bottom-right"
            role="dialog"
            aria-label="Chat with us on WhatsApp"
          >
            <div className="relative flex w-64 flex-col gap-3 rounded-2xl bg-white p-4 shadow-2xl ring-1 ring-swamp/5 sm:w-72">
              <button
                onClick={() => setIsOpen(false)}
                className="absolute right-3 top-3 rounded-full p-1 text-swamp/40 transition-colors hover:bg-swamp/5 hover:text-swamp focus:outline-none focus:ring-2 focus:ring-malachite/60"
                aria-label="Close chat"
              >
                <X className="h-4 w-4" />
              </button>
              
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-malachite/10 border border-malachite/20">
                  <div className="relative flex h-6 w-6 items-center justify-center">
                    <motion.div 
                      animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.7, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute h-full w-full rounded-full bg-malachite blur-[2px]"
                      aria-hidden="true"
                    />
                    <div className="h-3 w-3 rounded-full bg-malachite shadow-lg shadow-malachite/50" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="flex items-baseline gap-1 text-sm font-semibold text-swamp">
                    <span className="font-sans text-sm font-bold lowercase tracking-normal text-swamp">
                      tad
                    </span>
                    <span className="font-sans font-semibold">Chatbot</span>
                  </h3>
                  <TypewriterText messages={TYPING_MESSAGES} />
                </div>
              </div>

              <Link
                href="https://wa.me/5978925686"
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#20BE5C] hover:shadow-md active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-[#25D366]"
                aria-label="Open WhatsApp chat"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                Chat on WhatsApp
              </Link>

              {/* Bubble Tail */}
              <div className="absolute -bottom-2 right-6 h-4 w-4 rotate-45 border-b border-r border-swamp/5 bg-white" aria-hidden="true" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen((prev) => !prev)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="pointer-events-auto relative flex h-16 w-16 items-center justify-center overflow-visible sm:h-20 sm:w-20 cursor-pointer border-none bg-transparent appearance-none p-0 pb-2 focus:outline-none focus:ring-2 focus:ring-malachite/60"
        aria-label={isOpen ? "Close chat" : "Open chat"}
        aria-expanded={isOpen}
      >
        <motion.div
          animate={{ y: isHovered ? [0, -6, 0] : [0, -4, 0] }}
          transition={{
            duration: isHovered ? 0.8 : 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="h-full w-full overflow-visible"
        >
          <svg
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-full w-full drop-shadow-2xl overflow-visible"
          >
            <defs>
              <linearGradient id="bodyGradient" x1="50" y1="15" x2="50" y2="75" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#e8eaf6" />
              </linearGradient>
              <linearGradient id="visorGradient" x1="50" y1="30" x2="50" y2="55" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#000a09" />
                <stop offset="100%" stopColor="#001e1c" />
              </linearGradient>
            </defs>

            {/* Glowing Aura when hovered */}
            <motion.circle
              cx="50"
              cy="50"
              r="35"
              fill="#00e357"
              initial={{ opacity: 0, scale: 1 }}
              animate={{
                opacity: isHovered ? [0.15, 0.25, 0.15] : [0, 0, 0],
                scale: isHovered ? [1, 1.15, 1] : [1, 1, 1],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              style={{ filter: "blur(15px)" }}
            />

            {/* Thruster Flame (Animated) */}
            <motion.path 
              d="M 44,78 Q 50,96 56,78 Z"
              fill="#00e357" 
              animate={{ 
                scaleY: [1, 1.4, 1], 
                opacity: [0.6, 1, 0.6],
                filter: ["blur(2px)", "blur(4px)", "blur(2px)"]
              }}
              transition={{ duration: 0.5, repeat: Infinity }}
              style={{ transformOrigin: "50px 78px" }}
            />

            {/* Jet Engine Nozzle */}
            <path 
              d="M 41,72 C 41,78 59,78 59,72 Z" 
              fill="#b3c0bf" 
              stroke="#001e1c" 
              strokeWidth="2.5" 
            />

            {/* Animated Antenna */}
            <motion.path 
              d="M 50,15 L 50,3" 
              stroke="#001e1c" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              animate={{ rotate: isHovered ? [0, 10, -10, 0] : [0, 0, 0, 0] }}
              transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
              style={{ originX: "50px", originY: "15px" }}
            />
            <motion.circle
              cx="50" cy="3" r="4"
              fill="#00e357"
              animate={{ 
                scale: [1, 1.3, 1],
                filter: ["blur(0px)", "blur(2px)", "blur(0px)"]
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />

            {/* Main Body Capsule */}
            <path 
              d="M 25,35 C 25,12 75,12 75,35 L 75,55 C 75,70 65,75 50,75 C 35,75 25,70 25,55 Z" 
              fill="url(#bodyGradient)" 
              stroke="#001e1c" 
              strokeWidth="2.5" 
            />

            {/* Curved Body Panel Lines */}
            <path d="M 27,62 C 35,68 65,68 73,62" fill="none" stroke="#b3c0bf" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M 33,68 C 40,73 60,73 67,68" fill="none" stroke="#b3c0bf" strokeWidth="1.5" strokeLinecap="round" />

            {/* Visor Screen */}
            <path 
              d="M 28,38 C 28,26 72,26 72,38 L 72,45 C 72,53 62,56 50,56 C 38,56 28,53 28,45 Z" 
              fill="url(#visorGradient)" 
              stroke="#001e1c" 
              strokeWidth="2.5" 
              strokeLinejoin="round"
            />
            {/* Screen Glare */}
            <path d="M 32,32 C 45,28 65,30 68,36 C 63,33 45,31 32,36 Z" fill="#ffffff" opacity="0.15" />

            {/* Expressive Eyes */}
            <motion.g
              animate={{ scaleY: [1, 0.1, 1] }}
              transition={{ duration: 0.15, repeat: Infinity, repeatDelay: 3.5, ease: "easeInOut" }}
              style={{ originX: "50px", originY: "42px" }}
            >
              {/* Left Eye */}
              <motion.g
                animate={{ 
                  scaleY: isHovered ? [1, 1.333, 1, 1.333, 1] : [1, 1, 1, 1, 1],
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
                style={{ originX: "41px", originY: "41px" }}
              >
                <rect x="37" y="38" width="8" height="6" rx="3" fill="#01f2ad" />
              </motion.g>
              {/* Right Eye */}
              <motion.g
                animate={{ 
                  scaleY: isHovered ? [1, 1.333, 1, 1.333, 1.333, 1] : [1, 1, 1, 1, 1, 1],
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
                style={{ originX: "59px", originY: "41px" }}
              >
                <rect x="55" y="38" width="8" height="6" rx="3" fill="#01f2ad" />
              </motion.g>
            </motion.g>

            {/* Cute digital cheeks when hovered */}
            <motion.circle
              cx="34"
              cy="48"
              r="3"
              fill="#00e357"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 0.6 : 0 }}
            />
            <motion.circle
              cx="66"
              cy="48"
              r="3"
              fill="#00e357"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 0.6 : 0 }}
            />

            {/* Floating Left Hand (Bobbing) */}
            <motion.g
              animate={{ y: [0, -3, 0], rotate: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <rect x="12" y="48" width="10" height="14" rx="5" fill="#ffffff" stroke="#001e1c" strokeWidth="2.5" />
              <rect x="14" y="52" width="6" height="3" rx="1.5" fill="#00e357" />
            </motion.g>

            {/* Floating Right Hand (Waving excitedly on hover) */}
            <motion.g
              animate={{ 
                rotate: isHovered ? [0, -45, 10, -45, 0] : [0, -10, 0],
                y: isHovered ? [0, -10, -10, -10, 0] : [0, -2, 0] 
              }}
              transition={{
                duration: isHovered ? 0.8 : 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{ originX: "78px", originY: "55px" }}
            >
              <rect x="78" y="48" width="10" height="14" rx="5" fill="#ffffff" stroke="#001e1c" strokeWidth="2.5" />
              <rect x="80" y="52" width="6" height="3" rx="1.5" fill="#00e357" opacity="0.8" />
            </motion.g>
          </svg>
        </motion.div>
        
        {/* Unread indicator */}
        {!isOpen && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute right-2 top-0 h-3.5 w-3.5 rounded-full border-2 border-white bg-spring shadow-[0_0_8px_rgba(1,242,173,0.8)]"
          />
        )}
      </motion.button>
    </div>,
    document.body,
  );
}
