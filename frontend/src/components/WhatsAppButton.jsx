import React from 'react';
import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => {
  const url = "https://api.whatsapp.com/send/?phone=917025664051&text=Hello+Amoria+Weddings%2C+I+would+like+to+inquire+about+your+services.&type=phone_number&app_absent=0";

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all group"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={28} />
      <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white text-gray-800 px-4 py-2 rounded-lg text-sm font-bold shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        Chat with us!
      </span>
    </a>
  );
};

export default WhatsAppButton;
