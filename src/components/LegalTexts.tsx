import React from "react";

export const PrivacyPolicyContent = ({ lang }: { lang: "en" | "es" }) => {
  if (lang === "es") {
    return (
      <>
        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">1. Introducción</h2>
          <p>En Task Goblin Apps, valoramos tu privacidad. Esta política describe cómo recolectamos, usamos y protegemos tu información en nuestras aplicaciones (Task Goblin, Nexo, Floaty) y nuestro sitio web.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">2. Información que recolectamos</h2>
          <p>Nuestras aplicaciones están diseñadas para funcionar localmente con la menor cantidad de datos posible. Solo recolectamos:</p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li><strong>Correo electrónico:</strong> Utilizado exclusivamente para la validación y gestión de tu licencia Pro.</li>
            <li><strong>Datos de pago:</strong> Procesados de forma segura por Mercado Pago y PayPal. Nosotros no almacenamos los números de tus tarjetas ni datos bancarios.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">3. Almacenamiento Local</h2>
          <p>Utilizamos el almacenamiento local (localStorage) en tu navegador y sistema para persistir el estado de tu licencia y preferencias básicas de la aplicación. Estos datos no se comparten con terceros.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">4. Seguridad de los datos</h2>
          <p>Implementamos medidas de seguridad técnicas para proteger tu información contra acceso no autorizado. La comunicación entre nuestras apps y servidores de validación se realiza mediante protocolos cifrados (HTTPS).</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">5. Servicios de terceros</h2>
          <p>Utilizamos Mercado Pago y PayPal para el procesamiento de pagos. Te recomendamos revisar sus políticas de privacidad para entender cómo manejan tus datos financieros.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">6. Tus derechos</h2>
          <p>Tienes derecho a solicitar el acceso, corrección o eliminación de tu correo de nuestra base de datos de licencias en cualquier momento contactualizando a nuestro soporte oficial.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">7. Contacto</h2>
          <p>Si tienes preguntas sobre esta política, puedes contactarnos a través de los canales oficiales de Task Goblin Apps.</p>
        </section>
      </>
    );
  }

  return (
    <>
      <section>
        <h2 className="text-2xl font-semibold text-white mb-4">1. Introduction</h2>
        <p>At Task Goblin Apps, we value your privacy. This policy describes how we collect, use, and protect your information in our applications (Task Goblin, Nexo, Floaty) and our website.</p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-white mb-4">2. Information We Collect</h2>
        <p>Our applications are designed to work locally with as little data as possible. We only collect:</p>
        <ul className="list-disc pl-6 mt-4 space-y-2">
          <li><strong>Email address:</strong> Used exclusively for the validation and management of your Pro license.</li>
          <li><strong>Payment data:</strong> Securely processed by Mercado Pago and PayPal. We do not store your card numbers or bank details.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-white mb-4">3. Local Storage</h2>
        <p>We use local storage (localStorage) in your browser and system to persist your license status and basic application preferences. This data is not shared with third parties.</p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-white mb-4">4. Data Security</h2>
        <p>We implement technical security measures to protect your information against unauthorized access. Communication between our apps and validation servers is handled via encrypted protocols (HTTPS).</p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-white mb-4">5. Third-Party Services</h2>
        <p>We use Mercado Pago and PayPal for payment processing. We recommend reviewing their privacy policies to understand how they handle your financial data.</p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-white mb-4">6. Your Rights</h2>
        <p>You have the right to request access, correction, or deletion of your email from our license database at any time by contacting our official support.</p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-white mb-4">7. Contact</h2>
        <p>If you have questions about this policy, you can contact us through the official Task Goblin Apps channels.</p>
      </section>
    </>
  );
};

