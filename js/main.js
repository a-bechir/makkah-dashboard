// ========================================
// الملف الرئيسي للوحة المعلومات
// ========================================

// ========================================
// التبويبات
// ========================================
class TabManager {
    constructor() {
        this.tabButtons = document.querySelectorAll('.tab-btn');
        this.tabContents = document.querySelectorAll('.tab-content');
        this.init();
    }

    init() {
        this.tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const tabName = button.getAttribute('data-tab');
                this.switchTab(tabName);
            });
        });
    }

    switchTab(tabName) {
        // إزالة active من جميع الأزرار والتبويبات
        this.tabButtons.forEach(btn => btn.classList.remove('active'));
        this.tabContents.forEach(content => content.classList.remove('active'));

        // إضافة active للتبويب المختار
        const activeButton = document.querySelector(`[data-tab="${tabName}"]`);
        const activeContent = document.getElementById(tabName);

        if (activeButton && activeContent) {
            activeButton.classList.add('active');
            activeContent.classList.add('active');

            // تحديث الرسوم البيانية للتبويب النشط
            this.updateChartsForTab(tabName);
        }
    }

    updateChartsForTab(tabName) {
        // تحديث الرسوم البيانية فقط للتبويب النشط لتحسين الأداء
        setTimeout(() => {
            Chart.helpers.each(Chart.instances, function(instance) {
                instance.resize();
            });
        }, 100);
    }
}

// ========================================
// إدارة الرسوم المتحركة للبطاقات
// ========================================
class CardAnimator {
    constructor() {
        this.cards = document.querySelectorAll('.kpi-card, .chart-card');
        this.init();
    }

    init() {
        // رسوم متحركة عند التحميل
        this.animateCardsOnLoad();

        // رسوم متحركة عند التمرير
        this.setupScrollObserver();
    }

    animateCardsOnLoad() {
        this.cards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(30px)';
                card.style.transition = 'all 0.5s ease';

                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 50);
            }, index * 50);
        });
    }

    setupScrollObserver() {
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, options);

        this.cards.forEach(card => {
            observer.observe(card);
        });
    }
}

// ========================================
// نظام الإشعارات (اختياري)
// ========================================
class NotificationSystem {
    constructor() {
        this.notifications = [];
    }

    show(message, type = 'info', duration = 3000) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${this.getIcon(type)}"></i>
            <span>${message}</span>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            left: 20px;
            padding: 1rem 1.5rem;
            background: var(--card-bg);
            border: 2px solid var(--accent-primary);
            border-radius: 8px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            z-index: 9999;
            display: flex;
            align-items: center;
            gap: 0.8rem;
            font-family: var(--font-primary);
            animation: slideIn 0.3s ease;
            transition: all 0.3s ease;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(-100%)';
            setTimeout(() => notification.remove(), 300);
        }, duration);
    }

    getIcon(type) {
        const icons = {
            info: 'info-circle',
            success: 'check-circle',
            warning: 'exclamation-triangle',
            error: 'times-circle'
        };
        return icons[type] || icons.info;
    }
}

// ========================================
// محاكاة التحديثات في الوقت الفعلي
// ========================================
class RealTimeUpdates {
    constructor() {
        this.updateInterval = null;
    }

    start() {
        // تحديث كل 30 ثانية
        this.updateInterval = setInterval(() => {
            this.updateData();
        }, 30000);
    }

    updateData() {
        // محاكاة تحديث البيانات
        console.log('تم تحديث البيانات:', new Date().toLocaleTimeString('ar-SA'));
        
        // يمكن هنا إضافة استدعاء API حقيقي
        // fetch('/api/dashboard-data')
        //     .then(response => response.json())
        //     .then(data => {
        //         // تحديث البيانات
        //     });
    }

    stop() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
        }
    }
}

// ========================================
// إدارة البيانات المخزنة محلياً
// ========================================
class DataCache {
    constructor() {
        this.cacheKey = 'makkah-dashboard-cache';
    }

    save(data) {
        try {
            localStorage.setItem(this.cacheKey, JSON.stringify(data));
        } catch (e) {
            console.error('فشل حفظ البيانات:', e);
        }
    }

    load() {
        try {
            const data = localStorage.getItem(this.cacheKey);
            return data ? JSON.parse(data) : null;
        } catch (e) {
            console.error('فشل تحميل البيانات:', e);
            return null;
        }
    }

    clear() {
        localStorage.removeItem(this.cacheKey);
    }
}

// ========================================
// طباعة التقارير (اختياري)
// ========================================
function printDashboard() {
    window.print();
}

// ========================================
// تصدير البيانات (اختياري)
// ========================================
function exportToCSV(data, filename) {
    const csv = convertToCSV(data);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
}

function convertToCSV(data) {
    // منطق تحويل البيانات إلى CSV
    return '';
}

// ========================================
// التهيئة الرئيسية عند تحميل الصفحة
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 تحميل لوحة معلومات إمارة منطقة مكة المكرمة');

    // تهيئة المكونات
    const tabManager = new TabManager();
    const cardAnimator = new CardAnimator();
    const notificationSystem = new NotificationSystem();
    const realTimeUpdates = new RealTimeUpdates();
    const dataCache = new DataCache();

    // تحديث التاريخ والوقت
    updateDateTime();
    setInterval(updateDateTime, 60000); // كل دقيقة

    // تحديث قيم KPI
    updateKPIValues();

    // تهيئة الرسوم البيانية
    initializeCharts();

    // بدء التحديثات في الوقت الفعلي (اختياري)
    // realTimeUpdates.start();

    // عرض رسالة ترحيب
    setTimeout(() => {
        notificationSystem.show('مرحباً بك في لوحة المعلومات', 'success');
    }, 1000);

    // إضافة مستمعات للأحداث الإضافية
    setupAdditionalEventListeners();

    console.log('✅ تم تحميل جميع المكونات بنجاح');
});

// ========================================
// إعداد مستمعات أحداث إضافية
// ========================================
function setupAdditionalEventListeners() {
    // معالجة تغيير حجم النافذة
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // تحديث الرسوم البيانية بعد تغيير الحجم
            Chart.helpers.each(Chart.instances, function(instance) {
                instance.resize();
            });
        }, 250);
    });

    // معالجة فقدان الاتصال (اختياري)
    window.addEventListener('offline', () => {
        console.warn('⚠️ فقدان الاتصال بالإنترنت');
    });

    window.addEventListener('online', () => {
        console.log('✅ تم استعادة الاتصال بالإنترنت');
    });

    // منع النقر بزر الماوس الأيمن (اختياري)
    // document.addEventListener('contextmenu', (e) => e.preventDefault());
}

// ========================================
// دالة مساعدة: الحصول على تحية مناسبة
// ========================================
function getGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return 'صباح الخير';
    if (hour < 18) return 'مساء الخير';
    return 'مساء الخير';
}

// ========================================
// دالة مساعدة: تأخير التنفيذ
// ========================================
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// ========================================
// تصدير للاستخدام العام
// ========================================
window.dashboardApp = {
    printDashboard,
    exportToCSV,
    getGreeting
};

console.log('📊 لوحة معلومات إمارة منطقة مكة المكرمة - جاهزة للاستخدام');
