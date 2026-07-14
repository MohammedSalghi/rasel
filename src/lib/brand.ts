/**
 * Central brand configuration.
 */
export const brand = {
  /** Arabic / primary name. */
  name: "راسل",
  /** English identifier. */
  nameEn: "Rasel",
  /** Full product title. */
  productName: "منصة المحادثات الذكية",
  /** One-line description for SEO / social sharing. */
  description:
    "راسل — منصة موحدة لإدارة محادثات العملاء، الشكاوى، والذكاء الاصطناعي في مكان واحد.",
  /** Copyright line. */
  copyright: "© 2026 راسل — جميع الحقوق محفوظة",

  /** Default demo user shown in the sidebar / header. */
  demoUser: {
    initials: "أ.م",
    fullName: "أحمد محمود",
    role: "مشرف خدمة العملاء",
  },

  /** Default contact / support domain. */
  emailDomain: "rasel.app",
};

export type Brand = typeof brand;
