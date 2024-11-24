document.addEventListener('DOMContentLoaded', () => {
    const textInput = document.getElementById('textInput');
    const textToSpeechBtn = document.getElementById('textToSpeech');
    const speechToTextBtn = document.getElementById('speechToText');
    const status = document.getElementById('status');

    // تحويل النص الى كلام
    textToSpeechBtn.addEventListener('click', () => {
        const text = textInput.value.trim();
        if (!text) {
            status.textContent = 'الرجاء إدخال نص للتحويل';
            return;
        }

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'ar-EG';
        utterance.rate = 1; // default rate
        utterance.pitch = 1; // default pitch
        speechSynthesis.speak(utterance);
        status.textContent = 'جاري التحدث...';

        utterance.onend = () => {
            status.textContent = 'تم الانتهاء من التحدث';
        };
    });

    // تحويل الكلام الى نص
    let recognition = null;
    try {
        recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.lang = 'ar-EG';
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.maxResults = 10; // default max results

        recognition.onresult = (event) => {
            const text = event.results[0][0].transcript;
            textInput.value = text;
            status.textContent = 'تم التحويل بنجاح';
        };

        recognition.onerror = (event) => {
            status.textContent = 'حدث خطأ في التعرف على الكلام';
        };

        recognition.onend = () => {
            speechToTextBtn.disabled = false;
            status.textContent = 'تم الانتهاء من الاستماع';
        };
    } catch (e) {
        speechToTextBtn.disabled = true;
        speechToTextBtn.title = 'غير مدعوم في هذا المتصفح';
    }

    speechToTextBtn.addEventListener('click', () => {
        if (recognition) {
            recognition.start();
            status.textContent = 'جاري الاستماع... تحدث الآن';
            speechToTextBtn.disabled = true;
        } else {
            status.textContent = 'خاصية التعرف على الكلام غير مدعومة في هذا المتصفح';
        }
    });
});