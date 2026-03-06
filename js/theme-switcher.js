// ========================================
// نظام التبديل بين النسخة الرسمية والداكنة
// ========================================

class ThemeSwitcher {
    constructor() {
        this.currentTheme = 'official';
        this.themeButton = document.getElementById('theme-toggle');
        this.themeStylesheet = document.getElementById('theme-stylesheet');
        this.init();
    }

    // ========================================
    // التهيئة الأولية
    // ========================================
    init() {
        // تحميل النسخة المحفوظة
        this.loadSavedTheme();
        
        // إضافة مستمع للزر
        this.themeButton.addEventListener('click', () => {
            this.toggleTheme();
        });

        // تحديث أيقونة الزر
        this.updateButtonIcon();
    }

    // ========================================
    // تحميل النسخة المحفوظة من localStorage
    // ========================================
    loadSavedTheme() {
        const savedTheme = localStorage.getItem('dashboard-theme');
        if (savedTheme) {
            this.currentTheme = savedTheme;
            this.applyTheme(savedTheme);
        }
    }

    // ========================================
    // التبديل بين النسختين
    // ========================================
    toggleTheme() {
        const newTheme = this.currentTheme === 'official' ? 'dark' : 'official';
        this.currentTheme = newTheme;
        this.applyTheme(newTheme);
        this.saveTheme(newTheme);
    }

    // ========================================
    // تطبيق النسخة
    // ========================================
    applyTheme(theme) {
        // تحديث الملف CSS
        if (theme === 'dark') {
            this.themeStylesheet.href = 'css/theme-dark.css';
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            this.themeStylesheet.href = 'css/theme-official.css';
            document.documentElement.removeAttribute('data-theme');
        }

        // تحديث أيقونة الزر
        this.updateButtonIcon();

        // إضافة تأثير انتقالي سلس
        document.body.style.transition = 'all 0.3s ease';

        // تحديث الرسوم البيانية بعد تحميل النسخة
        setTimeout(() => {
            if (typeof updateChartsTheme === 'function') {
                updateChartsTheme();
            }
        }, 100);
    }

    // ========================================
    // تحديث أيقونة زر التبديل
    // ========================================
    updateButtonIcon() {
        const icon = this.themeButton.querySelector('i');
        
        if (this.currentTheme === 'dark') {
            // النسخة الداكنة: عرض أيقونة الشمس للتبديل للنسخة الفاتحة
            icon.className = 'fas fa-sun';
            this.themeButton.title = 'التبديل للنسخة الرسمية';
        } else {
            // النسخة الرسمية: عرض أيقونة القمر للتبديل للنسخة الداكنة
            icon.className = 'fas fa-moon';
            this.themeButton.title = 'التبديل للوضع الداكن';
        }
    }

    // ========================================
    // حفظ النسخة في localStorage
    // ========================================
    saveTheme(theme) {
        localStorage.setItem('dashboard-theme', theme);
    }

    // ========================================
    // الحصول على النسخة الحالية
    // ========================================
    getCurrentTheme() {
        return this.currentTheme;
    }
}

// ========================================
// تهيئة نظام التبديل عند تحميل الصفحة
// ========================================
let themeSwitcher;

document.addEventListener('DOMContentLoaded', () => {
    themeSwitcher = new ThemeSwitcher();
});

// ========================================
// اختصارات لوحة المفاتيح (اختياري)
// ========================================
document.addEventListener('keydown', (e) => {
    // Ctrl + Shift + T للتبديل السريع
    if (e.ctrlKey && e.shiftKey && e.key === 'T') {
        e.preventDefault();
        if (themeSwitcher) {
            themeSwitcher.toggleTheme();
        }
    }
});

// ========================================
// كشف تفضيل النظام (اختياري)
// ========================================
function detectSystemPreference() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
    }
    return 'official';
}

// مراقبة تغيير تفضيل النظام
if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        // يمكن تفعيل هذا إذا أردت التبديل التلقائي
        // const newTheme = e.matches ? 'dark' : 'official';
        // themeSwitcher.applyTheme(newTheme);
    });
}
