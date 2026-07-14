export type ChannelKey =
  | "whatsapp"
  | "web"
  | "email"
  | "app"
  | "phone"
  | "instagram"
  | "messenger"
  | "twitter"
  | "telegram";
export type Priority = "high" | "medium" | "low";
export type ConvStatus = "active" | "waiting" | "resolved" | "ai";

export interface Conversation {
  id: string;
  ref: string;
  customer: string;
  initials: string;
  channel: ChannelKey;
  priority: Priority;
  status: ConvStatus;
  tag: string;
  preview: string;
  time: string;
  agent: string;
  unread?: number;
}

export const channelLabels: Record<ChannelKey, string> = {
  whatsapp: "واتساب",
  web: "الموقع",
  email: "البريد",
  app: "التطبيق",
  phone: "الهاتف",
  instagram: "إنستغرام",
  messenger: "ماسنجر",
  twitter: "منصة X",
  telegram: "تيليغرام",
};

export const priorityLabels: Record<Priority, string> = {
  high: "عالية",
  medium: "متوسطة",
  low: "منخفضة",
};

export const statusLabels: Record<ConvStatus, string> = {
  active: "نشطة",
  waiting: "في الانتظار",
  resolved: "محلولة",
  ai: "ذكاء اصطناعي",
};

export const conversations: Conversation[] = [
  {
    id: "1",
    ref: "AN-88219",
    customer: "سارة الترهوني",
    initials: "س ت",
    channel: "whatsapp",
    priority: "high",
    status: "active",
    tag: "بطاقات",
    preview: "أواجه مشكلة في تفعيل البطاقة الائتمانية الجديدة...",
    time: "14:20",
    agent: "أحمد بن حليم",
    unread: 2,
  },
  {
    id: "2",
    ref: "AN-88220",
    customer: "محمد صلغى",
    initials: "م ص",
    channel: "web",
    priority: "medium",
    status: "active",
    tag: "حسابات",
    preview: "كيف يمكنني تحديث بيانات الهوية الوطنية؟",
    time: "14:15",
    agent: "أحمد بن حليم",
  },
  {
    id: "3",
    ref: "AN-88218",
    customer: "نورة الفيتوري",
    initials: "ن ف",
    channel: "email",
    priority: "high",
    status: "waiting",
    tag: "تحويلات",
    preview: "تم رفض عملية التحويل الدولي رقم #TR-9021...",
    time: "13:50",
    agent: "غير معين",
  },
  {
    id: "4",
    ref: "AN-88217",
    customer: "عبدالله المقريف",
    initials: "ع م",
    channel: "app",
    priority: "medium",
    status: "ai",
    tag: "استفسار",
    preview: "ما هي أسعار الفائدة على ودائع التوفير الحالية؟",
    time: "13:12",
    agent: "المساعد الذكي",
  },
  {
    id: "5",
    ref: "AN-88215",
    customer: "فاطمة الورفلي",
    initials: "ف و",
    channel: "whatsapp",
    priority: "low",
    status: "waiting",
    tag: "شكوى",
    preview: "لم أستلم الرسائل النصية للعمليات منذ يومين.",
    time: "12:40",
    agent: "غير معين",
  },
  {
    id: "6",
    ref: "AN-88210",
    customer: "خالد الزنتاني",
    initials: "خ ز",
    channel: "phone",
    priority: "medium",
    status: "resolved",
    tag: "قروض",
    preview: "شكراً على المساعدة، تم حل المشكلة.",
    time: "أمس",
    agent: "منى المسلاتي",
  },
  {
    id: "7",
    ref: "AN-88208",
    customer: "ريم المصراتي",
    initials: "ر م",
    channel: "web",
    priority: "high",
    status: "active",
    tag: "احتيال",
    preview: "لاحظت عمليات مشبوهة على حسابي، أرجو التدخل فوراً.",
    time: "11:20",
    agent: "أحمد بن حليم",
    unread: 5,
  },
  {
    id: "8",
    ref: "AN-88205",
    customer: "يوسف القمودي",
    initials: "ي ق",
    channel: "email",
    priority: "low",
    status: "resolved",
    tag: "معلومات",
    preview: "شكراً لكم.",
    time: "أمس",
    agent: "منى المسلاتي",
  },
];

