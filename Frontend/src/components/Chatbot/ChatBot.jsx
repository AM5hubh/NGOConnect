// Frontend/src/components/Chatbot/Chatbot.jsx
import React, { useEffect } from 'react';

const Chatbot = () => {
  useEffect(() => {
    // Create script element
    const script = document.createElement('script');
    script.src = 'https://cdn.botpress.cloud/webchat/v2.2/inject.js';
    script.async = true;
    document.body.appendChild(script);

    // Initialize chatbot once script is loaded
    script.onload = () => {
      window.botpressWebChat.init({
        composerPlaceholder: "Chat with us",
        botConversationDescription: "NGO Support Bot",
        botId: "S0EONNJ7",
        hostUrl: "https://cdn.botpress.cloud/webchat/v2.2/",
        messagingUrl: "https://messaging.botpress.cloud",
        clientId: "S0EONNJ7",
        webhookId: "e7fa61dc-7c24-4945-9bad-0ef7e25f9c0a",
        lazySocket: true,
        themeName: "prism",
        frontendVersion: "v2.2",
        useSessionStorage: true,
        enableConversationDeletion: true,
        showPoweredBy: true,
        theme: 'light',
        themeColor: '#2563EB'
      });
    };

    // Cleanup on component unmount
    return () => {
      document.body.removeChild(script);
      // Cleanup chatbot instance if it exists
      if (window.botpressWebChat) {
        window.botpressWebChat.destroy();
      }
    };
  }, []);

  return (
    <div id="botpress-webchat-container"></div>
  );
};

export default Chatbot;
