/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ShoppingBag, 
  Search, 
  ShoppingCart, 
  User, 
  PlusCircle, 
  BookOpen, 
  PenTool, 
  Cpu, 
  PhoneCall, 
  ChevronRight, 
  Star, 
  Truck, 
  ShieldCheck, 
  Tag, 
  ArrowLeft,
  Mail,
  MapPin,
  Send,
  Share2,
  Globe,
  HelpCircle,
  Menu,
  X
} from "lucide-react";

// --- Types ---
type ScreenId = 
  | "home" 
  | "add-product" 
  | "books" 
  | "tools" 
  | "electronics" 
  | "contact";

type TransitionType = "push" | "push_back" | "slide_up";

interface NavigationState {
  current: ScreenId;
  transition: TransitionType;
}

// --- Components ---

const Layout = ({ 
  children, 
  currentScreen, 
  onNavigate 
}: { 
  children: ReactNode; 
  currentScreen: ScreenId;
  onNavigate: (to: ScreenId, type: TransitionType) => void;
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: "home", label: "الرئيسية" },
    { id: "books", label: "الكتب" },
    { id: "tools", label: "الأدوات" },
    { id: "electronics", label: "الإلكترونيات" },
    { id: "add-product", label: "أضف منتج" },
    { id: "contact", label: "اتصل بنا" },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans" dir="rtl">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-outline sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div 
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => onNavigate("home", "push_back")}
            >
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-xl transition-transform group-hover:scale-105">S</div>
              <h1 className="text-xl font-bold tracking-tight text-on-surface-variant">متجر الطالب</h1>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => onNavigate(link.id as ScreenId, "push")}
                  className={`text-sm font-medium transition-colors ${
                    link.id === "add-product" 
                    ? "bg-secondary text-white px-5 py-2 rounded-full hover:bg-secondary-container" 
                    : currentScreen === link.id 
                      ? "text-primary border-b-2 border-primary pb-1" 
                      : "text-on-surface hover:text-primary"
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block">
              <input 
                type="text" 
                placeholder="بحث..."
                className="bg-white border border-outline rounded-full px-10 py-2 text-sm w-48 lg:w-64 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              />
              <Search className="absolute right-3 top-2.5 size-4 text-on-surface-variant" />
            </div>
            <button className="p-2 hover:bg-surface-container rounded-full transition-colors relative text-on-surface-variant">
              <ShoppingCart className="size-5" />
              <span className="absolute top-1 right-1 size-2 bg-secondary rounded-full" />
            </button>
            <button className="p-2 hover:bg-surface-container-high rounded-full transition-colors">
              <User className="size-5" />
            </button>
            <button 
              className="md:hidden p-2 hover:bg-surface-container-high rounded-full"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-outline-variant/30 overflow-hidden"
            >
              <div className="flex flex-col p-4 gap-4">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => {
                      onNavigate(link.id as ScreenId, "push");
                      setIsMobileMenuOpen(false);
                    }}
                    className={`text-right p-2 rounded-lg font-medium ${
                      currentScreen === link.id ? "bg-primary/10 text-primary" : "text-on-surface-variant"
                    }`}
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col relative overflow-hidden">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-surface-container border-t border-outline py-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-xl font-bold text-on-surface-variant mb-4">متجر الطالب الجامعي</h2>
            <p className="text-on-surface max-w-md italic">
              وجهتك الأولى لكل مستلزماتك الجامعية. نوفر لك الجودة والسرعة لدعم مسيرتك الأكاديمية.
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-4 text-on-surface-variant">روابط سريعة</h3>
            <ul className="space-y-2 text-on-surface">
              <li><button className="hover:text-primary transition-colors" onClick={() => onNavigate("home", "push")}>الرئيسية</button></li>
              <li><button className="hover:text-primary transition-colors" onClick={() => onNavigate("books", "push")}>الكتب الدراسية</button></li>
              <li><button className="hover:text-primary transition-colors" onClick={() => onNavigate("tools", "push")}>الأدوات المكتبية</button></li>
              <li><button className="hover:text-primary transition-colors" onClick={() => onNavigate("contact", "push")}>اتصل بنا</button></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4 text-on-surface-variant">تواصل معنا</h3>
            <div className="flex gap-4">
              <button className="size-10 rounded-xl bg-white border border-outline flex items-center justify-center hover:bg-primary/10 transition-colors">
                <Globe className="size-5 text-primary" />
              </button>
              <button className="size-10 rounded-xl bg-white border border-outline flex items-center justify-center hover:bg-primary/10 transition-colors">
                <Share2 className="size-5 text-primary" />
              </button>
              <button className="size-10 rounded-xl bg-white border border-outline flex items-center justify-center hover:bg-primary/10 transition-colors">
                <HelpCircle className="size-5 text-primary" />
              </button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-8 pt-8 border-t border-outline text-center text-sm text-on-surface">
          &copy; 2024 متجر الطالب الجامعي. جميع الحقوق محفوظة.
        </div>
      </footer>
    </div>
  );
};

// --- Screens ---

const HomeScreen = ({ onNavigate }: { onNavigate: (to: ScreenId, type: TransitionType) => void }) => (
  <div className="flex flex-col gap-12 py-12">
    {/* Hero */}
    <section className="max-w-7xl mx-auto px-6 w-full">
      <div className="bg-surface-container rounded-[2.5rem] p-12 md:p-16 flex flex-col md:flex-row items-center justify-between relative overflow-hidden min-h-[400px]">
        <div className="z-10 max-w-2xl text-right">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-on-surface-variant text-4xl md:text-5xl font-bold mb-6 leading-tight"
          >
            وفّر على مستلزماتك الجامعية
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-on-surface text-lg md:text-xl mb-10 leading-relaxed max-w-lg"
          >
            منصتك الأولى لبيع وشراء الكتب والأدوات والتقنيات المستعملة بين زملائك في الحرم الجامعي بسهولة وأمان.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex gap-4 justify-start flex-row-reverse"
          >
            <button 
              onClick={() => onNavigate("books", "push")}
              className="bg-primary text-white px-10 py-4 rounded-2xl font-bold hover:shadow-xl transition-all shadow-primary/20 active:scale-95"
            >
              تصفح الكتب
            </button>
            <button 
              onClick={() => onNavigate("electronics", "push")}
              className="bg-white text-primary border-2 border-primary px-10 py-4 rounded-2xl font-bold hover:bg-primary/5 transition-all active:scale-95"
            >
              تسوق التقنية
            </button>
          </motion.div>
        </div>
        
        {/* Decorative elements from theme */}
        <div className="absolute -left-10 -bottom-10 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute right-20 bottom-0 w-64 h-64 bg-secondary/20 rounded-t-full hidden md:block"></div>
        
        <div className="hidden md:block absolute left-12 top-1/2 -translate-y-1/2 w-72 h-72">
          <img 
            src="https://picsum.photos/seed/college/600/600" 
            alt="College Life" 
            className="w-full h-full object-cover rounded-3xl rotate-3 shadow-2xl"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </section>

    {/* Latest Items Section */}
    <section className="max-w-7xl mx-auto px-6 w-full py-12">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-2xl font-bold text-on-surface-variant tracking-tight">أحدث المنتجات المضافة</h3>
        <div className="flex gap-2">
          <button className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center hover:bg-white transition-all">
            <ArrowLeft className="size-5" />
          </button>
          <button className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center hover:bg-white transition-all rotate-180">
            <ArrowLeft className="size-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { icon: "📚", cat: "الكتب الجامعية", title: "كتاب فيزياء 101", price: "85 ريال" },
          { icon: "💻", cat: "الإلكترونيات والتقنية", title: "ماك بوك اير 2020", price: "2,400 ريال" },
          { icon: "🖊️", cat: "الأدوات والمستلزمات", title: "طقم أقلام هندسية", price: "45 ريال" },
        ].map((item, i) => (
          <div key={i} className="bg-white p-5 rounded-[2rem] border border-outline flex gap-5 items-center hover:shadow-lg transition-all group cursor-pointer">
            <div className="w-24 h-24 bg-surface-container rounded-2xl flex items-center justify-center text-4xl group-hover:scale-110 transition-transform">
              {item.icon}
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest text-on-surface font-bold opacity-60">{item.cat}</span>
              <h4 className="font-bold text-on-surface-variant text-lg mt-1">{item.title}</h4>
              <p className="text-primary font-bold mt-1 text-xl">{item.price}</p>
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* CTA Banner */}
    <section className="max-w-7xl mx-auto px-6 w-full py-12">
      <div className="bg-primary/5 border border-primary/20 p-8 md:p-10 rounded-[2.5rem] flex flex-col md:flex-row items-center gap-8">
        <div className="text-6xl bg-white size-24 rounded-3xl flex items-center justify-center shadow-sm">📦</div>
        <div className="text-right md:text-right flex-grow">
          <h5 className="font-bold text-2xl text-on-surface-variant mb-2">بيع كتبك القديمة</h5>
          <p className="text-lg text-on-surface mb-0">حوّل كتبك التي لا تحتاجها إلى نقود بسهولة وبسرعة.</p>
        </div>
        <button 
          onClick={() => onNavigate("add-product", "slide_up")}
          className="bg-secondary text-white px-10 py-4 rounded-2xl font-bold hover:shadow-xl transition-all shadow-secondary/20 whitespace-nowrap"
        >
          أضف منتج الآن
        </button>
      </div>
    </section>
  </div>
);

const BooksScreen = ({ onNavigate }: { onNavigate: (to: ScreenId, type: TransitionType) => void }) => (
  <div className="max-w-7xl mx-auto px-6 py-12">
    <div className="flex flex-col md:flex-row gap-12">
      {/* Sidebar Filters */}
      <aside className="w-full md:w-64 flex flex-col gap-8 shrink-0">
        <div>
          <h3 className="text-xl font-bold mb-4">التصنيفات</h3>
          <div className="flex flex-col gap-3">
            {["العلوم (42)", "الرياضيات (18)", "الطب (25)", "الحاسب الآلي (31)", "الفنون والآداب (12)"].map((cat, i) => (
              <label key={i} className="flex items-center gap-3 cursor-pointer group">
                <input type="checkbox" className="size-5 rounded border-outline-variant text-primary focus:ring-primary/20" />
                <span className="text-on-surface-variant group-hover:text-primary transition-colors">{cat}</span>
              </label>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-4">نطاق السعر</h3>
          <input type="range" className="w-full accent-primary" />
          <div className="flex justify-between text-sm text-on-surface-variant mt-2">
            <span>0 ريال</span>
            <span>500 ريال</span>
          </div>
        </div>
      </aside>

      {/* Grid */}
      <div className="flex-grow">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold">الكتب الدراسية</h2>
          <div className="flex items-center gap-4">
            <span className="text-sm text-on-surface-variant">عرض 1-8 من 128 منتج</span>
            <select className="bg-surface-container border border-outline-variant rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 outline-none">
              <option>الأكثر مبيعاً</option>
              <option>الأحدث</option>
              <option>السعر: من الأقل</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { tag: "جديد", cat: "الرياضيات", title: "أساسيات الرياضيات المتقدمة", price: "120 ر.س", rate: "4.8", img: "https://picsum.photos/seed/math/400/500" },
            { tag: "مستعمل", cat: "الحاسب", title: "مقدمة في البرمجة بلغة بايثون", price: "85 ر.س", rate: "4.9", img: "https://picsum.photos/seed/python/400/500" },
            { tag: null, cat: "الطب", title: "مرجع التشريح البشري الشامل", price: "240 ر.س", rate: "4.7", img: "https://picsum.photos/seed/medicine/400/500" },
            { tag: "جديد", cat: "العلوم", title: "مبادئ الفيزياء الكلاسيكية", price: "150 ر.س", rate: "4.5", img: "https://picsum.photos/seed/physics/400/500" },
            { tag: null, cat: "المالية", title: "المحاسبة الإدارية للطلاب", price: "110 ر.س", rate: "4.6", img: "https://picsum.photos/seed/accounting/400/500" },
            { tag: "تخفيض", cat: "الآداب", title: "تاريخ الأدب العربي المعاصر", price: "95 ر.س", rate: "5.0", img: "https://picsum.photos/seed/literature/400/500" },
          ].map((book, i) => (
            <div key={i} className="group bg-white rounded-[2rem] shadow-sm border border-outline overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="relative aspect-[4/5] overflow-hidden">
                <img src={book.img} alt={book.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" referrerPolicy="no-referrer" />
                {book.tag && (
                  <span className="absolute top-4 left-4 bg-secondary text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {book.tag}
                  </span>
                )}
                <button className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md text-primary py-3 rounded-xl font-bold opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all active:scale-95 shadow-lg">
                  أضف للسلة
                </button>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-2 text-right">
                  <span className="text-primary text-xs font-bold uppercase tracking-wider">{book.cat}</span>
                  <div className="flex items-center gap-1">
                    <Star className="size-3 text-secondary fill-secondary" />
                    <span className="text-xs font-bold text-on-surface">{book.rate}</span>
                  </div>
                </div>
                <h3 className="font-bold text-lg mb-4 line-clamp-1 group-hover:text-primary transition-colors text-right">{book.title}</h3>
                <div className="text-2xl font-bold text-primary text-right">{book.price}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-16 gap-2">
          <button className="size-10 flex items-center justify-center rounded-xl border border-outline-variant hover:bg-surface-container transition-colors">1</button>
          <button className="size-10 flex items-center justify-center rounded-xl border border-outline-variant hover:bg-surface-container transition-colors">2</button>
          <button className="size-10 flex items-center justify-center rounded-xl border border-outline-variant hover:bg-surface-container transition-colors">3</button>
        </div>
      </div>
    </div>
  </div>
);

const ToolsScreen = ({ onNavigate }: { onNavigate: (to: ScreenId, type: TransitionType) => void }) => (
  <div className="max-w-7xl mx-auto px-6 py-12">
    <div className="text-center mb-16">
      <h2 className="text-4xl font-bold mb-4">الأدوات والمستلزمات</h2>
      <p className="text-on-surface-variant max-w-2xl mx-auto">كل ما تحتاجه لرحلتك الدراسية في مكان واحد - من الأقلام إلى الحقائب المريحة.</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {[
        { title: "حقيبة ظهر مريحة", price: "185 ر.س", img: "https://picsum.photos/seed/bag/400/400", cat: "حقائب" },
        { title: "دفاتر فاخرة", price: "15 ر.س", img: "https://picsum.photos/seed/note/400/400", cat: "دفاتر" },
        { title: "أقلام تحديد", price: "45 ر.س", img: "https://picsum.photos/seed/pen/400/400", cat: "أدوات" },
        { title: "منظم أكاديمي", price: "90 ر.س", img: "https://picsum.photos/seed/planner/400/400", cat: "منظمات" },
      ].map((tool, i) => (
        <div key={i} className="group flex flex-col gap-4">
          <div className="relative aspect-square rounded-[40px] overflow-hidden bg-white shadow-sm border border-outline">
            <img src={tool.img} alt={tool.title} className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105" referrerPolicy="no-referrer" />
            <button className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
               <div className="bg-white text-primary p-4 rounded-2xl shadow-xl transform scale-50 group-hover:scale-100 transition-transform">
                 <ShoppingCart className="size-6" />
               </div>
            </button>
          </div>
          <div className="text-right">
            <span className="text-primary text-xs font-bold">{tool.cat}</span>
            <h3 className="font-bold text-xl mt-1 text-on-surface-variant">{tool.title}</h3>
            <p className="text-secondary font-bold text-lg">{tool.price}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const ElectronicsScreen = ({ onNavigate }: { onNavigate: (to: ScreenId, type: TransitionType) => void }) => (
  <div className="max-w-7xl mx-auto px-6 py-12">
    <div className="bg-primary p-12 rounded-[60px] text-white flex flex-col md:flex-row items-center justify-between mb-20">
      <div className="md:w-1/2">
        <h2 className="text-5xl font-bold mb-6 italic-small">الإلكترونيات والتقنية</h2>
        <p className="text-white/80 text-xl leading-relaxed">أحدث التقنيات التي تدعم تعلمك. احصل على أفضل العروض الطلابية على الأجهزة المحمولة والساعات الذكية.</p>
      </div>
      <div className="md:w-1/3 mt-8 md:mt-0 relative">
        <div className="size-64 bg-white/10 rounded-full blur-3xl absolute inset-0 animate-pulse" />
        <Cpu className="size-48 text-primary-fixed block relative mx-auto" />
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[
        { title: "MacBook Air M2", price: "4,299 ر.س", spec: "Apple M2 Chip", img: "https://picsum.photos/seed/mac/400/300" },
        { title: "iPad Air 5", price: "2,299 ر.س", spec: "Apple M1 Chip", img: "https://picsum.photos/seed/ipad/400/300" },
        { title: "AirPods Pro 2", price: "899 ر.س", spec: "Active Noise Cancellation", img: "https://picsum.photos/seed/airpods/400/300" },
        { title: "MX Master 3S", price: "450 ر.س", spec: "Logitech Ergonomics", img: "https://picsum.photos/seed/mouse/400/300" },
      ].map((tech, i) => (
        <div key={i} className="bg-white rounded-3xl p-6 border border-outline-variant/10 hover:border-primary/30 transition-all group cursor-pointer shadow-sm">
          <div className="rounded-2xl overflow-hidden mb-6 h-48 bg-surface">
            <img src={tech.img} alt={tech.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:rotate-2 group-hover:scale-105" referrerPolicy="no-referrer" />
          </div>
          <h3 className="font-bold text-xl mb-1">{tech.title}</h3>
          <p className="text-on-surface-variant text-sm mb-4">{tech.spec}</p>
          <div className="flex justify-between items-center">
            <p className="text-primary text-2xl font-bold">{tech.price}</p>
            <button className="p-3 bg-surface hover:bg-primary hover:text-white rounded-xl transition-all">
              <PlusCircle className="size-5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const AddProductScreen = ({ onNavigate }: { onNavigate: (to: ScreenId, type: TransitionType) => void }) => (
  <div className="max-w-4xl mx-auto px-6 py-20">
    <div className="bg-white rounded-[3rem] shadow-xl shadow-primary/5 p-12 border border-outline">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-on-surface-variant mb-4">أضف منتجك للبيع</h2>
        <p className="text-on-surface">شارك مواردك الدراسية مع زملائك في الجامعة بسهولة وأمان.</p>
      </div>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-8" onSubmit={(e) => e.preventDefault()}>
        <div className="col-span-full">
           <label className="block text-sm font-bold mb-3">صورة المنتج</label>
           <div className="border-2 border-dashed border-outline rounded-3xl px-8 py-12 text-center hover:bg-surface-container hover:border-primary transition-all cursor-pointer">
              <PlusCircle className="size-12 text-primary mx-auto mb-4 opacity-40" />
              <p className="text-on-surface">اضغط أو اسحب الصور هنا للأرفاق</p>
           </div>
        </div>
        <div>
          <label className="block text-sm font-bold mb-3">اسم المنتج</label>
          <input type="text" placeholder="مثال: كتاب الفيزياء" className="w-full bg-white border border-outline rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/20" />
        </div>
        <div>
          <label className="block text-sm font-bold mb-3">الفئة</label>
          <select className="w-full bg-white border border-outline rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/20">
            <option>الكتب الجامعية</option>
            <option>الأدوات المكتبية</option>
            <option>الإلكترونيات</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-bold mb-3">السعر (ر.س)</label>
          <input type="number" placeholder="0.00" className="w-full bg-white border border-outline rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/20" />
        </div>
        <div>
          <label className="block text-sm font-bold mb-3">الحالة</label>
          <select className="w-full bg-white border border-outline rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/20">
            <option>جديد</option>
            <option>مستعمل - كالجديد</option>
            <option>مستعمل - مقبول</option>
          </select>
        </div>
        <div className="col-span-full">
          <label className="block text-sm font-bold mb-3">الوصف</label>
          <textarea rows={4} placeholder="اكتب تفاصيل المنتج..." className="w-full bg-white border border-outline rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/20 resize-none"></textarea>
        </div>
        <div className="col-span-full pt-4">
          <button 
            onClick={() => onNavigate("home", "push_back")}
            className="w-full bg-secondary text-white py-5 rounded-2xl font-bold text-xl hover:bg-secondary-container transition-all active:scale-[0.98] shadow-lg shadow-secondary/20"
          >
            نشر المنتج الآن
          </button>
        </div>
      </form>
    </div>
  </div>
);

const ContactScreen = ({ onNavigate }: { onNavigate: (to: ScreenId, type: TransitionType) => void }) => (
  <div className="max-w-7xl mx-auto px-6 py-20 flex flex-col items-center">
    <div className="text-center mb-16">
      <h2 className="text-4xl font-bold mb-4">اتصل بنا</h2>
      <p className="text-on-surface-variant max-w-xl">نحن هنا لمساعدتك. سواء كان لديك استفسار حول طلبك أو ترغب في تقديم اقتراحات، فريقنا جاهز للرد عليك.</p>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 w-full">
      <div className="lg:col-span-2 bg-white rounded-3xl p-10 shadow-sm border border-outline-variant/10">
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-bold mr-2">الاسم بالكامل</label>
              <input type="text" className="w-full bg-surface border border-outline-variant rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 outline-none" />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-bold mr-2">البريد الإلكتروني</label>
              <input type="email" className="w-full bg-surface border border-outline-variant rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 outline-none" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-bold mr-2">الموضوع</label>
            <input type="text" className="w-full bg-surface border border-outline-variant rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 outline-none" />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-bold mr-2">الرسالة</label>
            <textarea rows={6} className="w-full bg-surface border border-outline-variant rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 outline-none resize-none"></textarea>
          </div>
          <button className="bg-primary text-white px-12 py-4 rounded-xl font-bold hover:bg-primary-container transition-all active:scale-95 flex items-center gap-2">
            <span>إرسال الرسالة</span>
            <Send className="size-4" />
          </button>
        </form>
      </div>

      <div className="flex flex-col gap-6">
        <div className="bg-primary text-white p-10 rounded-3xl">
          <h3 className="text-2xl font-bold mb-8">معلومات التواصل</h3>
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="bg-white/10 p-3 rounded-xl"><MapPin className="size-6" /></div>
              <div>
                <p className="font-bold opacity-70 text-xs mb-1 uppercase tracking-wider">العنوان</p>
                <p className="text-lg">حي الجامعة، المبنى الإداري، الدور الثاني</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-white/10 p-3 rounded-xl"><PhoneCall className="size-6" /></div>
              <div>
                <p className="font-bold opacity-70 text-xs mb-1 uppercase tracking-wider">الهاتف</p>
                <p className="text-lg" dir="ltr">+966 500 123 456</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-white/10 p-3 rounded-xl"><Mail className="size-6" /></div>
              <div>
                <p className="font-bold opacity-70 text-xs mb-1 uppercase tracking-wider">البريد الإلكتروني</p>
                <p className="text-lg">support@studentshop.edu.sa</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-surface rounded-3xl p-4 border border-outline-variant/30 h-48 relative overflow-hidden">
           <img src="https://picsum.photos/seed/map/400/400" alt="Map" className="w-full h-full object-cover opacity-50 grayscale" referrerPolicy="no-referrer" />
           <div className="absolute inset-0 flex items-center justify-center">
             <div className="bg-white p-3 rounded-2xl shadow-xl"><MapPin className="size-8 text-primary" /></div>
           </div>
        </div>
      </div>
    </div>
  </div>
);

// --- Transition Definitions ---

const animations = {
  push: {
    initial: { x: 100, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: -100, opacity: 0 },
  },
  push_back: {
    initial: { x: -100, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: 100, opacity: 0 },
  },
  slide_up: {
    initial: { y: 100, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { opacity: 0, scale: 0.95 },
  },
};

// --- Main App ---

export default function App() {
  const [nav, setNav] = useState<NavigationState>({
    current: "home",
    transition: "push",
  });

  const handleNavigate = (to: ScreenId, type: TransitionType) => {
    setNav({ current: to, transition: type });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderScreen = () => {
    switch (nav.current) {
      case "home": return <HomeScreen onNavigate={handleNavigate} />;
      case "books": return <BooksScreen onNavigate={handleNavigate} />;
      case "tools": return <ToolsScreen onNavigate={handleNavigate} />;
      case "electronics": return <ElectronicsScreen onNavigate={handleNavigate} />;
      case "add-product": return <AddProductScreen onNavigate={handleNavigate} />;
      case "contact": return <ContactScreen onNavigate={handleNavigate} />;
      default: return <HomeScreen onNavigate={handleNavigate} />;
    }
  };

  return (
    <Layout currentScreen={nav.current} onNavigate={handleNavigate}>
      <AnimatePresence mode="wait">
        <motion.div
          key={nav.current}
          variants={animations[nav.transition]}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col flex-grow"
        >
          {renderScreen()}
        </motion.div>
      </AnimatePresence>
    </Layout>
  );
}
