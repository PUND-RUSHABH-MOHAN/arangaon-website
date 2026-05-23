/**
 * i18n.js — Arangaon Grampanchayat
 * Bilingual toggle: English ⇄ Marathi
 *
 * How it works:
 *  - Walks every visible text node in the page.
 *  - Skips nodes whose ancestor has [data-i18n-skip].
 *  - Replaces text using the translation map below.
 *  - Remembers preference in localStorage.
 */

(function () {
  "use strict";

  /* ─────────────────────────────────────────────
     Translation map  —  English : Marathi
     Add / extend as the site grows.
  ───────────────────────────────────────────── */
  const translations = {

    /* ── Navigation ── */
    "Home": "मुख्यपृष्ठ",
    "About": "आमच्याबद्दल",
    "History": "इतिहास",
    "Services": "सेवा",
    "Gallery": "गॅलरी",
    "Contact": "संपर्क",

    /* ── Utility bar ── */
    "Meherabad • Ahilyanagar": "मेहराबाद • अहिल्यानगर",

    /* ── Brand ── */
    "Arangaon Grampanchayat": "अरंगाव ग्रामपंचायत",

    /* ── Index page ── */
    "Welcome to Arangaon Grampanchayat": "अरंगाव ग्रामपंचायतीत आपले स्वागत आहे",
    "ARANGAON • MEHERABAD • AHMEDNAGAR": "अरंगाव • मेहराबाद • अहमदनगर",
    "A historic village of Meherabad — committed to transparent governance, sustainable development, and the well-being of every citizen.":
      "मेहराबादचे एक ऐतिहासिक गाव — पारदर्शक शासन, शाश्वत विकास आणि प्रत्येक नागरिकाच्या कल्याणासाठी वचनबद्ध.",
    "Explore Services →": "सेवा पहा →",
    "Contact Office": "कार्यालयाशी संपर्क करा",
    "Serving Our Village with Pride": "अभिमानाने आपल्या गावाची सेवा करत आहोत",
    "Arangaon Grampanchayat works for the all-round development of our village — from clean water and roads to education, healthcare, and the preservation of our rich heritage. We believe in participation, transparency, and progress for every family.":
      "अरंगाव ग्रामपंचायत आपल्या गावाच्या सर्वांगीण विकासासाठी कार्यरत आहे — स्वच्छ पाणी व रस्त्यांपासून ते शिक्षण, आरोग्यसेवा आणि आपल्या समृद्ध वारशाचे जतन करण्यापर्यंत. आपण सहभाग, पारदर्शकता आणि प्रत्येक कुटुंबाच्या प्रगतीवर विश्वास ठेवतो.",
    "Local Governance": "स्थानिक शासन",
    "Decisions made by and for the village.": "गावासाठी आणि गावाने घेतलेले निर्णय.",
    "Citizen First": "नागरिक प्रथम",
    "Quick services and grievance redressal.": "जलद सेवा आणि तक्रार निवारण.",
    "Sustainable Growth": "शाश्वत विकास",
    "Water, sanitation and clean villages.": "पाणी, स्वच्छता आणि स्वच्छ गाव.",
    "Transparency": "पारदर्शकता",
    "Open records and accountable work.": "खुली नोंदणी आणि जबाबदार कार्य.",
    "About the Village": "गावाबद्दल",
    "Learn about Arangaon and the Grampanchayat.": "अरंगाव आणि ग्रामपंचायतीबद्दल जाणून घ्या.",
    "Read more →": "अधिक वाचा →",
    "Historic Heritage": "ऐतिहासिक वारसा",
    "Discover the spiritual and cultural legacy of Meherabad.": "मेहराबादचा आध्यात्मिक आणि सांस्कृतिक वारसा जाणून घ्या.",
    "Photo Gallery": "छायाचित्र दालन",
    "Recent activities and village development work.": "अलीकडील उपक्रम आणि गाव विकासाचे कार्य.",

    /* ── About page ── */
    "About Arangaon": "अरंगावबद्दल",
    "A village rooted in tradition, moving towards progress.": "परंपरेत रुजलेले, प्रगतीच्या वाटेवर जाणारे गाव.",
    "👥 Committee Members": "👥 समिती सदस्य",
    "Sarpanch": "सरपंच",
    "Deputy Sarpanch": "उप-सरपंच",
    "Member": "सदस्य",
    "Our Mission": "आमचे ध्येय",
    "To deliver responsive, transparent and inclusive local self-government — improving the quality of life for every resident of Arangaon while preserving our heritage.":
      "प्रत्येक अरंगावकराच्या जीवनमानात सुधारणा करत असताना आपला वारसा जपून, प्रतिसादशील, पारदर्शक आणि सर्वसमावेशक स्थानिक स्वराज्य प्रदान करणे.",
    "Our Values": "आमची मूल्ये",
    "Transparency in every decision": "प्रत्येक निर्णयात पारदर्शकता",
    "Equality and dignity for all citizens": "सर्व नागरिकांसाठी समानता आणि प्रतिष्ठा",
    "Sustainable development and clean environment": "शाश्वत विकास आणि स्वच्छ पर्यावरण",
    "Respect for our cultural and spiritual heritage": "आपल्या सांस्कृतिक आणि आध्यात्मिक वारशाचा आदर",
    "Office Information": "कार्यालय माहिती",
    "Office": "कार्यालय",
    "Gramsansad Bhavan": "ग्रामसंसद भवन",
    "Location": "स्थान",
    "Arangaon (Meherabad)": "अरंगाव (मेहराबाद)",
    "Taluka / District": "तालुका / जिल्हा",
    "Ahilyanagar": "अहिल्यानगर",
    "State": "राज्य",
    "Maharashtra, India": "महाराष्ट्र, भारत",
    "Email": "ईमेल",
    "Arangaon, also known as Meherabad, is a village in Ahilyanagar district of Maharashtra, India. The Grampanchayat is the local self-government body responsible for the administration and development of the village. Our office — Gramsansad Bhavan — serves as the centre for citizen services, public meetings, and community decisions. We focus on inclusive growth, modern infrastructure, and preserving the cultural identity that makes Arangaon special.":
      "अरंगाव, ज्याला मेहराबाद म्हणूनही ओळखले जाते, हे महाराष्ट्र, भारतातील अहिल्यानगर जिल्ह्यातील एक गाव आहे. ग्रामपंचायत ही गावाच्या प्रशासन आणि विकासासाठी जबाबदार स्थानिक स्वराज्य संस्था आहे. आमचे कार्यालय — ग्रामसंसद भवन — नागरिक सेवा, सार्वजनिक सभा आणि सामुदायिक निर्णयांचे केंद्र म्हणून काम करते.",

    /* ── Services page ── */
    "Citizen Services": "नागरिक सेवा",
    "A range of services available to every citizen of Arangaon.": "अरंगावच्या प्रत्येक नागरिकासाठी उपलब्ध सेवांची श्रेणी.",
    "Birth & Death Certificates": "जन्म आणि मृत्यू प्रमाणपत्रे",
    "Registration and issuance of official certificates for births and deaths in the village.":
      "गावातील जन्म आणि मृत्यूसाठी अधिकृत प्रमाणपत्रांची नोंदणी आणि प्रदान.",
    "Property Tax & Records": "मालमत्ता कर आणि नोंदी",
    "Property tax collection, mutation, and maintenance of village land records.":
      "मालमत्ता कर संकलन, फेरफार आणि गावातील जमीन नोंदींची देखभाल.",
    "Water Supply": "पाणीपुरवठा",
    "Clean drinking water supply, maintenance of pipelines, wells, and storage tanks.":
      "स्वच्छ पिण्याचे पाणी पुरवठा, पाइपलाइन, विहिरी आणि साठवण टाक्यांची देखभाल.",
    "Sanitation & Cleanliness": "स्वच्छता",
    "Door-to-door waste collection, drainage maintenance, and Swachh Bharat initiatives.":
      "घरोघरी कचरा संकलन, नाली देखभाल आणि स्वच्छ भारत उपक्रम.",
    "Roads & Street Lights": "रस्ते आणि दिवेबत्ती",
    "Construction and repair of village roads, and installation of solar street lights.":
      "गावातील रस्त्यांचे बांधकाम व दुरुस्ती, आणि सौर दिव्यांची स्थापना.",
    "Agriculture & Livestock": "शेती आणि पशुधन",
    "Vaccination drives, farmer schemes, and support for sustainable agriculture.":
      "लसीकरण मोहिमा, शेतकरी योजना आणि शाश्वत शेतीला पाठिंबा.",
    "Government Schemes": "सरकारी योजना",
    "Assistance with central and state schemes — pensions, housing, MGNREGA, and more.":
      "केंद्र व राज्य योजनांमध्ये सहाय्य — निवृत्तीवेतन, गृहनिर्माण, मनरेगा आणि बरेच काही.",
    "Grievance Redressal": "तक्रार निवारण",
    "A dedicated channel for citizens to raise issues and get timely resolutions.":
      "नागरिकांसाठी समस्या मांडण्यासाठी आणि वेळेवर निराकरण मिळवण्यासाठी समर्पित मार्ग.",
    "Need help with a service?": "सेवेसाठी मदत हवी आहे?",
    "Visit Gramsansad Bhavan or write to us — we will respond promptly.":
      "ग्रामसंसद भवनला भेट द्या किंवा आम्हाला लिहा — आम्ही त्वरित प्रतिसाद देऊ.",
    "Email the Office": "कार्यालयाला ईमेल करा",

    /* ── History page ── */
    "Our Heritage": "आमचा वारसा",
    "A village with deep spiritual and cultural roots.": "खोल आध्यात्मिक आणि सांस्कृतिक मुळे असलेले गाव.",

    /* ── Gallery page ── */
    "Glimpses of village life, events, and development work.": "गावजीवन, कार्यक्रम आणि विकासकामांचे दर्शन.",

    /* ── Contact page ── */
    "Contact Us": "संपर्क करा",
    "We're here to help. Reach out to the Grampanchayat office.": "आम्ही मदतीसाठी येथे आहोत. ग्रामपंचायत कार्यालयाशी संपर्क साधा.",
    "Send us a message": "आम्हाला संदेश पाठवा",
    "Fill in the form below and we will get back to you shortly.": "खालील फॉर्म भरा आणि आम्ही लवकरच तुमच्याशी संपर्क करू.",
    "Your Name": "तुमचे नाव",
    "Your Email": "तुमचा ईमेल",
    "Message": "संदेश",
    "Send Message": "संदेश पाठवा",
    "Office Address": "कार्यालयाचा पत्ता",
    "Phone": "दूरध्वनी",
    "✅ Your message was sent successfully! We will get back to you soon.":
      "✅ तुमचा संदेश यशस्वीरित्या पाठवला गेला! आम्ही लवकरच तुमच्याशी संपर्क करू.",
    "❌ Something went wrong. Please try again or email us directly.":
      "❌ काहीतरी चुकले. कृपया पुन्हा प्रयत्न करा किंवा थेट आम्हाला ईमेल करा.",

    /* ── Footer ── */
    "Quick Links": "जलद दुवे",
    "A historic village serving its citizens with transparency and care.":
      "पारदर्शकता आणि काळजीने आपल्या नागरिकांची सेवा करणारे एक ऐतिहासिक गाव.",
    "(Meherabad), Tal. & Dist. Ahilyanagar": "(मेहराबाद), तालुका व जिल्हा अहिल्यानगर",
    "© 2026 Arangaon Grampanchayat. All rights reserved.":
      "© २०२६ अरंगाव ग्रामपंचायत. सर्व हक्क राखीव.",
    "Designed for the citizens of Arangaon": "अरंगावच्या नागरिकांसाठी तयार केलेले",
    "📍 Gramsansad Bhavan, Arangaon (Meherabad), Tal. & Dist. Ahilyanagar, Maharashtra":
      "📍 ग्रामसंसद भवन, अरंगाव (मेहराबाद), तालुका व जिल्हा अहिल्यानगर, महाराष्ट्र",

    /* ── Placeholders ── */
    "E.g. Ramesh Patil": "उदा. रमेश पाटील",
    "so we can reply to you": "आम्ही तुम्हाला उत्तर देऊ शकतो म्हणून",
    "How can we help?": "आम्ही कसे मदत करू शकतो?",
  };

  /* Reverse map for switching back to English */
  const reverseTranslations = Object.fromEntries(
    Object.entries(translations).map(([en, mr]) => [mr, en])
  );

  /* ─────────────────────────────────────────────
     Core helpers
  ───────────────────────────────────────────── */

  function isSkipped(node) {
    let el = node.nodeType === Node.TEXT_NODE ? node.parentElement : node;
    while (el) {
      if (el.hasAttribute && el.hasAttribute("data-i18n-skip")) return true;
      el = el.parentElement;
    }
    return false;
  }

  function translateNode(node, map) {
    if (node.nodeType === Node.TEXT_NODE) {
      const t = node.textContent;
      if (map[t] !== undefined) node.textContent = map[t];
      return;
    }
    /* Also translate placeholder / title / alt attributes */
    if (node.nodeType === Node.ELEMENT_NODE) {
      ["placeholder", "title", "alt"].forEach((attr) => {
        if (node.hasAttribute(attr)) {
          const v = node.getAttribute(attr);
          if (map[v] !== undefined) node.setAttribute(attr, map[v]);
        }
      });
    }
  }

  function walkAndTranslate(root, map) {
    const walker = document.createTreeWalker(
      root,
      NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT,
      {
        acceptNode(node) {
          if (isSkipped(node)) return NodeFilter.FILTER_REJECT;
          if (node.nodeType === Node.ELEMENT_NODE) {
            const tag = node.tagName;
            if (tag === "SCRIPT" || tag === "STYLE" || tag === "NOSCRIPT")
              return NodeFilter.FILTER_REJECT;
          }
          return NodeFilter.FILTER_ACCEPT;
        },
      }
    );

    const nodes = [];
    let n;
    while ((n = walker.nextNode())) nodes.push(n);
    nodes.forEach((n) => translateNode(n, map));
  }

  /* ─────────────────────────────────────────────
     State & toggle
  ───────────────────────────────────────────── */

  const LS_KEY = "arangaon_lang";
  let currentLang = localStorage.getItem(LS_KEY) || "en"; // "en" | "mr"

  function applyLang(lang) {
    const map = lang === "mr" ? translations : reverseTranslations;
    walkAndTranslate(document.body, map);
    document.documentElement.lang = lang === "mr" ? "mr" : "en";
    currentLang = lang;
    localStorage.setItem(LS_KEY, lang);
    updateBtn();
  }

  function updateBtn() {
    const btn = document.getElementById("lang-toggle");
    if (!btn) return;
    btn.textContent = currentLang === "mr" ? "🌐 English" : "🌐 मराठी";
  }

  /* ─────────────────────────────────────────────
     Initialise
  ───────────────────────────────────────────── */

  function init() {
    const btn = document.getElementById("lang-toggle");
    if (!btn) return;

    /* If returning visitor already chose Marathi, apply it now */
    if (currentLang === "mr") {
      walkAndTranslate(document.body, translations);
      document.documentElement.lang = "mr";
    }
    updateBtn();

    btn.addEventListener("click", () => {
      applyLang(currentLang === "en" ? "mr" : "en");
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