export const UserAgreementContent = ({ lang }: { lang: "en" | "es" }) => {
  if (lang === "es") {
    return (
      <>
        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">1. Aceptación de los términos</h2>
          <p>Al descargar, instalar o utilizar cualquier aplicación de Task Goblin Apps (Task Goblin, Nexo, Floaty), aceptas cumplir y estar sujeto a estos términos y condiciones. Si no estás de acuerdo, por favor desinstala el software inmediatamente.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">2. Concesión de la licencia</h2>
          <p>Task Goblin Apps te otorga una licencia limitada, personal, no exclusiva y no transferible para utilizar el software de acuerdo con el plan adquirido (Gratis o Pro).</p>
          <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-400">
            <li><strong>Personal Pro:</strong> Uso ilimitado en dispositivos personales vinculados a tu cuenta.</li>
            <li><strong>Prohibiciones:</strong> Queda estrictamente prohibido descompilar, realizar ingeniería inversa, modificar o redistribuir el software sin autorización previa por escrito.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">3. Propiedad Intelectual</h2>
          <p>Todas las aplicaciones, logotipos, diseños y código fuente son propiedad exclusiva de Daniel Uribe y Task Goblin Apps. El uso del software no otorga ningún derecho de propiedad sobre el mismo.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">4. "Tal cual" y Limitación de responsabilidad</h2>
          <p>El software se entrega "tal cual" (as is), sin garantías de ningún tipo, explícitas o implícitas. Task Goblin Apps no será responsable de ningún daño directo, indirecto o accidental (incluyendo pérdida de datos o interrupción del negocio) que resulte del uso o la incapacidad de usar el software.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">5. Pagos y Reembolsos</h2>
          <p>Los pagos se procesan a través de Mercado Pago y PayPal. Debido a que ofrecemos versiones de prueba funcionales, una vez activada una licencia Pro, no se admiten reembolsos excepto en casos de fallos técnicos graves e irremediables analizados individualmente por nuestro soporte.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">6. Actualizaciones y Soporte</h2>
          <p>Nos reservamos el derecho de modificar el software en cualquier momento para añadir funciones o corregir errores. El acceso a actualizaciones futuras está incluido en la compra de la licencia Pro, sujeto a cambios en el modelo de negocio si fuera necesario.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">7. Ley aplicable</h2>
          <p>Este acuerdo se rige por las leyes vigentes aplicables en el domicilio del desarrollador principal. Cualquier disputa se resolverá en dichas jurisdicciones.</p>
        </section>
      </>
    );
  }

  return (
    <>
      <section>
        <h2 className="text-2xl font-semibold text-white mb-4">1. Acceptance of Terms</h2>
        <p>By downloading, installing, or using any application from Task Goblin Apps (Task Goblin, Nexo, Floaty), you agree to comply with and be bound by these terms and conditions. If you do not agree, please uninstall the software immediately.</p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-white mb-4">2. License Grant</h2>
        <p>Task Goblin Apps grants you a limited, personal, non-exclusive, and non-transferable license to use the software according to the purchased plan (Free or Pro).</p>
        <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-400">
          <li><strong>Personal Pro:</strong> Unlimited use on personal devices linked to your account.</li>
          <li><strong>Prohibitions:</strong> It is strictly prohibited to decompile, reverse engineer, modify, or redistribute the software without prior written authorization.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-white mb-4">3. Intellectual Property</h2>
        <p>All applications, logos, designs, and source code are the exclusive property of Daniel Uribe and Task Goblin Apps. The use of the software does not grant any ownership rights over it.</p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-white mb-4">4. "As Is" and Limitation of Liability</h2>
        <p>The software is delivered "as is," without warranties of any kind, explicit or implicit. Task Goblin Apps shall not be liable for any direct, indirect, or accidental damage (including data loss or business interruption) resulting from the use or inability to use the software.</p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-white mb-4">5. Payments and Refunds</h2>
        <p>Payments are processed through Mercado Pago and PayPal. Since we offer functional trial versions, once a Pro license has been activated, refunds are not allowed except in cases of serious and irreparable technical failures analyzed individually by our support.</p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-white mb-4">6. Updates and Support</h2>
        <p>We reserve the right to modify the software at any time to add features or correct errors. Access to future updates is included with the purchase of the Pro license, subject to changes in the business model if necessary.</p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-white mb-4">7. Applicable Law</h2>
        <p>This agreement is governed by the laws in force applicable in the domicile of the lead developer. Any dispute will be resolved in said jurisdictions.</p>
      </section>
    </>
  );
};
