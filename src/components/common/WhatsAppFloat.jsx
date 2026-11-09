
import { MessageCircle, X } from 'lucide-react'
import { useState } from 'react'

function WhatsAppFloat() {
    const [showTooltip, setShowTooltip] = useState(false)

    const phoneNumber = '918459252336'

    const message = encodeURIComponent(
        "Hello Rushikesh! I visited your portfolio and would like to connect regarding a professional opportunity."
    )

    return (
        <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-3">

            {showTooltip && (
                <div className="rounded-2xl border border-white/10 bg-[#1d1728] p-4 text-white shadow-2xl">
                    <div className="flex items-center justify-between gap-4">
                        <p className="text-sm font-semibold">
                            Let's connect!
                        </p>

                        <button
                            onClick={() => setShowTooltip(false)}
                            aria-label="Close WhatsApp message"
                        >
                            <X size={16} />
                        </button>
                    </div>

                    <p className="mt-1 text-xs text-white/65">
                        Have an opportunity? Message me on WhatsApp.
                    </p>
                </div>
            )}


            <a
                href={`https://wa.me/${phoneNumber}?text=${message}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat with Rushikesh on WhatsApp"
                title="Chat on WhatsApp"
                className="
                            group relative flex h-16 w-16 items-center justify-center
                            rounded-full bg-[#25D366] text-white
                            shadow-[0_8px_30px_rgba(37,211,102,0.4)]
                            transition-all duration-300
                            hover:scale-110 hover:bg-[#20bd5a]
                            hover:shadow-[0_10px_40px_rgba(37,211,102,0.6)]
                            focus-visible:outline-none
                            focus-visible:ring-4 focus-visible:ring-green-400/50
                            focus-visible:ring-offset-4
                        "
            >
                {/* Animated pulse */}
                <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25" />

                {/* WhatsApp symbol */}
                <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="relative z-10 h-9 w-9 transition-transform duration-300 group-hover:rotate-12"
                    aria-hidden="true"
                >
                    <path d="M20.52 3.48A11.87 11.87 0 0 0 12.06 0C5.5 0 .16 5.34.16 11.9c0 2.1.55 4.15 1.6 5.96L.06 24l6.3-1.65a11.9 11.9 0 0 0 5.7 1.45h.01c6.56 0 11.9-5.34 11.9-11.9 0-3.18-1.24-6.17-3.45-8.42ZM12.06 21.8h-.01a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.27c0-5.47 4.45-9.92 9.92-9.92 2.65 0 5.14 1.03 7.01 2.91a9.86 9.86 0 0 1 2.9 7.02c0 5.47-4.45 9.92-9.93 9.92Zm5.44-7.43c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.47-.89-.8-1.48-1.78-1.65-2.08-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.48-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.2 5.08 4.48.71.31 1.27.5 1.7.64.72.23 1.37.2 1.88.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35Z" />
                </svg>
            </a>

        </div>
    )
}

export default WhatsAppFloat