// Additional social-media conversations
conversations.push(
  {
    id: "9",
    ref: "AN-88230",
    customer: "هدى الجبالي",
    initials: "ه ج",
    channel: "instagram",
    priority: "medium",
    status: "active",
    tag: "بطاقات",
    preview: "شفت إعلانكم بالإنستا عن البطاقة الذهبية، كيف أطلبها؟",
    time: "14:32",
    agent: "غير معين",
    unread: 1,
  },
  {
    id: "10",
    ref: "AN-88231",
    customer: "طارق العبيدي",
    initials: "ط ع",
    channel: "messenger",
    priority: "low",
    status: "ai",
    tag: "استفسار",
    preview: "هل الفروع مفتوحة يوم الجمعة؟",
    time: "14:10",
    agent: "المساعد الذكي",
  },
  {
    id: "11",
    ref: "AN-88232",
    customer: "منال بن سعود",
    initials: "م س",
    channel: "twitter",
    priority: "high",
    status: "waiting",
    tag: "شكوى عامة",
    preview: "تغريدة عامة تشتكي من تعطل الصراف في تاجوراء.",
    time: "13:45",
    agent: "غير معين",
    unread: 3,
  },
  {
    id: "12",
    ref: "AN-88233",
    customer: "زياد الفرجاني",
    initials: "ز ف",
    channel: "telegram",
    priority: "medium",
    status: "active",
    tag: "تحويلات",
    preview: "أحتاج تأكيد استلام حوالة دولية.",
    time: "13:22",
    agent: "منى المسلاتي",
  },
);

export interface Message {
  id: string;
  role: "customer" | "agent" | "note" | "ai";
  text: string;
  time: string;
  confidence?: number;
}

export const activeMessages: Message[] = [
  {
    id: "m1",
    role: "customer",
    text: "السلام عليكم، أحاول تفعيل بطاقتي الجديدة من التطبيق ولكن تظهر لي رسالة خطأ «فشل في التحقق». هل يمكنك مساعدتي؟",
    time: "14:20",
  },
  {
    id: "m2",
    role: "agent",
    text: "وعليكم السلام يا سارة. يسعدني مساعدتك. هل يمكنك تزويدي بآخر أربعة أرقام من البطاقة التي تحاولين تفعيلها؟",
    time: "14:22",
  },
  {
    id: "m3",
    role: "customer",
    text: "بالطبع، الأرقام هي 4821.",
    time: "14:23",
  },
  {
    id: "m4",
    role: "note",
    text: "تم التحقق من سجل البطاقة — نشطة في النظام الأساسي ولكن يبدو أن هناك مشكلة في الربط مع واجهة التطبيق.",
    time: "14:24",
  },
  {
    id: "m5",
    role: "ai",
    text: "قمت بمراجعة الحساب. يبدو أن التطبيق يحتاج إلى تحديث لآخر إصدار حتى يتم تفعيل البطاقة بنجاح. هل قمتِ بتحديث التطبيق مؤخراً؟",
    time: "14:25",
    confidence: 94,
  },
];

export interface Customer {
  id: string;
  name: string;
  segment: "بلاتيني" | "ذهبي" | "فضي" | "عادي";
  phone: string;
  city: string;
  since: string;
  conversations: number;
  complaints: number;
  satisfaction: number;
}

export const customers: Customer[] = [
  { id: "c1", name: "سارة الترهوني", segment: "بلاتيني", phone: "+218 50 123 4567", city: "طرابلس", since: "2019", conversations: 42, complaints: 3, satisfaction: 4.8 },
  { id: "c2", name: "محمد صلغى", segment: "ذهبي", phone: "+218 55 987 6543", city: "بنغازي", since: "2021", conversations: 18, complaints: 1, satisfaction: 4.6 },
  { id: "c3", name: "نورة الفيتوري", segment: "بلاتيني", phone: "+218 54 222 1111", city: "مصراتة", since: "2017", conversations: 65, complaints: 5, satisfaction: 4.4 },
  { id: "c4", name: "عبدالله المقريف", segment: "فضي", phone: "+218 56 333 4455", city: "طرابلس", since: "2022", conversations: 8, complaints: 0, satisfaction: 4.9 },
  { id: "c5", name: "فاطمة الورفلي", segment: "ذهبي", phone: "+218 53 777 8899", city: "الزاوية", since: "2020", conversations: 24, complaints: 2, satisfaction: 4.5 },
  { id: "c6", name: "خالد الزنتاني", segment: "عادي", phone: "+218 50 111 2233", city: "المدينة", since: "2023", conversations: 5, complaints: 0, satisfaction: 4.7 },
  { id: "c7", name: "ريم المصراتي", segment: "بلاتيني", phone: "+218 55 444 6677", city: "طرابلس", since: "2018", conversations: 51, complaints: 4, satisfaction: 4.3 },
];

