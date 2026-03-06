// ========================================
// البيانات التجريبية للوحة المعلومات
// ========================================

const dashboardData = {
    // ========================================
    // بيانات الحج والعمرة
    // ========================================
    hajj: {
        kpi: {
            total: 45287,
            weekly: 38642,
            occupancy: 78,
            buses: 342
        },
        lineChart: {
            labels: ['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'],
            data: [35200, 38500, 41200, 39800, 42300, 45287, 43100]
        },
        pieChart: {
            labels: ['السعودية', 'مصر', 'باكستان', 'إندونيسيا', 'تركيا', 'أخرى'],
            data: [35, 18, 15, 12, 8, 12]
        }
    },

    // ========================================
    // بيانات الشؤون الأمنية
    // ========================================
    security: {
        kpi: {
            reports: 127,
            resolved: 94.3,
            response: 12,
            teams: 48
        },
        areaChart: {
            labels: ['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'],
            data: [145, 132, 138, 125, 118, 127, 120]
        },
        doughnutChart: {
            labels: ['مرور', 'إسعاف', 'شكاوى', 'حوادث', 'أخرى'],
            data: [30, 25, 20, 15, 10]
        }
    },

    // ========================================
    // بيانات الشؤون التنموية (الصحية)
    // ========================================
    health: {
        kpi: {
            hospitals: 24,
            occupancy: 67.5,
            patients: 3847,
            emergency: 156
        },
        barChart: {
            labels: ['مستشفى أ', 'مستشفى ب', 'مستشفى ج', 'مستشفى د', 'مستشفى هـ', 'مستشفى و'],
            occupied: [180, 220, 195, 210, 175, 200],
            available: [70, 80, 55, 90, 75, 50]
        },
        lineChart: {
            labels: ['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'],
            data: [3200, 3450, 3680, 3520, 3790, 3847, 3650]
        }
    },

    // ========================================
    // بيانات وكالة الحقوق
    // ========================================
    rights: {
        kpi: {
            received: 284,
            completed: 87.8,
            avgTime: 3.2,
            satisfaction: 91.5
        },
        pieChart: {
            labels: ['عقود', 'إدارية', 'مالية', 'خدمات', 'أخرى'],
            data: [32, 28, 18, 15, 7]
        },
        barChart: {
            labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو'],
            data: [82, 88, 91, 85, 89, 93]
        }
    }
};

// ========================================
// دالة لتحديث التاريخ والوقت
// ========================================
function updateDateTime() {
    const now = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    const dateString = now.toLocaleDateString('ar-SA', options);
    const timeString = now.toLocaleTimeString('ar-SA', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
    
    document.getElementById('current-date').textContent = `${dateString} - ${timeString}`;
}

// ========================================
// دالة لتنسيق الأرقام
// ========================================
function formatNumber(num) {
    return num.toLocaleString('ar-SA');
}

// ========================================
// دالة لتحديث قيم KPI
// ========================================
function updateKPIValues() {
    // الحج والعمرة
    animateValue('hajj-total', 0, dashboardData.hajj.kpi.total, 2000);
    animateValue('hajj-weekly', 0, dashboardData.hajj.kpi.weekly, 2000);
    animateValue('hajj-occupancy', 0, dashboardData.hajj.kpi.occupancy, 2000, '%');
    animateValue('hajj-buses', 0, dashboardData.hajj.kpi.buses, 2000);

    // الشؤون الأمنية
    animateValue('security-reports', 0, dashboardData.security.kpi.reports, 2000);
    animateValue('security-resolved', 0, dashboardData.security.kpi.resolved, 2000, '%');
    const responseElement = document.getElementById('security-response');
    if (responseElement) {
        animateValue('security-response', 0, dashboardData.security.kpi.response, 2000, ' دقيقة');
    }
    animateValue('security-teams', 0, dashboardData.security.kpi.teams, 2000);

    // الشؤون التنموية
    animateValue('health-hospitals', 0, dashboardData.health.kpi.hospitals, 2000);
    animateValue('health-occupancy', 0, dashboardData.health.kpi.occupancy, 2000, '%');
    animateValue('health-patients', 0, dashboardData.health.kpi.patients, 2000);
    animateValue('health-emergency', 0, dashboardData.health.kpi.emergency, 2000);

    // وكالة الحقوق
    animateValue('rights-received', 0, dashboardData.rights.kpi.received, 2000);
    animateValue('rights-completed', 0, dashboardData.rights.kpi.completed, 2000, '%');
    const avgTimeElement = document.getElementById('rights-avg-time');
    if (avgTimeElement) {
        animateValue('rights-avg-time', 0, dashboardData.rights.kpi.avgTime, 2000, ' يوم', 1);
    }
    animateValue('rights-satisfaction', 0, dashboardData.rights.kpi.satisfaction, 2000, '%');
}

// ========================================
// دالة لتحريك الأرقام (Counter Animation)
// ========================================
function animateValue(id, start, end, duration, suffix = '', decimals = 0) {
    const element = document.getElementById(id);
    if (!element) return;

    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            current = end;
            clearInterval(timer);
        }
        
        const value = decimals > 0 ? current.toFixed(decimals) : Math.floor(current);
        element.textContent = formatNumber(parseFloat(value)) + suffix;
    }, 16);
}

// ========================================
// تحديث البيانات بشكل دوري (اختياري)
// ========================================
function startDataRefresh() {
    // تحديث التاريخ كل دقيقة
    setInterval(updateDateTime, 60000);
    
    // محاكاة تحديث البيانات كل 30 ثانية
    setInterval(() => {
        // يمكن إضافة منطق لتحديث البيانات من API هنا
        console.log('تحديث البيانات...');
    }, 30000);
}

// ========================================
// تصدير البيانات
// ========================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { dashboardData };
}
