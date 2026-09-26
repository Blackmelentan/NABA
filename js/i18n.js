/* =====================================================================
   NABA — i18n Translation System
   Supports: English (en), French (fr), Arabic (ar)
   
   Usage in HTML: <span data-i18n="nav.home">Home</span>
   ===================================================================== */

window.NABA_I18N = (function () {

  var TRANSLATIONS = {
    en: {
      /* Navigation */
      'nav.home':         'Home',
      'nav.community':    'Community',
      'nav.events':       'Events',
      'nav.news':         'News',
      'nav.about':        'About Us',
      'nav.volunteering': 'Volunteering & Partnerships',
      'nav.cuisine':      'Cuisine',
      'nav.contact':      'Contact Us',
      'nav.more':         'More',
      'nav.youth':        'Youth Hub',
      'nav.impact':       'Impact Tree',
      'nav.login':        'Sign In',

      /* Buttons */
      'btn.join':         'Join NABA',
      'btn.learn':        'Learn More',
      'btn.events':       'Find an Event →',
      'btn.readmore':     'Read more',
      'btn.submit':       'Submit',
      'btn.subscribe':    'Subscribe',
      'btn.gethelp':      'Get Help Now',
      'btn.volunteer':    'Volunteer',
      'btn.donate':       'Donate',
      'btn.viewall':      'View All',
      'btn.back':         'Back',
      'btn.close':        'Close',
      'btn.search':       'Search',

      /* Hero */
      'hero.eyebrow':     "Scotland's African & Black Community Hub",
      'hero.cta.primary':   'Join NABA',
      'hero.cta.secondary': 'Explore Services',

      /* Sections */
      'section.mission':  'Our Mission',
      'section.events':   'Upcoming Events',
      'section.news':     'Latest News',
      'section.impact':   'Community Impact',
      'section.gallery':  'Gallery',
      'section.youth':    'Youth Hub',
      'section.contact':  'Get in Touch',
      'section.partners': 'Our Partners',
      'section.volunteer':'Volunteer With Us',
      'section.directory':'Community Directory',

      /* Footer */
      'footer.newsletter':    'Stay in the loop',
      'footer.newsletter.sub':'Cultural weeks, town halls, and road trip updates straight to your inbox.',
      'footer.newsletter.ph': 'you@email.com',
      'footer.newsletter.btn':'Join',
      'footer.explore':       'Explore',
      'footer.offices':       'Offices',
      'footer.connect':       'Connect',
      'footer.privacy':       'Privacy',
      'footer.accessibility': 'Accessibility',
      'footer.safeguarding':  'Safeguarding',
      'footer.stafflogin':    'Staff Login',
      'footer.tagline':       'Our community is our strength — connecting African and Black communities across Scotland to trusted services, culture, and each other.',
      'footer.credit':        'Web design by Kaabu Technologies',
      'footer.copyright':     'National African & Black Association.',

      /* Contact */
      'contact.name':     'Full Name',
      'contact.email':    'Email Address',
      'contact.subject':  'Subject',
      'contact.message':  'Message',
      'contact.send':     'Send Message',
      'contact.success':  "Thank you! We'll be in touch soon.",

      /* Lang switcher */
      'lang.choose':      'Choose language',
      'lang.en':          'English',
      'lang.fr':          'Français',
      'lang.ar':          'العربية',

      /* Ticker */
      'ticker.1':         'Youth Hub is now live · Mentorship applications open',
      'ticker.2':         'Edinburgh → Lagos Road Trip · 6 Nov 2027',
      'ticker.3':         '70+ Community Businesses Listed',
    },

    fr: {
      /* Navigation */
      'nav.home':         'Accueil',
      'nav.community':    'Communauté',
      'nav.events':       'Événements',
      'nav.news':         'Actualités',
      'nav.about':        'À propos',
      'nav.volunteering': 'Bénévolat & Partenariats',
      'nav.cuisine':      'Cuisine',
      'nav.contact':      'Contactez-nous',
      'nav.more':         'Plus',
      'nav.youth':        'Hub Jeunesse',
      'nav.impact':       'Arbre d\'Impact',
      'nav.login':        'Connexion',

      /* Buttons */
      'btn.join':         'Rejoindre NABA',
      'btn.learn':        'En savoir plus',
      'btn.events':       'Trouver un événement →',
      'btn.readmore':     'Lire la suite',
      'btn.submit':       'Soumettre',
      'btn.subscribe':    'S\'abonner',
      'btn.gethelp':      'Obtenir de l\'aide',
      'btn.volunteer':    'Bénévole',
      'btn.donate':       'Faire un don',
      'btn.viewall':      'Voir tout',
      'btn.back':         'Retour',
      'btn.close':        'Fermer',
      'btn.search':       'Rechercher',

      /* Hero */
      'hero.eyebrow':     'Le Centre Communautaire Africain & Noir d\'Écosse',
      'hero.cta.primary':   'Rejoindre NABA',
      'hero.cta.secondary': 'Explorer les services',

      /* Sections */
      'section.mission':  'Notre Mission',
      'section.events':   'Événements à venir',
      'section.news':     'Dernières nouvelles',
      'section.impact':   'Impact communautaire',
      'section.gallery':  'Galerie',
      'section.youth':    'Hub Jeunesse',
      'section.contact':  'Nous contacter',
      'section.partners': 'Nos Partenaires',
      'section.volunteer':'Bénévole avec nous',
      'section.directory':'Répertoire communautaire',

      /* Footer */
      'footer.newsletter':    'Restez informé',
      'footer.newsletter.sub':'Semaines culturelles, réunions et mises à jour directement dans votre boîte mail.',
      'footer.newsletter.ph': 'vous@email.com',
      'footer.newsletter.btn':'Rejoindre',
      'footer.explore':       'Explorer',
      'footer.offices':       'Bureaux',
      'footer.connect':       'Connecter',
      'footer.privacy':       'Confidentialité',
      'footer.accessibility': 'Accessibilité',
      'footer.safeguarding':  'Protection',
      'footer.stafflogin':    'Connexion Personnel',
      'footer.tagline':       'Notre communauté est notre force — connectant les communautés africaines et noires en Écosse aux services de confiance, à la culture et à elles-mêmes.',
      'footer.credit':        'Conception web par Kaabu Technologies',
      'footer.copyright':     'Association Nationale Africaine & Noire.',

      /* Contact */
      'contact.name':     'Nom complet',
      'contact.email':    'Adresse e-mail',
      'contact.subject':  'Sujet',
      'contact.message':  'Message',
      'contact.send':     'Envoyer le message',
      'contact.success':  'Merci! Nous vous contacterons bientôt.',

      /* Lang switcher */
      'lang.choose':      'Choisir la langue',
      'lang.en':          'English',
      'lang.fr':          'Français',
      'lang.ar':          'العربية',

      /* Ticker */
      'ticker.1':         'Le Hub Jeunesse est maintenant en ligne · Candidatures au mentorat ouvertes',
      'ticker.2':         'Road Trip Édimbourg → Lagos · 6 Nov 2027',
      'ticker.3':         '70+ Entreprises communautaires répertoriées',
    },

    ar: {
      /* Navigation */
      'nav.home':         'الرئيسية',
      'nav.community':    'المجتمع',
      'nav.events':       'الفعاليات',
      'nav.news':         'الأخبار',
      'nav.about':        'من نحن',
      'nav.volunteering': 'التطوع والشراكات',
      'nav.cuisine':      'المطبخ',
      'nav.contact':      'اتصل بنا',
      'nav.more':         'المزيد',
      'nav.youth':        'مركز الشباب',
      'nav.impact':       'شجرة التأثير',
      'nav.login':        'تسجيل الدخول',

      /* Buttons */
      'btn.join':         'انضم إلى NABA',
      'btn.learn':        'اعرف المزيد',
      'btn.events':       'ابحث عن فعالية ←',
      'btn.readmore':     'اقرأ المزيد',
      'btn.submit':       'إرسال',
      'btn.subscribe':    'اشتراك',
      'btn.gethelp':      'احصل على المساعدة',
      'btn.volunteer':    'تطوع',
      'btn.donate':       'تبرع',
      'btn.viewall':      'عرض الكل',
      'btn.back':         'رجوع',
      'btn.close':        'إغلاق',
      'btn.search':       'بحث',

      /* Hero */
      'hero.eyebrow':     'مركز المجتمع الأفريقي والأسود في اسكتلندا',
      'hero.cta.primary':   'انضم إلى NABA',
      'hero.cta.secondary': 'استكشف الخدمات',

      /* Sections */
      'section.mission':  'مهمتنا',
      'section.events':   'الفعاليات القادمة',
      'section.news':     'آخر الأخبار',
      'section.impact':   'الأثر المجتمعي',
      'section.gallery':  'معرض الصور',
      'section.youth':    'مركز الشباب',
      'section.contact':  'تواصل معنا',
      'section.partners': 'شركاؤنا',
      'section.volunteer':'تطوع معنا',
      'section.directory':'دليل المجتمع',

      /* Footer */
      'footer.newsletter':    'ابق على اطلاع',
      'footer.newsletter.sub':'أسابيع ثقافية وتحديثات مباشرة إلى بريدك الإلكتروني.',
      'footer.newsletter.ph': 'بريدك@example.com',
      'footer.newsletter.btn':'انضم',
      'footer.explore':       'استكشاف',
      'footer.offices':       'المكاتب',
      'footer.connect':       'تواصل',
      'footer.privacy':       'الخصوصية',
      'footer.accessibility': 'إمكانية الوصول',
      'footer.safeguarding':  'الحماية',
      'footer.stafflogin':    'دخول الموظفين',
      'footer.tagline':       'مجتمعنا هو قوتنا — نربط المجتمعات الأفريقية والسوداء في اسكتلندا بالخدمات الموثوقة والثقافة وبعضهم البعض.',
      'footer.credit':        'تصميم الموقع بواسطة Kaabu Technologies',
      'footer.copyright':     'الرابطة الوطنية الأفريقية والسوداء.',

      /* Contact */
      'contact.name':     'الاسم الكامل',
      'contact.email':    'عنوان البريد الإلكتروني',
      'contact.subject':  'الموضوع',
      'contact.message':  'الرسالة',
      'contact.send':     'إرسال الرسالة',
      'contact.success':  'شكراً! سنتواصل معك قريباً.',

      /* Lang switcher */
      'lang.choose':      'اختر اللغة',
      'lang.en':          'English',
      'lang.fr':          'Français',
      'lang.ar':          'العربية',

      /* Ticker */
      'ticker.1':         'مركز الشباب متاح الآن · طلبات الإرشاد مفتوحة',
      'ticker.2':         'رحلة إدنبرة → لاغوس · 6 نوفمبر 2027',
      'ticker.3':         '+70 شركة مجتمعية مدرجة',
    }
  };

  var SUPPORTED = ['en', 'fr', 'ar'];
  var RTL = ['ar'];

  function getLang() {
    var stored = localStorage.getItem('naba_lang');
    if (stored && SUPPORTED.indexOf(stored) !== -1) return stored;
    var browser = (navigator.language || 'en').slice(0, 2).toLowerCase();
    return SUPPORTED.indexOf(browser) !== -1 ? browser : 'en';
  }

  function setLang(lang) {
    if (SUPPORTED.indexOf(lang) === -1) lang = 'en';
    localStorage.setItem('naba_lang', lang);
    applyLang(lang);
  }

  function t(key, lang) {
    lang = lang || getLang();
    var dict = TRANSLATIONS[lang] || TRANSLATIONS['en'];
    return dict[key] || TRANSLATIONS['en'][key] || key;
  }

  function applyLang(lang) {
    lang = lang || getLang();
    var isRTL = RTL.indexOf(lang) !== -1;

    /* document direction */
    document.documentElement.lang = lang;
    document.documentElement.dir  = isRTL ? 'rtl' : 'ltr';

    /* translate all tagged elements */
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      var attr = el.getAttribute('data-i18n-attr');
      var val = t(key, lang);
      if (attr) {
        el.setAttribute(attr, val);
      } else if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = val;
      } else {
        el.textContent = val;
      }
    });

    /* translate placeholders tagged separately */
    document.querySelectorAll('[data-i18n-ph]').forEach(function (el) {
      el.placeholder = t(el.getAttribute('data-i18n-ph'), lang);
    });

    /* update lang switcher button label if present */
    var btn = document.getElementById('langBtn');
    if (btn) {
      btn.setAttribute('aria-label', 'Language: ' + lang.toUpperCase() + ' — click to change');
      btn.setAttribute('data-lang', lang);
    }

    /* update active state in lang modal */
    document.querySelectorAll('.lang-option').forEach(function (opt) {
      opt.classList.toggle('active', opt.dataset.lang === lang);
    });

    /* fire custom event so pages can hook in */
    document.dispatchEvent(new CustomEvent('naba:langChange', { detail: { lang: lang, isRTL: isRTL } }));
  }

  return {
    getLang:   getLang,
    setLang:   setLang,
    t:         t,
    apply:     applyLang,
    supported: SUPPORTED
  };

})();