export interface Complaint {
  id: string;
  ref: string;
  customer: string;
  subject: string;
  category: string;
  priority: Priority;
  status: "مفتوحة" | "قيد المعالجة" | "بانتظار العميل" | "محلولة" | "مغلقة";
  agent: string;
  createdAt: string;
  sla: string;
}

export const complaints: Complaint[] = [
  { id: "co1", ref: "CMP-4421", customer: "ريم المصراتي", subject: "عمليات مشبوهة على البطاقة", category: "احتيال", priority: "high", status: "قيد المعالجة", agent: "أحمد بن حليم", createdAt: "اليوم 11:20", sla: "أقل من ساعة" },
  { id: "co2", ref: "CMP-4419", customer: "نورة الفيتوري", subject: "رفض تحويل دولي بدون سبب", category: "تحويلات", priority: "high", status: "مفتوحة", agent: "غير معين", createdAt: "اليوم 09:12", sla: "متبقي 3 ساعات" },
  { id: "co3", ref: "CMP-4415", customer: "فاطمة الورفلي", subject: "لم أستلم رسائل تنبيه العمليات", category: "تقني", priority: "medium", status: "بانتظار العميل", agent: "منى المسلاتي", createdAt: "أمس", sla: "متبقي يوم" },
  { id: "co4", ref: "CMP-4410", customer: "خالد الزنتاني", subject: "تأخر في صرف قرض معتمد", category: "قروض", priority: "medium", status: "محلولة", agent: "سعد البرغثي", createdAt: "قبل 3 أيام", sla: "تم" },
  { id: "co5", ref: "CMP-4402", customer: "يوسف القمودي", subject: "خطأ في كشف الحساب الشهري", category: "حسابات", priority: "low", status: "مغلقة", agent: "منى المسلاتي", createdAt: "الأسبوع الماضي", sla: "تم" },
  { id: "co6", ref: "CMP-4400", customer: "عبدالله المقريف", subject: "استفسار عن رسوم غير مبررة", category: "رسوم", priority: "medium", status: "قيد المعالجة", agent: "أحمد بن حليم", createdAt: "قبل يومين", sla: "متبقي 5 ساعات" },
];

export interface StaffUser {
  id: string;
  name: string;
  email: string;
  role: "مدير النظام" | "مشرف" | "موظف خدمة" | "محلل بيانات";
  department: string;
  status: "متصل" | "مشغول" | "غير متصل";
  lastActive: string;
}

export const staffUsers: StaffUser[] = [
  { id: "u1", name: "أحمد بن حليم", email: "a.mahmoud@alnouran.ly", role: "مشرف", department: "خدمة الأفراد", status: "متصل", lastActive: "الآن" },
  { id: "u2", name: "منى المسلاتي", email: "m.otaibi@alnouran.ly", role: "موظف خدمة", department: "خدمة الأفراد", status: "متصل", lastActive: "الآن" },
  { id: "u3", name: "سعد البرغثي", email: "s.ghamdi@alnouran.ly", role: "موظف خدمة", department: "القروض", status: "مشغول", lastActive: "منذ 5 دقائق" },
  { id: "u4", name: "هند الأوجلي", email: "h.qurashi@alnouran.ly", role: "محلل بيانات", department: "الجودة", status: "غير متصل", lastActive: "منذ ساعة" },
  { id: "u5", name: "فيصل الشيباني", email: "f.najjar@alnouran.ly", role: "مدير النظام", department: "تقنية المعلومات", status: "متصل", lastActive: "الآن" },
  { id: "u6", name: "ليلى الترهوني", email: "l.shehri@alnouran.ly", role: "موظف خدمة", department: "الشركات", status: "متصل", lastActive: "الآن" },
];

