/* =====================================================================
   NABA — Global Multi-Language Translation System
   Languages: English (en), Français (fr), Español (es), العربية (ar), Português (pt)
   ===================================================================== */

window.NABA_I18N = (function () {
  'use strict';

  var SUPPORTED = ['en', 'fr', 'es', 'ar', 'pt'];
  var RTL = ['ar'];

  var TRANSLATIONS = {
    en: {
      /* Navigation */
      'home': 'Home', 'nav.home': 'Home',
      'community': 'Community', 'nav.community': 'Community',
      'events': 'Events', 'nav.events': 'Events',
      'news': 'News', 'nav.news': 'News',
      'about': 'About Us', 'nav.about': 'About Us',
      'volunteering': 'Volunteering & Partnerships', 'nav.volunteering': 'Volunteering & Partnerships',
      'cuisine': 'Cuisine', 'nav.cuisine': 'Cuisine',
      'contact': 'Contact Us', 'nav.contact': 'Contact Us',
      'more': 'More', 'nav.more': 'More ▾',
      'youth': 'Youth Hub', 'nav.youth': 'Youth Hub (New)',
      'youthHubNew': 'Youth Hub (New)',
      'impact': 'Impact Tree', 'nav.impact': 'Impact Tree',
      'photoGallery': 'Photo Gallery',
      'legacySheku': 'Legacy of Sheku Bayoh',
      'login': 'Sign In', 'nav.login': 'Sign In',
      'account': 'Account', 'search': 'Search',

      /* Ticker */
      'ticker1': 'Youth Hub is now live · Mentorship applications open',
      'ticker2': 'Edinburgh → Lagos Road Trip · 6 Nov 2027',
      'ticker3': '70+ Community Businesses Listed',
      'ticker.1': 'Youth Hub is now live · Mentorship applications open',
      'ticker.2': 'Edinburgh → Lagos Road Trip · 6 Nov 2027',
      'ticker.3': '70+ Community Businesses Listed',

      /* Common Buttons & Actions */
      'btn.join': 'Join NABA',
      'btn.learn': 'Learn More',
      'btn.events': 'Find an Event →',
      'btn.readmore': 'Read more',
      'btn.submit': 'Submit',
      'btn.subscribe': 'Subscribe',
      'btn.gethelp': 'Get Help Now',
      'btn.volunteer': 'Volunteer',
      'btn.donate': 'Donate',
      'btn.viewall': 'View All',
      'btn.back': 'Back',
      'btn.close': 'Close',
      'btn.search': 'Search',
      'service': 'Find a Service',
      'event': 'Find an Event',
      'watch': 'Watch',
      'learnMore': 'Learn More About NABA',
      'readMore': 'Read more →',
      'close': 'Close',
      'help': 'Get Help Now',
      'searchPlaceholder': 'Search NABA — directory, events, pages…',
      'selectLanguage': 'Select Language',
      'lang.choose': 'Select Language',
      'hub_tagline': "Scotland's African & Black Community Hub",

      /* Hero */
      'heroEyebrow': "Scotland's African & Black Community Hub",
      'hero.eyebrow': "Scotland's African & Black Community Hub",
      'heroTitle': 'NABA finds strength in our community',
      'heroSub': 'NABA connects African and Black communities across Scotland to trusted services, cultural life, and each other — breaking down barriers wherever we find them.',
      'hero.cta.primary': 'Join NABA',
      'hero.cta.secondary': 'Explore Services',

      /* Mission */
      'missionEyebrow': 'What Is NABA?',
      'missionTitle': 'We are an engaged community',
      'missionQuote': '"Our community is our strength."',
      'missionP1': 'The National African & Black Association (NABA) is a UK non-profit organisation dedicated to promoting equity, inclusion, and improved access to public services for African and Black individuals across Scotland.',
      'missionP2': 'We work in partnership with institutions to assess the impact of policies and practices, deliver cultural awareness and anti-racism training, and foster meaningful engagement between public services and the communities they serve.',
      'missionStory': 'Read our full story ›',

      /* Stats */
      'statBusinesses': 'Local Businesses',
      'statProviders': 'Service Providers',
      'statOffices': 'Offices in Scotland',

      /* Sections */
      'section.mission': 'Our Mission',
      'section.events': 'Upcoming Events',
      'section.news': 'Latest News',
      'section.impact': 'Community Impact',
      'section.gallery': 'Gallery',
      'section.youth': 'Youth Hub',
      'section.contact': 'Get in Touch',
      'section.partners': 'Our Partners',
      'section.volunteer': 'Volunteer With Us',
      'section.directory': 'Community Directory',

      /* Media & YouTube */
      'videoCap': 'A minute with NABA — watch our story',
      'youtubeEyebrow': 'YouTube',
      'youtubeTitle': 'Own the Topic & Community Conversations',
      'youtubeSub': 'Short talks, interviews and updates from NABA — real voices from across Scotland.',
      'youtubeWatch': 'Watch on YouTube',
      'yt1Title': 'Own the Topic',
      'yt1Desc': 'Bold community conversations on identity, education and public life.',
      'yt2Title': 'Voices & Stories',
      'yt2Desc': 'Real stories rooted in lived experience across Glasgow and Edinburgh.',
      'yt3Title': 'Live Sessions',
      'yt3Desc': 'Community town halls, Q&A and network updates you can join.',

      /* Youth Hub & Impact */
      'youthEyebrow': 'New Initiative',
      'youthTitle': 'The Youth Hub is live',
      'youthSub': 'Mentorship, training, skills workshops and funding pathways for the next generation.',
      'exploreYouth': 'Explore the Youth Hub',
      'treeEyebrow': 'Live Visualisation',
      'treeTitle': 'Watch our impact grow',
      'treeSub': "Every business, mentor, and young person who joins adds a leaf to NABA's Community Impact Tree.",
      'treeBtn': 'See the Impact Tree',

      /* Directory & Events */
      'dirEyebrow': 'Directory',
      'dirTitle': 'Find the right service',
      'dirView': 'View full directory ›',
      'evEyebrow': 'Upcoming Events',
      'evTitle': 'Events all across Scotland',
      'evAll': 'See all events ›',
      'evFind': 'Find an Event',
      'evTap': 'Tap an event for details & flyer',
      'storiesEyebrow': 'Recent Highlights',
      'storiesTitle': 'What we have been working on',

      /* Footer */
      'footer.newsletter': 'Stay in the loop',
      'footerStay': 'Stay in the loop',
      'footer.newsletter.sub': 'Cultural weeks, town halls, and road trip updates straight to your inbox.',
      'footerStaySub': 'Cultural weeks, town halls, and road trip updates straight to your inbox.',
      'footer.newsletter.ph': 'you@email.com',
      'footer.newsletter.btn': 'Join',
      'footerJoin': 'Join',
      'footer.explore': 'Explore',
      'footerExplore': 'Explore',
      'footer.offices': 'Offices',
      'footerOffices': 'Offices',
      'footer.connect': 'Connect',
      'footerConnect': 'Connect',
      'footer.privacy': 'Privacy',
      'footer.accessibility': 'Accessibility',
      'footer.safeguarding': 'Safeguarding',
      'footer.stafflogin': 'Staff Login',
      'privacy': 'Privacy',
      'accessibility': 'Accessibility',
      'safeguarding': 'Safeguarding',
      'staffLogin': 'Staff Login',
      'footer.tagline': 'Our community is our strength — connecting African and Black communities across Scotland to trusted services, culture, and each other.',
      'footerTagline': 'Our community is our strength — connecting African and Black communities across Scotland to trusted services, culture, and each other.',
      'footer.credit': 'Web design by Kaabu Technologies',
      'footer.copyright': 'National African & Black Association.',

      /* Contact Form */
      'contact.name': 'Full Name',
      'contact.email': 'Email Address',
      'contact.subject': 'Subject',
      'contact.message': 'Message',
      'contact.send': 'Send Message',
      'contact.success': "Thank you! We will be in touch soon."
    },

    fr: {
      /* Navigation */
      'home': 'Accueil', 'nav.home': 'Accueil',
      'community': 'Communauté', 'nav.community': 'Communauté',
      'events': 'Événements', 'nav.events': 'Événements',
      'news': 'Actualités', 'nav.news': 'Actualités',
      'about': 'À propos', 'nav.about': 'À propos',
      'volunteering': 'Bénévolat & Partenariats', 'nav.volunteering': 'Bénévolat & Partenariats',
      'cuisine': 'Cuisine', 'nav.cuisine': 'Cuisine',
      'contact': 'Contactez-nous', 'nav.contact': 'Contactez-nous',
      'more': 'Plus', 'nav.more': 'Plus ▾',
      'youth': 'Hub Jeunesse', 'nav.youth': 'Hub Jeunesse (Nouveau)',
      'youthHubNew': 'Hub Jeunesse (Nouveau)',
      'impact': "Arbre d'impact", 'nav.impact': "Arbre d'impact",
      'photoGallery': 'Galerie photos',
      'legacySheku': 'Héritage de Sheku Bayoh',
      'login': 'Connexion', 'nav.login': 'Connexion',
      'account': 'Compte', 'search': 'Rechercher',

      /* Ticker */
      'ticker1': 'Le Hub Jeunesse est en ligne · Candidatures au mentorat ouvertes',
      'ticker2': 'Road Trip Édimbourg → Lagos · 6 Nov 2027',
      'ticker3': 'Plus de 70 entreprises communautaires répertoriées',
      'ticker.1': 'Le Hub Jeunesse est en ligne · Candidatures au mentorat ouvertes',
      'ticker.2': 'Road Trip Édimbourg → Lagos · 6 Nov 2027',
      'ticker.3': 'Plus de 70 entreprises communautaires répertoriées',

      /* Common Buttons & Actions */
      'btn.join': 'Rejoindre NABA',
      'btn.learn': 'En savoir plus',
      'btn.events': 'Trouver un événement →',
      'btn.readmore': 'Lire la suite',
      'btn.submit': 'Soumettre',
      'btn.subscribe': "S'abonner",
      'btn.gethelp': "Obtenir de l'aide",
      'btn.volunteer': 'Devenir bénévole',
      'btn.donate': 'Faire un don',
      'btn.viewall': 'Voir tout',
      'btn.back': 'Retour',
      'btn.close': 'Fermer',
      'btn.search': 'Rechercher',
      'service': 'Trouver un service',
      'event': 'Trouver un événement',
      'watch': 'Regarder',
      'learnMore': 'En savoir plus sur NABA',
      'readMore': 'Lire la suite →',
      'close': 'Fermer',
      'help': "Obtenir de l'aide",
      'searchPlaceholder': 'Rechercher dans NABA — annuaire, événements…',
      'selectLanguage': 'Choisir la langue',
      'lang.choose': 'Choisir la langue',
      'hub_tagline': "Le Centre Communautaire Africain & Noir d'Écosse",

      /* Hero */
      'heroEyebrow': "Le Centre Communautaire Africain & Noir d'Écosse",
      'hero.eyebrow': "Le Centre Communautaire Africain & Noir d'Écosse",
      'heroTitle': 'NABA puise sa force dans notre communauté',
      'heroSub': 'NABA connecte les communautés africaines et noires en Écosse aux services de confiance, à la vie culturelle et les unes aux autres.',
      'hero.cta.primary': 'Rejoindre NABA',
      'hero.cta.secondary': 'Découvrir les services',

      /* Mission */
      'missionEyebrow': "Qu'est-ce que NABA ?",
      'missionTitle': 'Nous sommes une communauté engagée',
      'missionQuote': '« Notre communauté est notre force. »',
      'missionP1': "L'Association Nationale Africaine et Noire (NABA) est une organisation caritative écossaise engagée pour l'équité, l'inclusion et un meilleur accès aux services publics.",
      'missionP2': "Nous travaillons avec les institutions pour évaluer l'impact des politiques, former à la sensibilisation culturelle et favoriser le dialogue avec les communautés.",
      'missionStory': 'Lire notre histoire complète ›',

      /* Stats */
      'statBusinesses': 'Entreprises locales',
      'statProviders': 'Prestataires de services',
      'statOffices': 'Bureaux en Écosse',

      /* Sections */
      'section.mission': 'Notre Mission',
      'section.events': 'Événements à venir',
      'section.news': 'Dernières actualités',
      'section.impact': 'Impact communautaire',
      'section.gallery': 'Galerie',
      'section.youth': 'Hub Jeunesse',
      'section.contact': 'Nous contacter',
      'section.partners': 'Nos Partenaires',
      'section.volunteer': 'Bénévolat avec nous',
      'section.directory': 'Répertoire communautaire',

      /* Media & YouTube */
      'videoCap': 'Une minute avec NABA — notre histoire',
      'youtubeEyebrow': 'YouTube',
      'youtubeTitle': 'Own the Topic & Conversations Communautaires',
      'youtubeSub': 'Courtes interventions, interviews et nouvelles de NABA à travers l’Écosse.',
      'youtubeWatch': 'Regarder sur YouTube',
      'yt1Title': 'Own the Topic',
      'yt1Desc': 'Conversations audacieuses sur l’identité et la vie citoyenne.',
      'yt2Title': 'Voix & Histoires',
      'yt2Desc': 'Récits authentiques ancrés dans l’expérience vécue en Écosse.',
      'yt3Title': 'Sessions en direct',
      'yt3Desc': 'Tables rondes, questions-réponses et mises à jour du réseau.',

      /* Youth Hub & Impact */
      'youthEyebrow': 'Nouvelle initiative',
      'youthTitle': 'Le Hub Jeunesse est actif',
      'youthSub': 'Mentorat, formations, ateliers et accès aux opportunités pour les jeunes.',
      'exploreYouth': 'Explorer le Hub Jeunesse',
      'treeEyebrow': 'Visualisation en direct',
      'treeTitle': 'Regardez notre impact grandir',
      'treeSub': "Chaque membre et entreprise ajoute une feuille à l'arbre d'impact de NABA.",
      'treeBtn': "Voir l'arbre d'impact",

      /* Directory & Events */
      'dirEyebrow': 'Annuaire',
      'dirTitle': 'Trouvez le bon service',
      'dirView': "Voir tout l'annuaire ›",
      'evEyebrow': 'Événements à venir',
      'evTitle': 'Des événements dans toute l’Écosse',
      'evAll': 'Tous les événements ›',
      'evFind': 'Trouver un événement',
      'evTap': 'Touchez un événement pour les détails',
      'storiesEyebrow': 'Actions récentes',
      'storiesTitle': 'Ce que nous réalisons ensemble',

      /* Footer */
      'footer.newsletter': 'Restez informé',
      'footerStay': 'Restez informé',
      'footer.newsletter.sub': 'Semaines culturelles, assemblées et mises à jour directement dans votre boîte mail.',
      'footerStaySub': 'Semaines culturelles, assemblées et mises à jour directement dans votre boîte mail.',
      'footer.newsletter.ph': 'vous@email.com',
      'footer.newsletter.btn': 'Rejoindre',
      'footerJoin': 'Rejoindre',
      'footer.explore': 'Explorer',
      'footerExplore': 'Explorer',
      'footer.offices': 'Bureaux',
      'footerOffices': 'Bureaux',
      'footer.connect': 'Connecter',
      'footerConnect': 'Connecter',
      'footer.privacy': 'Confidentialité',
      'footer.accessibility': 'Accessibilité',
      'footer.safeguarding': 'Protection',
      'footer.stafflogin': 'Connexion Personnel',
      'privacy': 'Confidentialité',
      'accessibility': 'Accessibilité',
      'safeguarding': 'Protection',
      'staffLogin': 'Connexion Personnel',
      'footer.tagline': 'Notre communauté est notre force — connectant les communautés africaines et noires en Écosse aux services de confiance et à la culture.',
      'footerTagline': 'Notre communauté est notre force — connectant les communautés africaines et noires en Écosse aux services de confiance et à la culture.',
      'footer.credit': 'Conception web par Kaabu Technologies',
      'footer.copyright': 'Association Nationale Africaine & Noire.',

      /* Contact Form */
      'contact.name': 'Nom complet',
      'contact.email': 'Adresse e-mail',
      'contact.subject': 'Sujet',
      'contact.message': 'Message',
      'contact.send': 'Envoyer le message',
      'contact.success': 'Merci! Nous vous contacterons très bientôt.'
    },

    es: {
      /* Navigation */
      'home': 'Inicio', 'nav.home': 'Inicio',
      'community': 'Comunidad', 'nav.community': 'Comunidad',
      'events': 'Eventos', 'nav.events': 'Eventos',
      'news': 'Noticias', 'nav.news': 'Noticias',
      'about': 'Sobre Nosotros', 'nav.about': 'Sobre Nosotros',
      'volunteering': 'Voluntariado y Alianzas', 'nav.volunteering': 'Voluntariado y Alianzas',
      'cuisine': 'Gastronomía', 'nav.cuisine': 'Gastronomía',
      'contact': 'Contacto', 'nav.contact': 'Contacto',
      'more': 'Más', 'nav.more': 'Más ▾',
      'youth': 'Centro Juvenil', 'nav.youth': 'Centro Juvenil (Nuevo)',
      'youthHubNew': 'Centro Juvenil (Nuevo)',
      'impact': 'Árbol de Impacto', 'nav.impact': 'Árbol de Impacto',
      'photoGallery': 'Galería de Fotos',
      'legacySheku': 'Legado de Sheku Bayoh',
      'login': 'Iniciar Sesión', 'nav.login': 'Iniciar Sesión',
      'account': 'Cuenta', 'search': 'Buscar',

      /* Ticker */
      'ticker1': 'El Centro Juvenil ya está activo · Convocatoria de mentoría abierta',
      'ticker2': 'Viaje Edimburgo → Lagos · 6 Nov 2027',
      'ticker3': 'Más de 70 negocios comunitarios registrados',
      'ticker.1': 'El Centro Juvenil ya está activo · Convocatoria de mentoría abierta',
      'ticker.2': 'Viaje Edimburgo → Lagos · 6 Nov 2027',
      'ticker.3': 'Más de 70 negocios comunitarios registrados',

      /* Common Buttons & Actions */
      'btn.join': 'Unirse a NABA',
      'btn.learn': 'Saber más',
      'btn.events': 'Buscar evento →',
      'btn.readmore': 'Leer más',
      'btn.submit': 'Enviar',
      'btn.subscribe': 'Suscribirse',
      'btn.gethelp': 'Obtener Ayuda Ahora',
      'btn.volunteer': 'Ser Voluntario',
      'btn.donate': 'Donar',
      'btn.viewall': 'Ver todo',
      'btn.back': 'Volver',
      'btn.close': 'Cerrar',
      'btn.search': 'Buscar',
      'service': 'Buscar un Servicio',
      'event': 'Buscar un Evento',
      'watch': 'Ver',
      'learnMore': 'Conozca Más Sobre NABA',
      'readMore': 'Leer más →',
      'close': 'Cerrar',
      'help': 'Obtener Ayuda Ahora',
      'searchPlaceholder': 'Buscar en NABA — directorio, eventos…',
      'selectLanguage': 'Seleccionar Idioma',
      'lang.choose': 'Seleccionar Idioma',
      'hub_tagline': 'El Centro Comunitario Africano y Negro de Escocia',

      /* Hero */
      'heroEyebrow': 'El Centro Comunitario Africano y Negro de Escocia',
      'hero.eyebrow': 'El Centro Comunitario Africano y Negro de Escocia',
      'heroTitle': 'NABA encuentra fuerza en nuestra comunidad',
      'heroSub': 'NABA conecta a las comunidades africanas y negras en Escocia con servicios de confianza, vida cultural y entre sí.',
      'hero.cta.primary': 'Unirse a NABA',
      'hero.cta.secondary': 'Explorar Servicios',

      /* Mission */
      'missionEyebrow': '¿Qué es NABA?',
      'missionTitle': 'Somos una comunidad comprometida',
      'missionQuote': '"Nuestra comunidad es nuestra fuerza."',
      'missionP1': 'La Asociación Nacional Africana y Negra (NABA) es una entidad sin fines de lucro en Escocia dedicada a promover la equidad, inclusión y acceso a servicios públicos.',
      'missionP2': 'Trabajamos con instituciones para evaluar políticas, impartir formación antirracista y fomentar el diálogo con la comunidad.',
      'missionStory': 'Leer nuestra historia completa ›',

      /* Stats */
      'statBusinesses': 'Negocios Locales',
      'statProviders': 'Proveedores de Servicios',
      'statOffices': 'Sedes en Escocia',

      /* Sections */
      'section.mission': 'Nuestra Misión',
      'section.events': 'Próximos Eventos',
      'section.news': 'Últimas Noticias',
      'section.impact': 'Impacto Comunitario',
      'section.gallery': 'Galería',
      'section.youth': 'Centro Juvenil',
      'section.contact': 'Contacto',
      'section.partners': 'Nuestros Aliados',
      'section.volunteer': 'Voluntariado',
      'section.directory': 'Directorio Comunitario',

      /* Media & YouTube */
      'videoCap': 'Un minuto con NABA — conozca nuestra historia',
      'youtubeEyebrow': 'YouTube',
      'youtubeTitle': 'Own the Topic y Diálogos Comunitarios',
      'youtubeSub': 'Charlas breves, entrevistas y novedades de NABA en toda Escocia.',
      'youtubeWatch': 'Ver en YouTube',
      'yt1Title': 'Own the Topic',
      'yt1Desc': 'Debates valientes sobre identidad, educación y vida pública.',
      'yt2Title': 'Voces e Historias',
      'yt2Desc': 'Historias reales basadas en vivencias en Escocia.',
      'yt3Title': 'Sesiones en Vivo',
      'yt3Desc': 'Asambleas, preguntas y respuestas con nuestra red.',

      /* Youth Hub & Impact */
      'youthEyebrow': 'Nueva Iniciativa',
      'youthTitle': 'El Centro Juvenil está activo',
      'youthSub': 'Mentoría, formación, talleres y financiación para las nuevas generaciones.',
      'exploreYouth': 'Explorar el Centro Juvenil',
      'treeEyebrow': 'Visualización en Vivo',
      'treeTitle': 'Vea crecer nuestro impacto',
      'treeSub': 'Cada negocio y participante suma una hoja al Árbol de Impacto de NABA.',
      'treeBtn': 'Ver el Árbol de Impacto',

      /* Directory & Events */
      'dirEyebrow': 'Directorio',
      'dirTitle': 'Encuentre el servicio adecuado',
      'dirView': 'Ver directorio completo ›',
      'evEyebrow': 'Próximos Eventos',
      'evTitle': 'Eventos en toda Escocia',
      'evAll': 'Ver todos los eventos ›',
      'evFind': 'Buscar un Evento',
      'evTap': 'Toque un evento para más detalles',
      'storiesEyebrow': 'Destacados Recientes',
      'storiesTitle': 'Proyectos y labores comunitarias',

      /* Footer */
      'footer.newsletter': 'Manténgase informado',
      'footerStay': 'Manténgase informado',
      'footer.newsletter.sub': 'Semanas culturales, asambleas y novedades directamente en su correo.',
      'footerStaySub': 'Semanas culturales, asambleas y novedades directamente en su correo.',
      'footer.newsletter.ph': 'su@correo.com',
      'footer.newsletter.btn': 'Unirse',
      'footerJoin': 'Unirse',
      'footer.explore': 'Explorar',
      'footerExplore': 'Explorar',
      'footer.offices': 'Sedes',
      'footerOffices': 'Sedes',
      'footer.connect': 'Conectar',
      'footerConnect': 'Conectar',
      'footer.privacy': 'Privacidad',
      'footer.accessibility': 'Accesibilidad',
      'footer.safeguarding': 'Protección',
      'footer.stafflogin': 'Acceso Personal',
      'privacy': 'Privacidad',
      'accessibility': 'Accesibilidad',
      'safeguarding': 'Protección',
      'staffLogin': 'Acceso Personal',
      'footer.tagline': 'Nuestra comunidad es nuestra fuerza — conectando comunidades africanas y negras en Escocia.',
      'footerTagline': 'Nuestra comunidad es nuestra fuerza — conectando comunidades africanas y negras en Escocia.',
      'footer.credit': 'Diseño web por Kaabu Technologies',
      'footer.copyright': 'Asociación Nacional Africana y Negra.',

      /* Contact Form */
      'contact.name': 'Nombre Completo',
      'contact.email': 'Correo Electrónico',
      'contact.subject': 'Asunto',
      'contact.message': 'Mensaje',
      'contact.send': 'Enviar Mensaje',
      'contact.success': '¡Gracias! Nos pondremos en contacto pronto.'
    },

    ar: {
      /* Navigation */
      'home': 'الرئيسية', 'nav.home': 'الرئيسية',
      'community': 'المجتمع', 'nav.community': 'المجتمع',
      'events': 'الفعاليات', 'nav.events': 'الفعاليات',
      'news': 'الأخبار', 'nav.news': 'الأخبار',
      'about': 'من نحن', 'nav.about': 'من نحن',
      'volunteering': 'التطوع والشراكات', 'nav.volunteering': 'التطوع والشراكات',
      'cuisine': 'المطبخ التراثي', 'nav.cuisine': 'المطبخ التراثي',
      'contact': 'اتصل بنا', 'nav.contact': 'اتصل بنا',
      'more': 'المزيد', 'nav.more': 'المزيد ▾',
      'youth': 'مركز الشباب', 'nav.youth': 'مركز الشباب (جديد)',
      'youthHubNew': 'مركز الشباب (جديد)',
      'impact': 'شجرة الأثر', 'nav.impact': 'شجرة الأثر',
      'photoGallery': 'معرض الصور',
      'legacySheku': 'إرث شيكو بايو',
      'login': 'تسجيل الدخول', 'nav.login': 'تسجيل الدخول',
      'account': 'الحساب', 'search': 'بحث',

      /* Ticker */
      'ticker1': 'مركز الشباب متاح الآن · باب طلبات الإرشاد مفتوح',
      'ticker2': 'رحلة إدنبرة إلى لاغوس · 6 نوفمبر 2027',
      'ticker3': 'أكثر من 70 مشروعاً مجتمعياً مدرجاً',
      'ticker.1': 'مركز الشباب متاح الآن · باب طلبات الإرشاد مفتوح',
      'ticker.2': 'رحلة إدنبرة إلى لاغوس · 6 نوفمبر 2027',
      'ticker.3': 'أكثر من 70 مشروعاً مجتمعياً مدرجاً',

      /* Common Buttons & Actions */
      'btn.join': 'انضم إلى NABA',
      'btn.learn': 'اعرف المزيد',
      'btn.events': 'ابحث عن فعالية ←',
      'btn.readmore': 'اقرأ المزيد',
      'btn.submit': 'إرسال',
      'btn.subscribe': 'اشتراك',
      'btn.gethelp': 'احصل على المساعدة',
      'btn.volunteer': 'تطوع معنا',
      'btn.donate': 'تبرع',
      'btn.viewall': 'عرض الكل',
      'btn.back': 'رجوع',
      'btn.close': 'إغلاق',
      'btn.search': 'بحث',
      'service': 'ابحث عن خدمة',
      'event': 'ابحث عن فعالية',
      'watch': 'مشاهدة',
      'learnMore': 'اعرف المزيد عن NABA',
      'readMore': 'اقرأ المزيد ←',
      'close': 'إغلاق',
      'help': 'احصل على المساعدة الآن',
      'searchPlaceholder': 'ابحث في NABA — الدليل، الفعاليات…',
      'selectLanguage': 'اختر اللغة',
      'lang.choose': 'اختر اللغة',
      'hub_tagline': 'مركز المجتمع الأفريقي والأسود في اسكتلندا',

      /* Hero */
      'heroEyebrow': 'مركز المجتمع الأفريقي والأسود في اسكتلندا',
      'hero.eyebrow': 'مركز المجتمع الأفريقي والأسود في اسكتلندا',
      'heroTitle': 'تستمد NABA قوتها من تلاحم مجتمعنا',
      'heroSub': 'تربط NABA المجتمعات الأفريقية والسوداء في اسكتلندا بالخدمات الموثوقة والحياة الثقافية وبعضهم ببعض.',
      'hero.cta.primary': 'انضم إلى NABA',
      'hero.cta.secondary': 'استكشف الخدمات',

      /* Mission */
      'missionEyebrow': 'ما هي NABA؟',
      'missionTitle': 'مجتمع متماسك ومبادر',
      'missionQuote': '"مجتمعنا هو مصدر قوتنا."',
      'missionP1': 'الرابطة الوطنية الأفريقية والسوداء (NABA) منظمة غير ربحية في اسكتلندا تعمل على تعزيز العدالة وتكافؤ الفرص في الخدمات العامة.',
      'missionP2': 'نعمل بالشراكة مع المؤسسات الرسمية للتدريب على التنوع الثقافي ومناهضة التمييز وبناء جسور الثقة مع المجتمع.',
      'missionStory': 'اقرأ قصتنا الكاملة ›',

      /* Stats */
      'statBusinesses': 'مشروع محلي',
      'statProviders': 'مقدم خدمة',
      'statOffices': 'مكاتب في اسكتلندا',

      /* Sections */
      'section.mission': 'رسالتنا',
      'section.events': 'الفعاليات القادمة',
      'section.news': 'آخر المستجدات',
      'section.impact': 'الأثر المجتمعي',
      'section.gallery': 'معرض الصور',
      'section.youth': 'مركز الشباب',
      'section.contact': 'تواصل معنا',
      'section.partners': 'شركاؤنا',
      'section.volunteer': 'تطوع معنا',
      'section.directory': 'دليل المجتمع',

      /* Media & YouTube */
      'videoCap': 'دقيقة مع NABA — شاهد قصتنا',
      'youtubeEyebrow': 'يوتيوب',
      'youtubeTitle': 'حوارات مجتمعية ملهمة',
      'youtubeSub': 'لقاءات وحوارات ومستجدات تسلط الضوء على تجارب مجتمعنا في اسكتلندا.',
      'youtubeWatch': 'مشاهدة على يوتيوب',
      'yt1Title': 'امتلك الحوار',
      'yt1Desc': 'نقاشات جريئة حول الهوية والتعليم والمجتمع.',
      'yt2Title': 'أصوات وقصص',
      'yt2Desc': 'تجارب واقعية ملهمة من قلب المجتمع في غلاسكو وإدنبرة.',
      'yt3Title': 'جلسات مباشرة',
      'yt3Desc': 'لقاءات مفتوحة وحوارات مباشرة يمكنك المشاركة فيها.',

      /* Youth Hub & Impact */
      'youthEyebrow': 'مبادرة جديدة',
      'youthTitle': 'مركز الشباب متاح الآن',
      'youthSub': 'برامج توجيه وتدريب مهني ودعم لتمكين الجيل الصاعد.',
      'exploreYouth': 'استكشف مركز الشباب',
      'treeEyebrow': 'لوحة تفاعلية حية',
      'treeTitle': 'شاهد أثرنا ينمو يوماً بعد يوم',
      'treeSub': 'كل مشروع أو عضو ينضم يضيف ورقة جديدة إلى شجرة أثر NABA المجتمعية.',
      'treeBtn': 'عرض شجرة الأثر',

      /* Directory & Events */
      'dirEyebrow': 'دليل الخدمات',
      'dirTitle': 'ابحث عن الخدمة المناسبة لك',
      'dirView': 'عرض الدليل الكامل ›',
      'evEyebrow': 'الفعاليات القادمة',
      'evTitle': 'فعاليات في مختلف أنحاء اسكتلندا',
      'evAll': 'جميع الفعاليات ›',
      'evFind': 'ابحث عن فعالية',
      'evTap': 'اضغط على الفعالية للاطلاع على التفاصيل',
      'storiesEyebrow': 'أبرز الإنجازات',
      'storiesTitle': 'مشاريع ومبادرات حديثة',

      /* Footer */
      'footer.newsletter': 'ابق على تواصل',
      'footerStay': 'ابق على تواصل',
      'footer.newsletter.sub': 'تصلك تحديثات الأسابيع الثقافية واللقاءات مباشرة إلى بريدك الإلكتروني.',
      'footerStaySub': 'تصلك تحديثات الأسابيع الثقافية واللقاءات مباشرة إلى بريدك الإلكتروني.',
      'footer.newsletter.ph': 'بريدك الإلكتروني',
      'footer.newsletter.btn': 'اشتراك',
      'footerJoin': 'اشتراك',
      'footer.explore': 'استكشاف',
      'footerExplore': 'استكشاف',
      'footer.offices': 'المكاتب',
      'footerOffices': 'المكاتب',
      'footer.connect': 'التواصل',
      'footerConnect': 'التواصل',
      'footer.privacy': 'سياسة الخصوصية',
      'footer.accessibility': 'إمكانية الوصول',
      'footer.safeguarding': 'حماية الأفراد',
      'footer.stafflogin': 'دخول الموظفين',
      'privacy': 'سياسة الخصوصية',
      'accessibility': 'إمكانية الوصول',
      'safeguarding': 'حماية الأفراد',
      'staffLogin': 'دخول الموظفين',
      'footer.tagline': 'مجتمعنا هو مصدر قوتنا — نربط المجتمعات الأفريقية والسوداء في اسكتلندا بالخدمات والثقافة.',
      'footerTagline': 'مجتمعنا هو مصدر قوتنا — نربط المجتمعات الأفريقية والسوداء في اسكتلندا بالخدمات والثقافة.',
      'footer.credit': 'تصميم وتطوير بواسطة Kaabu Technologies',
      'footer.copyright': 'الرابطة الوطنية الأفريقية والسوداء.',

      /* Contact Form */
      'contact.name': 'الاسم الكامل',
      'contact.email': 'البريد الإلكتروني',
      'contact.subject': 'الموضوع',
      'contact.message': 'الرسالة',
      'contact.send': 'إرسال الرسالة',
      'contact.success': 'شكراً لتواصلك! سنرد عليك في أقرب وقت.'
    },

    pt: {
      /* Navigation */
      'home': 'Início', 'nav.home': 'Início',
      'community': 'Comunidade', 'nav.community': 'Comunidade',
      'events': 'Eventos', 'nav.events': 'Eventos',
      'news': 'Notícias', 'nav.news': 'Notícias',
      'about': 'Sobre Nós', 'nav.about': 'Sobre Nós',
      'volunteering': 'Voluntariado e Parcerias', 'nav.volunteering': 'Voluntariado e Parcerias',
      'cuisine': 'Gastronomia', 'nav.cuisine': 'Gastronomia',
      'contact': 'Contacto', 'nav.contact': 'Contacto',
      'more': 'Mais', 'nav.more': 'Mais ▾',
      'youth': 'Centro Juvenil', 'nav.youth': 'Centro Juvenil (Novo)',
      'youthHubNew': 'Centro Juvenil (Novo)',
      'impact': 'Árvore de Impacto', 'nav.impact': 'Árvore de Impacto',
      'photoGallery': 'Galeria de Fotos',
      'legacySheku': 'Legado de Sheku Bayoh',
      'login': 'Iniciar Sessão', 'nav.login': 'Iniciar Sessão',
      'account': 'Conta', 'search': 'Pesquisar',

      /* Ticker */
      'ticker1': 'O Centro Juvenil já está ativo · Candidaturas a mentoria abertas',
      'ticker2': 'Viagem Edimburgo → Lagos · 6 Nov 2027',
      'ticker3': 'Mais de 70 negócios comunitários listados',
      'ticker.1': 'O Centro Juvenil já está ativo · Candidaturas a mentoria abertas',
      'ticker.2': 'Viagem Edimburgo → Lagos · 6 Nov 2027',
      'ticker.3': 'Mais de 70 negócios comunitários listados',

      /* Common Buttons & Actions */
      'btn.join': 'Aderir à NABA',
      'btn.learn': 'Saber mais',
      'btn.events': 'Encontrar evento →',
      'btn.readmore': 'Ler mais',
      'btn.submit': 'Enviar',
      'btn.subscribe': 'Subscrever',
      'btn.gethelp': 'Obter Ajuda Agora',
      'btn.volunteer': 'Ser Voluntário',
      'btn.donate': 'Doar',
      'btn.viewall': 'Ver tudo',
      'btn.back': 'Voltar',
      'btn.close': 'Fechar',
      'btn.search': 'Pesquisar',
      'service': 'Encontrar um Serviço',
      'event': 'Encontrar um Evento',
      'watch': 'Assistir',
      'learnMore': 'Saiba Mais Sobre a NABA',
      'readMore': 'Ler mais →',
      'close': 'Fechar',
      'help': 'Obter Ajuda Agora',
      'searchPlaceholder': 'Pesquisar na NABA — diretório, eventos…',
      'selectLanguage': 'Selecionar Idioma',
      'lang.choose': 'Selecionar Idioma',
      'hub_tagline': 'O Centro Comunitário Africano e Negro da Escócia',

      /* Hero */
      'heroEyebrow': 'O Centro Comunitário Africano e Negro da Escócia',
      'hero.eyebrow': 'O Centro Comunitário Africano e Negro da Escócia',
      'heroTitle': 'A NABA encontra força na nossa comunidade',
      'heroSub': 'A NABA liga comunidades africanas e negras na Escócia a serviços de confiança, vida cultural e entre si.',
      'hero.cta.primary': 'Aderir à NABA',
      'hero.cta.secondary': 'Explorar Serviços',

      /* Mission */
      'missionEyebrow': 'O que é a NABA?',
      'missionTitle': 'Somos uma comunidade empenhada',
      'missionQuote': '"A nossa comunidade é a nossa força."',
      'missionP1': 'A National African & Black Association (NABA) é uma organização sem fins lucrativos na Escócia dedicada a promover equidade, inclusão e acesso a serviços públicos.',
      'missionP2': 'Trabalhamos com instituições para avaliar políticas, ministrar formação antirracista e promover o diálogo com as comunidades.',
      'missionStory': 'Ler a nossa história completa ›',

      /* Stats */
      'statBusinesses': 'Negócios Locais',
      'statProviders': 'Prestadores de Serviços',
      'statOffices': 'Escritórios na Escócia',

      /* Sections */
      'section.mission': 'Nossa Missão',
      'section.events': 'Próximos Eventos',
      'section.news': 'Últimas Notícias',
      'section.impact': 'Impacto Comunitário',
      'section.gallery': 'Galeria',
      'section.youth': 'Centro Juvenil',
      'section.contact': 'Contacto',
      'section.partners': 'Nossos Parceiros',
      'section.volunteer': 'Voluntariado Connosco',
      'section.directory': 'Diretório Comunitário',

      /* Media & YouTube */
      'videoCap': 'Um minuto com a NABA — assista à nossa história',
      'youtubeEyebrow': 'YouTube',
      'youtubeTitle': 'Own the Topic e Diálogos Comunitários',
      'youtubeSub': 'Conversas curtas, entrevistas e novidades da NABA na Escócia.',
      'youtubeWatch': 'Ver no YouTube',
      'yt1Title': 'Own the Topic',
      'yt1Desc': 'Conversas francas sobre identidade, educação e vida pública.',
      'yt2Title': 'Vozes e Histórias',
      'yt2Desc': 'Histórias autênticas de vivências na Escócia.',
      'yt3Title': 'Sessões em Direto',
      'yt3Desc': 'Painéis, perguntas e respostas com a nossa rede.',

      /* Youth Hub & Impact */
      'youthEyebrow': 'Nova Iniciativa',
      'youthTitle': 'O Centro Juvenil está ativo',
      'youthSub': 'Mentoria, formação prática, workshops e financiamento para a nova geração.',
      'exploreYouth': 'Explorar o Centro Juvenil',
      'treeEyebrow': 'Visualização em Direto',
      'treeTitle': 'Veja o nosso impacto crescer',
      'treeSub': 'Cada membro e parceiro adiciona uma folha à Árvore de Impacto da NABA.',
      'treeBtn': 'Ver a Árvore de Impacto',

      /* Directory & Events */
      'dirEyebrow': 'Diretório',
      'dirTitle': 'Encontre o serviço ideal',
      'dirView': 'Ver diretório completo ›',
      'evEyebrow': 'Próximos Eventos',
      'evTitle': 'Eventos em toda a Escócia',
      'evAll': 'Ver todos os eventos ›',
      'evFind': 'Encontrar Evento',
      'evTap': 'Toque num evento para ver detalhes',
      'storiesEyebrow': 'Destaques Recentes',
      'storiesTitle': 'Projetos e iniciativas recentes',

      /* Footer */
      'footer.newsletter': 'Fique informado',
      'footerStay': 'Fique informado',
      'footer.newsletter.sub': 'Semanas culturais, assembleias e novidades diretamente no seu email.',
      'footerStaySub': 'Semanas culturais, assembleias e novidades diretamente no seu email.',
      'footer.newsletter.ph': 'seu@email.com',
      'footer.newsletter.btn': 'Aderir',
      'footerJoin': 'Aderir',
      'footer.explore': 'Explorar',
      'footerExplore': 'Explorar',
      'footer.offices': 'Escritórios',
      'footerOffices': 'Escritórios',
      'footer.connect': 'Ligar',
      'footerConnect': 'Ligar',
      'footer.privacy': 'Privacidade',
      'footer.accessibility': 'Acessibilidade',
      'footer.safeguarding': 'Proteção',
      'footer.stafflogin': 'Login de Pessoal',
      'privacy': 'Privacidade',
      'accessibility': 'Acessibilidade',
      'safeguarding': 'Proteção',
      'staffLogin': 'Login de Pessoal',
      'footer.tagline': 'A nossa comunidade é a nossa força — ligando comunidades africanas e negras na Escócia.',
      'footerTagline': 'A nossa comunidade é a nossa força — ligando comunidades africanas e negras na Escócia.',
      'footer.credit': 'Design web por Kaabu Technologies',
      'footer.copyright': 'Associação Nacional Africana e Negra.',

      /* Contact Form */
      'contact.name': 'Nome Completo',
      'contact.email': 'Endereço de Email',
      'contact.subject': 'Assunto',
      'contact.message': 'Mensagem',
      'contact.send': 'Enviar Mensagem',
      'contact.success': 'Obrigado! Entraremos em contacto brevemente.'
    }
  };

  /* Helper to get current language */
  function getLang() {
    var stored = localStorage.getItem('naba_lang');
    if (stored && SUPPORTED.indexOf(stored) !== -1) return stored;
    var browser = (navigator.language || 'en').slice(0, 2).toLowerCase();
    return SUPPORTED.indexOf(browser) !== -1 ? browser : 'en';
  }

  /* Translate key */
  function t(key, lang) {
    lang = lang || getLang();
    var dict = TRANSLATIONS[lang] || TRANSLATIONS.en;
    if (dict && dict[key]) return dict[key];
    if (TRANSLATIONS.en && TRANSLATIONS.en[key]) return TRANSLATIONS.en[key];
    return key;
  }

  /* Navigation href to key mapping */
  var NAV_MAP = {
    'index.html': 'home',
    'directory.html': 'community',
    'events.html': 'events',
    'news.html': 'news',
    'about.html': 'about',
    'volunteer.html': 'volunteering',
    'cuisine.html': 'cuisine',
    'contact.html': 'contact',
    'youth-hub.html': 'youth',
    'impact.html': 'impact',
    'gallery.html': 'photoGallery',
    'legacy.html': 'legacySheku',
    'login.html': 'login',
    'privacy.html': 'privacy',
    'accessibility.html': 'accessibility',
    'safeguarding.html': 'safeguarding',
    'admin.html': 'staffLogin'
  };

  /* Apply language to document */
  function applyLang(lang) {
    lang = lang || getLang();
    if (SUPPORTED.indexOf(lang) === -1) lang = 'en';
    var isRTL = RTL.indexOf(lang) !== -1;

    document.documentElement.lang = lang;
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';

    /* Tagged elements */
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      var attr = el.getAttribute('data-i18n-attr');
      var val = t(key, lang);
      if (attr) {
        el.setAttribute(attr, val);
      } else if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = val;
      } else if (el.classList.contains('icon-btn') || el.querySelector('svg')) {
        el.setAttribute('aria-label', val);
      } else {
        el.textContent = val;
      }
    });

    /* Tagged placeholders */
    document.querySelectorAll('[data-i18n-ph]').forEach(function (el) {
      el.placeholder = t(el.getAttribute('data-i18n-ph'), lang);
    });

    /* Auto-translate primary nav links */
    document.querySelectorAll('.nav__links a').forEach(function (a) {
      var href = a.getAttribute('href');
      if (href) {
        var base = href.split('#')[0].split('?')[0];
        if (NAV_MAP[base]) {
          a.textContent = t(NAV_MAP[base], lang);
        }
      }
    });

    /* Auto-translate dropdown links */
    document.querySelectorAll('.dropdown a').forEach(function (a) {
      var href = a.getAttribute('href');
      if (href) {
        var base = href.split('#')[0].split('?')[0];
        if (NAV_MAP[base]) {
          a.textContent = t(NAV_MAP[base], lang);
        }
      }
    });

    /* Auto-translate footer links & column headers */
    document.querySelectorAll('.footer-col h4').forEach(function (h) {
      var text = h.textContent.trim().toLowerCase();
      if (text === 'explore' || text.indexOf('explor') !== -1) h.textContent = t('footerExplore', lang);
      else if (text === 'offices' || text.indexOf('bureau') !== -1 || text.indexOf('sede') !== -1) h.textContent = t('footerOffices', lang);
      else if (text === 'connect' || text.indexOf('connect') !== -1 || text.indexOf('ligar') !== -1) h.textContent = t('footerConnect', lang);
    });

    document.querySelectorAll('.footer-col a, .footer-bar a').forEach(function (a) {
      var href = a.getAttribute('href');
      if (href) {
        var base = href.split('#')[0].split('?')[0];
        if (NAV_MAP[base]) {
          a.textContent = t(NAV_MAP[base], lang);
        }
      }
    });

    /* Auto-translate ticker items */
    var tickerSpans = document.querySelectorAll('.ticker span');
    if (tickerSpans.length >= 3) {
      for (var i = 0; i < tickerSpans.length; i++) {
        var tKey = 'ticker' + ((i % 3) + 1);
        tickerSpans[i].textContent = t(tKey, lang);
      }
    }

    /* Auto-translate quick help / search buttons */
    var helpBtn = document.querySelector('.help-now-btn');
    if (helpBtn) {
      var svg = helpBtn.querySelector('svg');
      helpBtn.textContent = ' ' + t('help', lang);
      if (svg) helpBtn.prepend(svg);
    }

    var searchInput = document.getElementById('searchInput') || document.getElementById('siteSearch');
    if (searchInput) {
      searchInput.placeholder = t('searchPlaceholder', lang);
    }

    var langTitle = document.getElementById('langModalTitle');
    if (langTitle) {
      langTitle.textContent = t('selectLanguage', lang);
    }

    /* Update langBtn indicator */
    var langBtn = document.getElementById('langBtn');
    if (langBtn) {
      langBtn.setAttribute('aria-label', 'Language: ' + lang.toUpperCase() + ' — click to change');
      langBtn.setAttribute('data-lang', lang);
    }

    /* Highlight active option in modal */
    document.querySelectorAll('.lang-option, .lang-row').forEach(function (opt) {
      opt.classList.toggle('active', opt.getAttribute('data-lang') === lang);
    });

    /* Dispatch event */
    document.dispatchEvent(new CustomEvent('naba:langChange', { detail: { lang: lang, isRTL: isRTL } }));
  }

  function setLang(lang) {
    if (SUPPORTED.indexOf(lang) === -1) lang = 'en';
    localStorage.setItem('naba_lang', lang);
    applyLang(lang);
  }

  return {
    getLang: getLang,
    setLang: setLang,
    t: t,
    apply: applyLang,
    supported: SUPPORTED
  };
})();
