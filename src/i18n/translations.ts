export type Lang = "en" | "es";

export const translations = {
  en: {
    appName: "Task Goblin",
    nexoAppName: "Nexo",
    floatyAppName: "Floaty",
    taskGoblinMarketing: "The best app to help you with different tasks and boost your productivity.",
    nexoMarketing: "The best app to help developers master their local environment.",
    floatyMarketing: "The best app to enjoy your movies while you work or use your computer.",
    videoCardTitle: "Video of the application",
    nexoVideoCardTitle: "Application Video",
    floatyVideoCardTitle: "Application Video",
    nexoIntro: "Nexo is the command center for developers. Simplify your local environment, manage projects, master your ports, and share your work in seconds. Designed to boost your productivity and eliminate daily friction.",
    floatyIntro: "Floaty is an app that opens floating windows so you can watch your favorite movies, series or videos while you work or use your computer without needing another monitor or adapting the size of a browser tab.",
    moreAppsTitle: "More Apps",
    permissionsCard: {
      title: "Permissions required in the app",
      featuresTitle: "Everything you need, in one app:",
      moreOptionsComing: "More options coming soon.",
      getMoreInfo: "Get more information",
      getTaskGoblinPro: "Get Pro Access",
    },
    featuresList: [
      "Automatic mouse movement",
      "Schedule WhatsApp messages",
      "Screenshot to Text",
      "Quick close all applications",
      "Scheduled shutdown",
      "Convert PDF to Word",
      "Color extractor (HEX, RGB, HSL)",
      "Drawing and annotations on screen",
      "Image conversion, compression and PDF",
    ],
    modalPermissions: {
      title: "Permissions required in the app",
      permissions: [
        {
          label: "Accessibility",
          purpose:
            'Required for the "Move Mouse" feature to simulate physical mouse movement.',
        },
        {
          label: "Contacts",
          purpose:
            "Used to fetch your contact list so you can easily select a recipient for WhatsApp messages.",
        },
        {
          label: "Screen Recording",
          purpose:
            'Necessary for the "Screenshot to Text" feature to capture screen content for OCR.',
        },
        {
          label: "Notifications",
          purpose:
            "Used to confirm actions like scheduled messages or successful text captures.",
        },
        {
          label: "Automation (WhatsApp)",
          purpose:
            "Allows the app to control WhatsApp to automatically type and send scheduled messages.",
        },
      ],
    },
    modalInfo: {
      title: "TaskGoblin",
      subtitle: "The multitask app that automates the small tasks of your day",
      intro:
        "TaskGoblin is a productivity app for macOS and Windows that brings together useful tools in one place to automate common tasks, save time, and work more efficiently.",
      featuresTitle: "🚀 Main features",
      compatibleWith: "✅ Compatible with",
      compatibleItems: ["✔ macOS (Intel and Apple Silicon)", "✔ Windows"],
      moreOptionsComing: "More options coming soon.",
      features: [
        {
          title: "Automatic mouse movement",
          description:
            "Keep your status active in apps like Microsoft Teams by moving the mouse automatically when you're not using the computer.",
        },
        {
          title: "Schedule WhatsApp messages by date and time",
          description:
            "Send WhatsApp messages on a schedule with exact date and time, ideal for reminders, notices, or repetitive messages without sending them manually.",
        },
        {
          title: "Screenshot to Text",
          description:
            "Get text from any image, video, or part of your screen. Convert any visible text on your screen into editable, copyable text. Select the area you want and TaskGoblin extracts the content automatically.\n\nHow does it work?\n\n• Activate Screenshot to Text.\n• Select with the mouse the screen area that contains the text.\n• TaskGoblin recognizes the content and copies it to the clipboard automatically.",
        },
        {
          title: "Close all applications",
          description:
            "Close all open apps with one click to shut down your computer faster, without doing it one by one.",
        },
        {
          title: "Schedule shutdown",
          description:
            "Schedule automatic shutdown of your computer after a set time. Ideal for leaving processes running without worry.",
        },
        {
          title: "Convert PDF to Word",
          description:
            "Convert PDF files to Word easily for editing without complications.",
        },
        {
          title: "Color extractor",
          description:
            "Get colors from any image and copy them in HEX, RGB or HSL, perfect for design and development.",
        },
        {
          title: "Draw and highlight on screen",
          description:
            "Draw, write text, highlight areas, and add shapes directly on the screen. Ideal for explaining ideas, recording videos, or giving support.",
        },
        {
          title: "Image conversion, compression and PDF",
          description:
            "Convert images to multiple formats, including PDF, and reduce their size without losing quality.",
        },
      ],
    },
    cardTitles: {
      "move-mouse": "Move Mouse",
      "whatsapp-msg": "WhatsApp Msg",
      "screenshot-to-text": "Screenshot to Text",
      "close-all-apps": "Close All Apps",
      "schedule-shutdown": "Schedule Shutdown",
      "convert-pdf-to-word": "Convert PDF to Word",
      "color-extractor": "Color Extractor",
      paint: "Paint",
      "image-converter": "Image & PDF Converter",
      // Nexo Rooms
      "nexo-proyectos": "Projects",
      "nexo-puertos": "Ports",
      "nexo-env": "Environment Variables",
      "nexo-urls": "Custom Domains",
      "nexo-snippets": "Saved Snippets",
      "nexo-compartir": "Share Local Server",
    },
    cardDescriptions: {
      "move-mouse":
        "Keep your status active in apps like Microsoft Teams by moving the mouse automatically when you're not using the computer.",
      "whatsapp-msg":
        "Send WhatsApp messages on a schedule with exact date and time, ideal for reminders, notices, or repetitive messages without sending them manually.",
      "screenshot-to-text":
        "Get text from any image, video, or part of your screen. Convert any visible text on your screen into editable, copyable text. Select the area you want and TaskGoblin extracts the content automatically.",
      "close-all-apps":
        "Close all open apps with one click to shut down your computer faster, without doing it one by one.",
      "schedule-shutdown":
        "Schedule automatic shutdown of your computer after a set time. Ideal for leaving processes running without worry.",
      "convert-pdf-to-word":
        "Convert PDF files to Word easily for editing without complications.",
      "color-extractor":
        "Get colors from any image and copy them in HEX, RGB or HSL, perfect for design and development.",
      paint:
        "Draw, write text, highlight areas, and add shapes directly on the screen. Ideal for explaining ideas, recording videos, or giving support.",
      "image-converter":
        "Convert images to multiple formats, including PDF, and reduce their size without losing quality.",
      // Nexo Rooms
      "nexo-proyectos": "Manage your development projects and open them instantly in your favorite IDE. Set up automatic commands to run on startup and launch multiple services at once with a single click.",
      "nexo-puertos": "View all active ports on your system and detect which ones are in use. Instantly free up occupied ports ('kill') to avoid conflicts and ensure your apps always have a place to run.",
      "nexo-env": "Quickly edit and switch between different .env configurations for your applications. Keep your sensitive data safe and organized.",
      "nexo-urls": "Create friendly and custom URLs for your local services. Replace complex addresses like 'localhost:2310' with easy-to-remember names like 'http://banorte.local', simplifying your daily workflow.",
      "nexo-snippets": "Store frequently used commands or configuration blocks for quick access. Share your best snippets with your team or keep them for your future self.",
      "nexo-compartir": "Share your local servers with other devices on the same network easily. Generate QR codes to open your project on your phone or tablet instantly, ideal for testing mobile design and functionality.",
    },
    bottomBar: {
      price: "Price",
      promotion: "Promotion",
      viewInMxn: "View price in MXN",
      viewInUsd: "View price in USD",
      downloadMac: "Download for Mac",
      downloadWindows: "Download for Windows",
      obtainLicense: "Get Pro Features",
      checkLicense: "Account Details",
      mac: "Mac",
      windows: "Windows",
      appleSilicon: "Apple Silicon (M1/M2/M3)",
      intel: "Intel",
      mobileDownloadNotice:
        "Downloads are not available on mobile. Please use the website on a computer to download the app.",
    },
    downloadModal: {
      macSilicon: "macOS — Apple Silicon",
      macIntel: "macOS — Intel",
      windowsTitle: "Windows",
      compatibilityTitle: "Before downloading, please review the compatibility information",
      securityAlert: "Attention: Your browser might show a security warning when downloading.",
      securityAlertMac: 'Click "Keep anyway" or "Allow download" to continue.',
      securityAlertWin: 'Click "Keep" or "Keep anyway" to allow the download.',
      windowsSmartScreenInfo: 'If the blue "Windows Protected your PC" window appears, click on "More info" and then "Run anyway". This is normal for new applications and Task Goblin is completely safe.',
      showExampleImage: "Show example image",
      hideExampleImage: "Hide example image",
      macPermissionsInfo: "Task Goblin requires 3 permissions to function correctly. Please grant them during the initial setup.",
      macPermissionsTutorial: "View Permission Tutorial",
      tutorialStep1: "Step 1: Click 'Grant Permission' in the app setup.",
      tutorialStep2: "Step 2: Click 'Open System Settings' in the macOS alert.",
      tutorialStep3: "Step 3: Enable the switch for Task Goblin (Rocket icon).",
      closeTutorial: "Close Tutorial",
      safeFile: "The file is safe.",
      compatibilityFor: "Compatibility with",
      tableSystem: "System",
      tableVersion: "Version",
      tableStatus: "Status",
      downloadFor: "Download for",
      acceptTerms: "By downloading you accept our terms of use.",
      statusOk: "Compatible",
      statusWarn: "Not recommended",
      statusPartial: "Partially compatible",
      statusBad: "Not compatible",
      macAppStoreInfo: "To run Task Goblin, you must allow apps from 'App Store and identified developers' in System Settings > Privacy & Security. This is necessary because the app is downloaded directly from our site.",
      macAppStoreAction: "Open Apple Help",
      macAppStoreHelpUrl: "https://support.apple.com/en-us/102445",
    },
    paymentModal: {
      title: "Get Pro Features",
      description: "Enter your email to activate your professional tier.",
      emailLabel: "Email address",
      emailPlaceholder: "you@example.com",
      checkoutButton: "Checkout securely",
      processing: "Processing...",
      successTitle: "Pro Features Activated!",
      successMessage: "Professional features are now linked to your account.",
      emailWarning: "Important: Use this same email address during checkout to ensure your professional tier is correctly linked.",
      errorMessage: "There was an error processing your payment.",
      closeButton: "Close",
      disabledMessage: "Account activations are temporarily disabled while we conduct environment tests. Pro features are currently in free evaluation mode. Come back soon!",
      disabledButton: "Pro Access Paused",
    },
    licensePage: {
      title: "Pro Account Status",
      subtitle: "Enter your email below to sync your professional activation code.",
      emailLabel: "Email address",
      emailPlaceholder: "Account email",
      searchButton: "Sync Account",
      searching: "Syncing...",
      licenseFound: "Account Active!",
      licenseKeyLabel: "Activation Code",
      instructionHeading: "Important Details:",
      instruction1: "Registrable only on ONE device.",
      instruction2: "To register, open the desktop app and go to the Settings section.",
      copyButton: "Copy Code",
      licenseCopied: "Activation code copied!",
      emailCopied: "Email copied to clipboard!",
      errorNotFound: "No professional account found for this email.",
      errorGeneric: "An error occurred while fetching your license. Please try again.",
      backToHome: "Back to Home",
      checkoutSuccessTitle: "Payment Successful!",
      checkoutSuccessSubtitle: "Please confirm your email to activate and view your license.",
      associateButton: "View My License",
    },
    chat: {
      greeting: "Hi! How can I help you today?",
      selectApp: "Select one of our apps or see general info:",
      back: "Back",
      home: "Home",
      generalQuestions: "General Questions",
      licenseQuestion: "How do I get Pro features?",
      licenseResponse: "You can unlock professional features in the menu below, using the Lock icon.",
      consultQuestion: "How do I check my account status?",
      consultResponse: "You can check your activation status in the menu below, using the Search icon (magnifying glass).",
      priceQuestion: "How much does each app cost?",
      priceResponse: "Task Goblin: $249 MXN / $13 USD. Nexo: $149 MXN / $8 USD. Floaty: $99 MXN / $5 USD.",
      downloadQuestion: "Where do I download it?",
      downloadResponse: "Download links are in the bottom menu (Mac and Windows icons). Click them to open a modal where you'll find the download button after the system compatibility info.",
      trialQuestion: "How long are the pro features active?",
      trialResponse: "All our apps offer pro feature access for 48 hours for you to test without commitment.",
      nexoDetail: "Developer command center: projects, port monitoring, project sharing, custom domains, command snippets, and .env management.",
      taskGoblinDetail: "Task automation: mouse movement, scheduled messages, text capture, close all apps, scheduled shutdown, PDF to Word conversion, color extractor, drawing, and image conversion.",
      floatyDetail: "Floaty is an app that opens floating windows so you can watch your favorite movies, series or videos while you work or use your computer without needing another monitor or adapting the size of a browser tab.",
      contact: "Contact",
      contactResponse: "You can contact us via email at: task.goblin.apps@gmail.com. We'll be happy to help you.",
      emailSupport: "Email Support",
    },
    loading: "Loading...",
  },
  es: {
    appName: "Task Goblin",
    nexoAppName: "Nexo",
    floatyAppName: "Floaty",
    taskGoblinMarketing: "La mejor app para ayudarte en distintas tareas y potenciar tu productividad.",
    nexoMarketing: "La mejor app para ayudar a desarrolladores a dominar su entorno local.",
    floatyMarketing: "La mejor app para disfrutar de tus películas mientras trabajas o usas tu computadora.",
    videoCardTitle: "Video de la aplicación",
    nexoVideoCardTitle: "Video de la aplicación",
    floatyVideoCardTitle: "Video de la aplicación",
    nexoIntro: "Nexo es el centro de mando para desarrolladores. Simplifica tu entorno local, gestiona proyectos, domina tus puertos y comparte tu trabajo en segundos. Diseñado para potenciar tu productividad y eliminar las fricciones del día a día.",
    floatyIntro: "Es una app que abre ventanas flotantes para poder ver tus películas, series o videos favoritos mientras trabajas o usas tu computadora sin necesidad de tener otro monitor o adaptar el tamaño de una pestaña del navegador.",
    moreAppsTitle: "Más Apps",
    permissionsCard: {
      title: "Permisos solicitados en la aplicación",
      featuresTitle: "Todo lo que necesitas, en una sola app:",
      moreOptionsComing: "Se agregarán más opciones próximamente.",
      getMoreInfo: "Obtener más información",
      getTaskGoblinPro: "Obtener Acceso Pro",
    },
    featuresList: [
      "Movimiento automático del mouse",
      "Programar mensajes de WhatsApp",
      "Screenshot to Text",
      "Cierre rápido de todas las aplicaciones",
      "Apagado programado",
      "Conversión de PDF a Word",
      "Extractor de colores (HEX, RGB, HSL)",
      "Dibujo y anotaciones en pantalla",
      "Conversión y compresión de imágenes y PDF",
    ],
    modalPermissions: {
      title: "Permisos solicitados en la aplicación",
      permissions: [
        {
          label: "Accesibilidad",
          purpose:
            'Necesaria para la función "Mover mouse" y simular el movimiento físico del ratón.',
        },
        {
          label: "Contactos",
          purpose:
            "Se usa para obtener tu lista de contactos y poder elegir fácilmente un destinatario para mensajes de WhatsApp.",
        },
        {
          label: "Grabación de pantalla",
          purpose:
            'Necesaria para la función "Screenshot to Text" y capturar el contenido de la pantalla para OCR.',
        },
        {
          label: "Notificaciones",
          purpose:
            "Se usan para confirmar acciones como mensajes programados o capturas de texto exitosas.",
        },
        {
          label: "Automatización (WhatsApp)",
          purpose:
            "Permite que la app controle WhatsApp para escribir y enviar mensajes programados automáticamente.",
        },
      ],
    },
    modalInfo: {
      title: "TaskGoblin",
      subtitle:
        "La app multitarea que automatiza las pequeñas tareas de tu día a día",
      intro:
        "TaskGoblin es una aplicación de productividad para macOS y Windows que reúne en un solo lugar herramientas útiles para automatizar tareas comunes, ahorrar tiempo y trabajar de forma más eficiente.",
      featuresTitle: "🚀 Funciones principales",
      compatibleWith: "✅ Compatible con",
      compatibleItems: ["✔ macOS (Intel y Apple Silicon)", "✔ Windows"],
      moreOptionsComing: "Se agregarán más opciones próximamente.",
      features: [
        {
          title: "Movimiento automático del mouse",
          description:
            "Mantén tu estado activo en aplicaciones como Microsoft Teams moviendo el mouse de forma automática cuando no estás usando la computadora.",
        },
        {
          title: "Programar mensajes de WhatsApp por fecha y hora",
          description:
            "Envía mensajes de WhatsApp de forma programada indicando fecha y hora exacta, ideal para recordatorios, avisos o mensajes repetitivos sin tener que enviarlos manualmente.",
        },
        {
          title: "Screenshot to Text",
          description:
            "Obtén texto de cualquier imagen, video o parte de tu pantalla. Convierte cualquier texto visible en tu pantalla en texto editable y copiable. Selecciona el área que quieras y TaskGoblin extrae el contenido automáticamente.\n\n¿Cómo funciona?\n\n• Activa Screenshot to Text.\n• Selecciona con el mouse el área de la pantalla que contiene el texto.\n• TaskGoblin reconoce el contenido y lo copia automáticamente al portapapeles.",
        },
        {
          title: "Cerrar todas las aplicaciones",
          description:
            "Cierra todas las apps abiertas con un solo clic para apagar tu computadora más rápido, sin hacerlo una por una.",
        },
        {
          title: "Programar apagado",
          description:
            "Programa el apagado automático de tu computadora después de un tiempo determinado. Ideal para dejar procesos corriendo sin preocuparte.",
        },
        {
          title: "Convertir PDF a Word",
          description:
            "Convierte archivos PDF a Word fácilmente para editarlos sin complicaciones.",
        },
        {
          title: "Extractor de color",
          description:
            "Obtén los colores de cualquier imagen y cópialos en HEX, RGB o HSL, perfecto para diseño y desarrollo.",
        },
        {
          title: "Dibujar y resaltar en pantalla",
          description:
            "Dibuja, escribe texto, resalta zonas y agrega figuras directamente sobre la pantalla. Ideal para explicar ideas, grabar videos o dar soporte.",
        },
        {
          title: "Conversión y compresión de imágenes y PDF",
          description:
            "Convierte imágenes a múltiples formatos, incluyendo PDF, y reduce su peso sin perder calidad.",
        },
      ],
    },
    cardTitles: {
      "move-mouse": "Mover mouse",
      "whatsapp-msg": "Mensaje WhatsApp",
      "screenshot-to-text": "Screenshot to Text",
      "close-all-apps": "Cerrar todas las apps",
      "schedule-shutdown": "Apagado programado",
      "convert-pdf-to-word": "Convertir PDF a Word",
      "color-extractor": "Extractor de color",
      paint: "Paint",
      "image-converter": "Conversor de imágenes y PDF",
      // Nexo Rooms
      "nexo-proyectos": "Proyectos",
      "nexo-puertos": "Puertos",
      "nexo-env": "Variables de Entorno",
      "nexo-urls": "Dominios y URLs",
      "nexo-snippets": "Snippets de Código",
      "nexo-compartir": "Compartir en Red",
    },
    cardDescriptions: {
      "move-mouse":
        "Mantén tu estado activo en aplicaciones como Microsoft Teams moviendo el mouse de forma automática cuando no estás usando la computadora.",
      "whatsapp-msg":
        "Envía mensajes de WhatsApp de forma programada indicando fecha y hora exacta, ideal para recordatorios, avisos o mensajes repetitivos sin tener que enviarlos manualmente.",
      "screenshot-to-text":
        "Obtén texto de cualquier imagen, video o parte de tu pantalla. Convierte cualquier texto visible en tu pantalla en texto editable y copiable. Selecciona el área que quieras y TaskGoblin extrae el contenido automáticamente.",
      "close-all-apps":
        "Cierra todas las apps abiertas con un solo clic para apagar tu computadora más rápido, sin hacerlo una por una.",
      "schedule-shutdown":
        "Programa el apagado automático de tu computadora después de un tiempo determinado. Ideal para dejar procesos corriendo sin preocuparte.",
      "convert-pdf-to-word":
        "Convierte archivos PDF a Word fácilmente para editarlos sin complicaciones.",
      "color-extractor":
        "Obtén los colores de cualquier imagen y cópialos en HEX, RGB o HSL, perfecto para diseño y desarrollo.",
      paint:
        "Dibuja, escribe texto, resalta zonas y agrega figuras directamente sobre la pantalla. Ideal para explicar ideas, grabar videos o dar soporte.",
      "image-converter":
        "Convierte imágenes a múltiples formatos, incluyendo PDF, y reduce su peso sin perder calidad.",
      // Nexo Rooms
      "nexo-proyectos": "Gestiona tus proyectos de desarrollo y ábrelos instantáneamente en tu IDE favorito. Configura comandos automáticos para que se ejecuten al abrir el proyecto y lanza múltiples servicios a la vez con un solo clic.",
      "nexo-puertos": "Visualiza todos los puertos activos en tu sistema y detecta cuáles están en uso. Libera puertos ocupados ('kill') de forma instantánea para evitar conflictos y asegurar que tus aplicaciones siempre tengan donde correr.",
      "nexo-env": "Edita y cambia rápidamente entre diferentes configuraciones de .env para tus aplicaciones. Mantén tus datos sensibles seguros y organizados.",
      "nexo-urls": "Crea URLs amigables y personalizadas para tus servicios locales. Sustituye direcciones complejas como 'localhost:2310' por nombres fáciles de recordar como 'http://banorte.local', simplificando tu flujo de trabajo diario.",
      "nexo-snippets": "Guarda comandos o bloques de configuración usados con frecuencia para un acceso rápido. Comparte tus mejores fragmentos con tu equipo.",
      "nexo-compartir": "Comparte tus servidores locales con otros dispositivos en la misma red de forma sencilla. Genera códigos QR para abrir tu proyecto en tu celular o tablet al instante, ideal para pruebas de diseño y funcionalidad móvil.",
    },
    bottomBar: {
      price: "Precio",
      promotion: "Promoción",
      viewInMxn: "Ver precio en MXN",
      viewInUsd: "Ver precio en USD",
      downloadMac: "Descargar para Mac",
      downloadWindows: "Descargar para Windows",
      obtainLicense: "Obtener Funciones Pro",
      checkLicense: "Detalles de Cuenta",
      mac: "Mac",
      windows: "Windows",
      appleSilicon: "Apple Silicon (M1/M2/M3)",
      intel: "Intel",
      mobileDownloadNotice:
        "No puedes descargar en móvil. Usa el sitio web en un ordenador para descargar la aplicación.",
    },
    downloadModal: {
      macSilicon: "macOS — Apple Silicon",
      macIntel: "macOS — Intel",
      windowsTitle: "Windows",
      compatibilityTitle: "Antes de descargar, revisa la información de compatibilidad",
      securityAlert: "Atención: Es posible que tu navegador muestre una advertencia de seguridad al descargar.",
      securityAlertMac: 'Haz clic en "Mantener de todas formas" o "Permitir descarga" para continuar.',
      securityAlertWin: 'Haz clic en "Conservar" o "Mantener de todas formas" para permitir la descarga.',
      windowsSmartScreenInfo: 'Si aparece la ventana azul "Windows protegió su PC", haz clic en "Más información" y luego en "Ejecutar de todas formas". Esto es normal en aplicaciones nuevas y Task Goblin es completamente seguro.',
      showExampleImage: "Mostrar imagen de ejemplo",
      hideExampleImage: "Ocultar imagen de ejemplo",
      macPermissionsInfo: "Task Goblin requiere 3 permisos para funcionar correctamente. Por favor, concédelos durante la configuración inicial.",
      macPermissionsTutorial: "Ver Tutorial de Permisos",
      tutorialStep1: "Paso 1: Haz clic en 'Otorgar Permiso' en la configuración.",
      tutorialStep2: "Paso 2: Haz clic en 'Abrir configuración de sistema' en la alerta de macOS.",
      tutorialStep3: "Paso 3: Activa el interruptor de Task Goblin (Icono del cohete).",
      closeTutorial: "Cerrar Tutorial",
      safeFile: "El archivo es seguro.",
      compatibilityFor: "Compatibilidad con",
      tableSystem: "Sistema",
      tableVersion: "Versión",
      tableStatus: "Estado",
      downloadFor: "Descargar para",
      acceptTerms: "Al descargar aceptas nuestros términos de uso.",
      statusOk: "Compatible",
      statusWarn: "No recomendado",
      statusPartial: "Compatibilidad parcial",
      statusBad: "No compatible",
      macAppStoreInfo: "Para ejecutar Task Goblin, debes permitir aplicaciones de 'App Store y desarrolladores identificados' en Ajustes del Sistema > Privacidad y seguridad. Esto es necesario ya que la aplicación se descarga directamente desde nuestro sitio.",
      macAppStoreAction: "Ver ayuda de Apple",
      macAppStoreHelpUrl: "https://support.apple.com/es-es/102445",
    },
    paymentModal: {
      title: "Desbloquear Funciones Pro",
      description: "Ingresa tu correo electrónico para activar tu nivel profesional.",
      emailLabel: "Correo electrónico",
      emailPlaceholder: "tu@ejemplo.com",
      checkoutButton: "Pagar de forma segura",
      processing: "Procesando...",
      successTitle: "¡Funciones Pro Activadas!",
      successMessage: "Las funciones profesionales ahora están vinculadas a tu cuenta.",
      emailWarning: "Importante: Debes usar este mismo correo durante el proceso para asegurar que tu nivel profesional se vincule correctamente.",
      errorMessage: "Hubo un error al procesar tu pago.",
      closeButton: "Cerrar",
      disabledMessage: "Las activaciones de cuentas están deshabilitadas temporalmente mientras realizamos pruebas de entorno. Las funciones pro están en modo de evaluación gratuita. ¡Vuelve pronto!",
      disabledButton: "Acceso Pro Pausado",
    },
    licensePage: {
      title: "Estado de Cuenta Pro",
      subtitle: "Ingresa tu correo a continuación para sincronizar tu código de activación profesional.",
      emailLabel: "Correo electrónico",
      emailPlaceholder: "Correo de la cuenta",
      searchButton: "Sincronizar Cuenta",
      searching: "Sincronizando...",
      licenseFound: "¡Cuenta Activa!",
      licenseKeyLabel: "Código de Activación",
      instructionHeading: "Detalles importantes:",
      instruction1: "Registrable solo en UN dispositivo.",
      instruction2: "Para registrarla, abre la app de escritorio y ve a la sección de Configuración.",
      copyButton: "Copiar Código",
      licenseCopied: "¡Código copiado al portapapeles!",
      emailCopied: "¡Correo copiado al portapapeles!",
      errorNotFound: "No se encontró ninguna cuenta profesional para este correo.",
      errorGeneric: "Ocurrió un error al buscar tu licencia. Intenta nuevamente.",
      backToHome: "Volver al Inicio",
      checkoutSuccessTitle: "¡Pago Exitoso!",
      checkoutSuccessSubtitle: "Por favor, confirma tu correo electrónico para activar y ver tu licencia.",
      associateButton: "Ver Mi Licencia",
    },
    chat: {
      greeting: "¡Hola! ¿En qué puedo ayudarte hoy?",
      selectApp: "Selecciona una de nuestras apps o consulta dudas generales:",
      back: "Volver",
      home: "Inicio",
      generalQuestions: "Dudas Generales",
      licenseQuestion: "¿Cómo obtengo las funciones Pro?",
      licenseResponse: "Puedes desbloquear las funciones profesionales en el menú de abajo, usando el icono de candado.",
      consultQuestion: "¿Cómo consulto mi estado de cuenta?",
      consultResponse: "Puedes consultar tu estado de activación en el menú de abajo, usando el icono de Búsqueda (lupa).",
      priceQuestion: "¿Cuánto cuesta cada app?",
      priceResponse: "Task Goblin: $249 MXN / $13 USD. Nexo: $149 MXN / $8 USD. Floaty: $99 MXN / $5 USD.",
      downloadQuestion: "¿Dónde la descargo?",
      downloadResponse: "Los enlaces de descarga están en el menú de abajo (iconos de Mac y Windows). Al abrirlos verás un modal con el botón de descarga después de la información de compatibilidad.",
      trialQuestion: "¿Cuánto tiempo están activas las funciones pro?",
      trialResponse: "Todas nuestras apps ofrecen acceso a funciones pro por 48 horas para que las pruebes sin compromiso.",
      nexoDetail: "Centro de mando para desarrolladores: mis proyectos, monitor de puertos, compartir proyecto, URL amigables, snippets de comandos y gestión de .env.",
      taskGoblinDetail: "Automatización de tareas: mover mouse, programar mensajes, capturar texto, cerrar todas las apps, programar apagado, convertir pdf a word, extractor de color, dibujar y convertir imágenes.",
      floatyDetail: "Es una app que abre ventanas flotantes para poder ver tus películas, series o videos favoritos mientras trabajas o usas tu computadora sin necesidad de tener otro monitor o adaptar el tamaño de una pestaña del navegador.",
      contact: "Contacto",
      contactResponse: "Puedes contactarnos vía email en: task.goblin.apps@gmail.com. Estaremos encantados de ayudarte.",
      emailSupport: "Enviar Email",
    },
    loading: "Cargando...",
  },
} as const;
