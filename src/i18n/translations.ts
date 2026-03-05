export type Lang = "en" | "es";

export const translations = {
  en: {
    appName: "Task Goblin",
    videoCardTitle: "Video of the application",
    permissionsCard: {
      title: "Permissions required in the app",
      featuresTitle: "Everything you need, in one app:",
      moreOptionsComing: "More options coming soon.",
      getMoreInfo: "Get more information",
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
    },
    bottomBar: {
      price: "Price",
      promotion: "Promotion",
      viewInMxn: "View price in MXN",
      viewInUsd: "View price in USD",
      downloadMac: "Download for Mac",
      downloadWindows: "Download for Windows",
      obtainLicense: "Obtain license",
      mac: "Mac",
      windows: "Windows",
      appleSilicon: "Apple Silicon (M1/M2/M3)",
      intel: "Intel",
      mobileDownloadNotice:
        "Downloads are not available on mobile. Please use the website on a computer to download the app.",
    },
  },
  es: {
    appName: "Task Goblin",
    videoCardTitle: "Video de la aplicación",
    permissionsCard: {
      title: "Permisos solicitados en la aplicación",
      featuresTitle: "Todo lo que necesitas, en una sola app:",
      moreOptionsComing: "Se agregarán más opciones próximamente.",
      getMoreInfo: "Obtener más información",
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
    },
    bottomBar: {
      price: "Precio",
      promotion: "Promoción",
      viewInMxn: "Ver precio en MXN",
      viewInUsd: "Ver precio en USD",
      downloadMac: "Descargar para Mac",
      downloadWindows: "Descargar para Windows",
      obtainLicense: "Obtener licencia",
      mac: "Mac",
      windows: "Windows",
      appleSilicon: "Apple Silicon (M1/M2/M3)",
      intel: "Intel",
      mobileDownloadNotice:
        "No puedes descargar en móvil. Usa el sitio web en un ordenador para descargar la aplicación.",
    },
  },
} as const;
