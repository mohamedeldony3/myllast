"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { useApp } from "@/lib/app-context"

export function RefundClient() {
  const { language } = useApp()

  const content = {
    ar: {
      title: "سياسة الاسترجاع والاستبدال",
      lastUpdated: "آخر تحديث",
      intro: {
        title: "1. المقدمة",
        text: 'في Arabdevs ("نحن" أو "خدماتنا")، نسعى لضمان رضا عملائنا الكامل. توضح سياسة الاسترجاع هذه شروط وأحكام استرداد الأموال والاستبدال للخدمات الرقمية التي نقدمها، بما في ذلك استضافة VPS، الحسابات المتميزة، والخدمات الرقمية الأخرى.',
      },
      digitalServices: {
        title: "2. طبيعة الخدمات الرقمية",
        text: "نظراً لطبيعة الخدمات الرقمية التي نقدمها، فإن معظم منتجاتنا غير قابلة للإرجاع بمجرد التسليم. ومع ذلك، نحن ملتزمون بمعالجة أي مشاكل أو مخاوف قد تواجهها.",
      },
      eligibility: {
        title: "3. شروط الاسترجاع",
        text: "قد تكون مؤهلاً لاسترداد الأموال في الحالات التالية:",
        items: [
          "عدم تسليم الخدمة خلال الإطار الزمني المتفق عليه",
          "عدم عمل الحساب أو الخدمة كما هو موصوف",
          "مشاكل تقنية تمنعك من استخدام الخدمة",
          "رسوم مكررة أو غير مصرح بها",
        ],
      },
      nonRefundable: {
        title: "4. الخدمات غير القابلة للاسترجاع",
        text: "لا يمكن استرداد الأموال للحالات التالية:",
        items: [
          "تغيير رأيك بعد تسليم الخدمة",
          "عدم استخدام الخدمة المشتراة",
          "انتهاك شروط الخدمة الخاصة بنا",
          "المنتجات المخصصة أو البوتات المطورة خصيصاً",
        ],
      },
      vpsHosting: {
        title: "5. استضافة VPS",
        text: "لاستضافة VPS:",
        items: [
          "يمكن طلب استرداد الأموال خلال 7 أيام من الشراء إذا لم يتم استخدام الخدمة",
          "بعد 7 أيام، لا يمكن استرداد الأموال ولكن يمكن خفض التصنيف أو الترقية",
          "يتم احتساب الاستردادات بشكل تناسبي بناءً على الوقت المستخدم",
          "أي رسوم إعداد غير قابلة للاسترداد",
        ],
      },
      premiumAccounts: {
        title: "6. الحسابات المتميزة",
        text: "للحسابات المتميزة (ChatGPT، Heroku، Render، إلخ):",
        items: [
          "يجب الإبلاغ عن مشاكل الحساب خلال 24 ساعة من التسليم",
          "سنحاول أولاً حل المشكلة أو استبدال الحساب",
          "يتم استرداد الأموال فقط إذا لم نتمكن من توفير حساب عامل",
          "بمجرد الوصول إلى الحساب، يعتبر الحساب مستخدماً",
        ],
      },
      process: {
        title: "7. عملية الاسترجاع",
        text: "لطلب استرداد الأموال:",
        items: [
          "اتصل بنا عبر واتساب أو البريد الإلكتروني مع تفاصيل الطلب الخاص بك",
          "قدم سبباً واضحاً لطلب الاسترجاع",
          "قم بتضمين أي لقطات شاشة أو دليل على المشكلة",
          "انتظر الرد خلال 24-48 ساعة",
        ],
      },
      timeline: {
        title: "8. الجدول الزمني للاسترجاع",
        text: "بمجرد الموافقة على الاسترجاع:",
        items: [
          "سيتم معالجة الاستردادات خلال 5-7 أيام عمل",
          "ستتم الاستردادات باستخدام طريقة الدفع الأصلية",
          "قد تستغرق المعالجة المصرفية وقتاً إضافياً",
          "ستتلقى إشعار تأكيد عند معالجة الاسترجاع",
        ],
      },
      exchanges: {
        title: "9. الاستبدالات",
        text: "بدلاً من الاستردادات، نقدم:",
        items: [
          "استبدالات مجانية للحسابات المعيبة",
          "ترقية أو خفض تصنيف خطط الاستضافة",
          "رصيد لخدمات مستقبلية",
          "دعم فني موسع للمشاكل",
        ],
      },
      contact: {
        title: "10. اتصل بنا",
        text: "لطلبات الاسترجاع أو الأسئلة:",
        email: "البريد الإلكتروني",
        whatsapp: "واتساب",
        response: "وقت الاستجابة: 24-48 ساعة",
      },
    },
    en: {
      title: "Refund and Return Policy",
      lastUpdated: "Last updated",
      intro: {
        title: "1. Introduction",
        text: 'At Arabdevs ("we," "our," or "us"), we strive to ensure complete customer satisfaction. This Refund Policy outlines the terms and conditions for refunds and returns for our digital services, including VPS hosting, premium accounts, and other digital products.',
      },
      digitalServices: {
        title: "2. Nature of Digital Services",
        text: "Due to the nature of digital services we provide, most of our products are non-refundable once delivered. However, we are committed to addressing any issues or concerns you may have.",
      },
      eligibility: {
        title: "3. Refund Eligibility",
        text: "You may be eligible for a refund in the following cases:",
        items: [
          "Non-delivery of service within the agreed timeframe",
          "Account or service not working as described",
          "Technical issues preventing service usage",
          "Duplicate or unauthorized charges",
        ],
      },
      nonRefundable: {
        title: "4. Non-Refundable Services",
        text: "No refunds will be provided for:",
        items: [
          "Change of mind after service delivery",
          "Failure to use purchased service",
          "Violation of our Terms of Service",
          "Custom products or specially developed bots",
        ],
      },
      vpsHosting: {
        title: "5. VPS Hosting",
        text: "For VPS hosting:",
        items: [
          "Refund requests can be made within 7 days of purchase if unused",
          "After 7 days, no refunds but downgrades/upgrades available",
          "Refunds are prorated based on time used",
          "Setup fees are non-refundable",
        ],
      },
      premiumAccounts: {
        title: "6. Premium Accounts",
        text: "For premium accounts (ChatGPT, Heroku, Render, etc.):",
        items: [
          "Account issues must be reported within 24 hours of delivery",
          "We will first attempt to resolve or replace the account",
          "Refunds only if we cannot provide a working account",
          "Once accessed, account is considered used",
        ],
      },
      process: {
        title: "7. Refund Process",
        text: "To request a refund:",
        items: [
          "Contact us via WhatsApp or email with your order details",
          "Provide a clear reason for the refund request",
          "Include screenshots or evidence of the issue",
          "Wait for response within 24-48 hours",
        ],
      },
      timeline: {
        title: "8. Refund Timeline",
        text: "Once a refund is approved:",
        items: [
          "Refunds will be processed within 5-7 business days",
          "Refunds will be issued to the original payment method",
          "Bank processing may take additional time",
          "You will receive a confirmation notification",
        ],
      },
      exchanges: {
        title: "9. Exchanges and Alternatives",
        text: "Instead of refunds, we offer:",
        items: [
          "Free replacements for defective accounts",
          "Upgrades or downgrades for hosting plans",
          "Credit towards future services",
          "Extended technical support for issues",
        ],
      },
      contact: {
        title: "10. Contact Us",
        text: "For refund requests or questions:",
        email: "Email",
        whatsapp: "WhatsApp",
        response: "Response time: 24-48 hours",
      },
    },
    ru: {
      title: "Политика возврата и обмена",
      lastUpdated: "Последнее обновление",
      intro: {
        title: "1. Введение",
        text: 'В Arabdevs ("мы", "наши" или "нас") мы стремимся обеспечить полное удовлетворение клиентов. Эта Политика возврата определяет условия возврата средств и обмена для наших цифровых услуг, включая VPS хостинг, премиум аккаунты и другие цифровые продукты.',
      },
      digitalServices: {
        title: "2. Характер цифровых услуг",
        text: "Из-за характера предоставляемых нами цифровых услуг большинство наших продуктов не подлежат возврату после доставки. Однако мы готовы решить любые проблемы или вопросы, которые могут у вас возникнуть.",
      },
      eligibility: {
        title: "3. Право на возврат",
        text: "Вы можете иметь право на возврат средств в следующих случаях:",
        items: [
          "Недоставка услуги в согласованные сроки",
          "Аккаунт или услуга не работает как описано",
          "Технические проблемы, препятствующие использованию",
          "Дублированные или несанкционированные списания",
        ],
      },
      nonRefundable: {
        title: "4. Невозвратные услуги",
        text: "Возврат средств не предоставляется для:",
        items: [
          "Изменение решения после доставки услуги",
          "Неиспользование приобретенной услуги",
          "Нарушение наших Условий обслуживания",
          "Индивидуальные продукты или специально разработанные боты",
        ],
      },
      vpsHosting: {
        title: "5. VPS хостинг",
        text: "Для VPS хостинга:",
        items: [
          "Запросы на возврат можно подать в течение 7 дней с момента покупки, если не использовались",
          "После 7 дней возврат невозможен, но доступны понижение/повышение тарифа",
          "Возврат рассчитывается пропорционально использованному времени",
          "Платежи за настройку не возвращаются",
        ],
      },
      premiumAccounts: {
        title: "6. Премиум аккаунты",
        text: "Для премиум аккаунтов (ChatGPT, Heroku, Render и т.д.):",
        items: [
          "О проблемах с аккаунтом необходимо сообщить в течение 24 часов после доставки",
          "Сначала мы попытаемся решить проблему или заменить аккаунт",
          "Возврат только если мы не можем предоставить рабочий аккаунт",
          "После доступа аккаунт считается использованным",
        ],
      },
      process: {
        title: "7. Процесс возврата",
        text: "Чтобы запросить возврат:",
        items: [
          "Свяжитесь с нами через WhatsApp или email с деталями заказа",
          "Укажите четкую причину запроса на возврат",
          "Приложите скриншоты или доказательства проблемы",
          "Ожидайте ответа в течение 24-48 часов",
        ],
      },
      timeline: {
        title: "8. Сроки возврата",
        text: "После одобрения возврата:",
        items: [
          "Возврат будет обработан в течение 5-7 рабочих дней",
          "Возврат будет произведен на исходный способ оплаты",
          "Банковская обработка может занять дополнительное время",
          "Вы получите уведомление о подтверждении",
        ],
      },
      exchanges: {
        title: "9. Обмен и альтернативы",
        text: "Вместо возврата мы предлагаем:",
        items: [
          "Бесплатная замена дефектных аккаунтов",
          "Повышение или понижение тарифов хостинга",
          "Кредит на будущие услуги",
          "Расширенная техническая поддержка",
        ],
      },
      contact: {
        title: "10. Свяжитесь с нами",
        text: "По запросам на возврат или вопросам:",
        email: "Email",
        whatsapp: "WhatsApp",
        response: "Время ответа: 24-48 часов",
      },
    },
  }

  const t = content[language]

  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight mb-8 pixel-text">{t.title}</h1>

            <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground leading-relaxed">
              <p className="text-sm text-muted-foreground">
                {t.lastUpdated}:{" "}
                {new Date().toLocaleDateString(language === "ar" ? "ar-EG" : language === "en" ? "en-US" : "ru-RU", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>

              <section className="pixel-border p-6 bg-card/50">
                <h2 className="text-2xl font-semibold text-foreground mb-4">{t.intro.title}</h2>
                <p>{t.intro.text}</p>
              </section>

              <section className="pixel-border p-6 bg-card/50">
                <h2 className="text-2xl font-semibold text-foreground mb-4">{t.digitalServices.title}</h2>
                <p>{t.digitalServices.text}</p>
              </section>

              <section className="pixel-border p-6 bg-card/50">
                <h2 className="text-2xl font-semibold text-foreground mb-4">{t.eligibility.title}</h2>
                <p className="mb-4">{t.eligibility.text}</p>
                <ul className="list-disc pl-6 space-y-2">
                  {t.eligibility.items.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </section>

              <section className="pixel-border p-6 bg-card/50">
                <h2 className="text-2xl font-semibold text-foreground mb-4">{t.nonRefundable.title}</h2>
                <p className="mb-4">{t.nonRefundable.text}</p>
                <ul className="list-disc pl-6 space-y-2">
                  {t.nonRefundable.items.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </section>

              <section className="pixel-border p-6 bg-card/50">
                <h2 className="text-2xl font-semibold text-foreground mb-4">{t.vpsHosting.title}</h2>
                <p className="mb-4">{t.vpsHosting.text}</p>
                <ul className="list-disc pl-6 space-y-2">
                  {t.vpsHosting.items.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </section>

              <section className="pixel-border p-6 bg-card/50">
                <h2 className="text-2xl font-semibold text-foreground mb-4">{t.premiumAccounts.title}</h2>
                <p className="mb-4">{t.premiumAccounts.text}</p>
                <ul className="list-disc pl-6 space-y-2">
                  {t.premiumAccounts.items.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </section>

              <section className="pixel-border p-6 bg-card/50">
                <h2 className="text-2xl font-semibold text-foreground mb-4">{t.process.title}</h2>
                <p className="mb-4">{t.process.text}</p>
                <ul className="list-disc pl-6 space-y-2">
                  {t.process.items.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </section>

              <section className="pixel-border p-6 bg-card/50">
                <h2 className="text-2xl font-semibold text-foreground mb-4">{t.timeline.title}</h2>
                <p className="mb-4">{t.timeline.text}</p>
                <ul className="list-disc pl-6 space-y-2">
                  {t.timeline.items.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </section>

              <section className="pixel-border p-6 bg-card/50">
                <h2 className="text-2xl font-semibold text-foreground mb-4">{t.exchanges.title}</h2>
                <p className="mb-4">{t.exchanges.text}</p>
                <ul className="list-disc pl-6 space-y-2">
                  {t.exchanges.items.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </section>

              <section className="pixel-border p-6 bg-card/50 bg-primary/10">
                <h2 className="text-2xl font-semibold text-foreground mb-4">{t.contact.title}</h2>
                <p className="mb-4">{t.contact.text}</p>
                <div className="space-y-2">
                  <p>
                    {t.contact.email}:{" "}
                    <a href="mailto:mohamedeldony3@gmail.com" className="text-primary hover:underline">
                      mohamedeldony3@gmail.com
                    </a>
                  </p>
                  <p>
                    {t.contact.whatsapp}:{" "}
                    <a
                      href="https://wa.me/201061419002"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      +20 106 141 9002
                    </a>
                  </p>
                  <p className="text-sm mt-4">{t.contact.response}</p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
