import { useEffect, useState } from "react";

const GoogleTranslate = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Initialize Google Translate when the script is loaded
        window.googleTranslateInit = () => {
            if (window.google && window.google.translate) {
                new window.google.translate.TranslateElement(
                    {
                        pageLanguage: 'en',
                        includedLanguages: 'en,hi,pa,sa,mr,ur,bn,ta,te,kn,ml,gu,or,as,ne,si,ks,ma,sd,bo',
                        layout: window.google.translate.TranslateElement.InlineLayout.HORIZONTAL,
                    },
                    'google_translate_element'
                );
            }
        };

        // Load the Google Translate script
        const loadGoogleTranslateScript = () => {
            if (!document.getElementById("google_translate_script")) {
                const script = document.createElement("script");
                script.type = "text/javascript";
                script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateInit";
                script.id = "google_translate_script";
                script.onerror = () => console.error('Error loading Google Translate script');
                document.body.appendChild(script);
            }
        };

        loadGoogleTranslateScript();

        // Cleanup when component is unmounted
        return () => {
            const script = document.getElementById("google_translate_script");
            if (script) {
                document.body.removeChild(script);
            }
            const googleElement = document.getElementById("google_translate_element");
            if (googleElement) {
                googleElement.innerHTML = '';
            }
        };
    }, []);

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    return (
        <div className="relative">
            <button
                className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none"
                onClick={toggleVisibility}
            >
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/d/d7/Google_Translate_logo.svg"
                    alt="Translate"
                    className="w-5 h-5 mr-2"
                />
                <span>Translate</span>
            </button>
            <div
                id="google_translate_element"
                className={`mt-4 absolute ${isVisible ? 'flex' : 'hidden'}`}
            ></div>
        </div>
    );
};

export default GoogleTranslate;
