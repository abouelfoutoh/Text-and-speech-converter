# Text-and-speech-converter
Converting speech into text and text into speech


# محول النص والكلام العربي 🗣️

تطبيق ويب بسيط لتحويل النص إلى كلام والكلام إلى نص باللغة العربية.

## المميزات 🌟

- تحويل النص إلى كلام باللغة العربية
- تحويل الكلام إلى نص باللغة العربية
- واجهة مستخدم بسيطة وسهلة الاستخدام
- دعم كامل للغة العربية
- عرض حالة العملية بشكل مباشر

## اللغات المستخدمة
- HTML (Hyper Text Markup Language)
- CSS (Cascading Style Sheet)
- JavaScript

## المتطلبات 📋

- متصفح حديث يدعم Web Speech API
- اتصال بالإنترنت
- ميكروفون (لخاصية تحويل الكلام إلى نص)

## كيفية الاستخدام 📝

### تحويل النص إلى كلام
1. أدخل النص العربي في ال text area الموجودة
2. اضغط على زر "تحويل النص إلى كلام"

### تحويل الكلام إلى نص
1. اضغط على زر "تحويل الكلام إلى نص"
2. تحدث بوضوح باللغة العربية
3. سيظهر النص المحول في ال text area 

## التفاصيل التقنية 🔧

### الخصائص المستخدمة
- `SpeechSynthesisUtterance`: لتحويل النص إلى كلام
- `SpeechRecognition`: للتعرف على الكلام وتحويله إلى نص
- اللغة المستخدمة: العربية باللهجة المصرية (ar-EG)


## يجب الاخذ في الاعتبار⚠️

- بعض المتصفحات قد لا تدعم خاصية التعرف على الكلام
- يجب السماح للمتصفح باستخدام الميكروفون
- جودة التعرف على الكلام تعتمد على:
  - جودة الميكروفون
  - وضوح النطق
  - مستوى الضوضاء المحيطة

## الأخطاء الشائعة وحلولها 🔍

 **النص المحول غير دقيق**
   - تحدث بوضوح وببطء
   - تأكد من عدم وجود ضوضاء في الخلفية
   - استخدم ميكروفون عالي الجودة




## شرح الدوال الرئيسية 🔍

### 1. تهيئة التطبيق
```javascript
document.addEventListener('DOMContentLoaded', () => {
    // يتم تنفيذ الكود عند اكتمال تحميل الصفحة
    const textInput = document.getElementById('textInput');        // حقل إدخال النص
    const textToSpeechBtn = document.getElementById('textToSpeech'); // زر تحويل النص إلى كلام
    const speechToTextBtn = document.getElementById('speechToText'); // زر تحويل الكلام إلى نص
    const status = document.getElementById('status');             // عنصر عرض الحالة
});
```

### 2. دالة تحويل النص إلى كلام
```javascript
textToSpeechBtn.addEventListener('click', () => {
    const text = textInput.value.trim();  // إزالة المسافات الزائدة
    
    // التحقق من وجود نص
    if (!text) {
        status.textContent = 'الرجاء إدخال نص للتحويل';
        return;
    }

    // إنشاء كائن النطق
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ar-EG';     // تعيين اللغة العربية
    utterance.rate = 1;           // سرعة النطق
    utterance.pitch = 1;          // درجة الصوت
    
    speechSynthesis.speak(utterance);  // بدء النطق
    status.textContent = 'جاري التحدث...';

    // عند انتهاء النطق
    utterance.onend = () => {
        status.textContent = 'تم الانتهاء من التحدث';
    };
});
```

### 3. دالة تحويل الكلام إلى نص
```javascript
let recognition = null;
try {
    // إنشاء كائن التعرف على الكلام
    recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'ar-EG';           // تعيين اللغة العربية
    recognition.continuous = false;        // إيقاف التسجيل المستمر
    recognition.interimResults = false;    // عدم إظهار النتائج المؤقتة
    recognition.maxResults = 10;           // الحد الأقصى للنتائج

    // معالجة نتيجة التعرف على الكلام
    recognition.onresult = (event) => {
        const text = event.results[0][0].transcript;  // استخراج النص المحول
        textInput.value = text;                       // عرض النص في حقل الإدخال
        status.textContent = 'تم التحويل بنجاح';
    };

    // معالجة الأخطاء
    recognition.onerror = (event) => {
        status.textContent = 'حدث خطأ في التعرف على الكلام';
    };

    // عند انتهاء التسجيل
    recognition.onend = () => {
        speechToTextBtn.disabled = false;
        status.textContent = 'تم الانتهاء من الاستماع';
    };
} catch (e) {
    // في حالة عدم دعم المتصفح للخاصية
    speechToTextBtn.disabled = true;
    speechToTextBtn.title = 'غير مدعوم في هذا المتصفح';
}
```

### 4. معالج حدث زر تحويل الكلام إلى نص
```javascript
speechToTextBtn.addEventListener('click', () => {
    if (recognition) {
        recognition.start();                          // بدء التسجيل
        status.textContent = 'جاري الاستماع... تحدث الآن';
        speechToTextBtn.disabled = true;              // تعطيل الزر أثناء التسجيل
    } else {
        status.textContent = 'خاصية التعرف على الكلام غير مدعومة في هذا المتصفح';
    }
});
```

## الخصائص التقنية المستخدمة 🛠️

### واجهة SpeechSynthesisUtterance
- `lang`: تحديد لغة النطق (ar-EG للعربية)
- `rate`: سرعة النطق (1 = السرعة الطبيعية)
- `pitch`: درجة الصوت (1 = الدرجة الطبيعية)

### واجهة SpeechRecognition
- `continuous`: للتحكم في استمرارية التسجيل
- `interimResults`: للتحكم في إظهار النتائج المؤقتة
- `maxResults`: عدد النتائج المقترحة
- `lang`: لغة التعرف على الكلام

## الأحداث المستخدمة 📋

### أحداث النطق
- `onend`: يتم تنفيذه عند انتهاء النطق

### أحداث التعرف على الكلام
- `onresult`: يتم تنفيذه عند نجاح التعرف على الكلام
- `onerror`: يتم تنفيذه عند حدوث خطأ
- `onend`: يتم تنفيذه عند انتهاء التسجيل