export interface Article {
  id: string;
  title: string;
  category: string;
  views: number;
  updated: string;
  status: "منشور" | "مسودة" | "قيد المراجعة";
}

export const articles: Article[] = [
  { id: "a1", title: "خطوات تفعيل البطاقة الائتمانية عبر التطبيق", category: "البطاقات", views: 3421, updated: "منذ يومين", status: "منشور" },
  { id: "a2", title: "متطلبات فتح حساب توفير للمواطنين", category: "الحسابات", views: 2189, updated: "منذ أسبوع", status: "منشور" },
  { id: "a3", title: "سياسة إجراء التحويلات الدولية والرسوم", category: "التحويلات", views: 1876, updated: "منذ 3 أيام", status: "منشور" },
  { id: "a4", title: "دليل حماية الحساب من عمليات الاحتيال", category: "الأمان", views: 4502, updated: "أمس", status: "منشور" },
  { id: "a5", title: "شروط القرض الشخصي الجديد 2026", category: "القروض", views: 987, updated: "اليوم", status: "قيد المراجعة" },
  { id: "a6", title: "أسعار الفائدة على الودائع لأجل", category: "الاستثمار", views: 0, updated: "اليوم", status: "مسودة" },
];

export interface AuditLog {
  id: string;
  user: string;
  action: string;
  target: string;
  ip: string;
  time: string;
  severity: "info" | "warning" | "critical";
}

export const auditLogs: AuditLog[] = [
  { id: "l1", user: "فيصل الشيباني", action: "تعديل صلاحيات مستخدم", target: "أحمد بن حليم", ip: "10.12.4.22", time: "اليوم 14:32", severity: "warning" },
  { id: "l2", user: "أحمد بن حليم", action: "إغلاق شكوى", target: "CMP-4402", ip: "10.12.5.14", time: "اليوم 13:15", severity: "info" },
  { id: "l3", user: "المساعد الذكي", action: "تحويل محادثة لموظف", target: "AN-88218", ip: "system", time: "اليوم 12:50", severity: "info" },
  { id: "l4", user: "منى المسلاتي", action: "تسجيل دخول", target: "—", ip: "10.12.5.09", time: "اليوم 08:02", severity: "info" },
  { id: "l5", user: "غير معروف", action: "محاولة دخول فاشلة", target: "s.ghamdi@alnouran.ly", ip: "45.220.11.7", time: "اليوم 07:18", severity: "critical" },
  { id: "l6", user: "فيصل الشيباني", action: "تعديل سياسة الذكاء الاصطناعي", target: "policy_v3", ip: "10.12.4.22", time: "أمس 22:40", severity: "warning" },
  { id: "l7", user: "هند الأوجلي", action: "تصدير تقرير أداء", target: "reports_2026Q1", ip: "10.12.6.31", time: "أمس 18:22", severity: "info" },
];

export interface AppNotification {
  id: string;
  title: string;
  body: string;
  time: string;
  kind: "alert" | "message" | "reminder" | "admin";
  read: boolean;
}

export const notifications: AppNotification[] = [
  { id: "n1", title: "تنبيه أمني: محاولة دخول مشبوهة", body: "تم رصد محاولة دخول فاشلة من عنوان IP خارجي.", time: "منذ 10 دقائق", kind: "alert", read: false },
  { id: "n2", title: "رسالة غير مقروءة من ريم المصراتي", body: "المحادثة AN-88208 تنتظر ردك منذ 15 دقيقة.", time: "منذ 15 دقيقة", kind: "message", read: false },
  { id: "n3", title: "تذكير: مراجعة أداء الأسبوع", body: "لديك اجتماع مراجعة الأداء الساعة 3:00 عصراً.", time: "اليوم 09:00", kind: "reminder", read: false },
  { id: "n4", title: "تحديث سياسة الذكاء الاصطناعي", body: "تم تفعيل سياسة تحويل تلقائي جديدة للمحادثات المالية.", time: "أمس", kind: "admin", read: true },
  { id: "n5", title: "شكوى ذات أولوية عالية جديدة", body: "CMP-4419 من نورة الفيتوري — تحويل دولي مرفوض.", time: "أمس", kind: "alert", read: true },
];