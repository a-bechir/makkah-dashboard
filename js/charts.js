// ========================================
// إعدادات الرسوم البيانية
// ========================================

let chartInstances = {};

// ========================================
// دالة للحصول على الألوان بناءً على النسخة
// ========================================
function getThemeColors() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    
    if (isDark) {
        return {
            primary: '#00D4FF',
            secondary: '#A855F7',
            success: '#00FF88',
            warning: '#FF9500',
            danger: '#FF006E',
            gradient1: ['#00D4FF', '#A855F7'],
            gradient2: ['#A855F7', '#FF006E'],
            gradient3: ['#00FF88', '#00FFF5'],
            gradient4: ['#FF9500', '#FFD700'],
            multiColor: ['#00D4FF', '#A855F7', '#FF006E', '#00FF88', '#FF9500', '#00FFF5'],
            textColor: '#FFFFFF',
            gridColor: 'rgba(255, 255, 255, 0.1)'
        };
    } else {
        return {
            primary: '#165D31',
            secondary: '#D4AF37',
            success: '#28A745',
            warning: '#FFC107',
            danger: '#DC3545',
            gradient1: ['#165D31', '#1B7A3E'],
            gradient2: ['#D4AF37', '#F4D03F'],
            gradient3: ['#28A745', '#20C997'],
            gradient4: ['#B8941F', '#D4AF37'],
            multiColor: ['#165D31', '#D4AF37', '#1B7A3E', '#28A745', '#B8941F', '#F4D03F'],
            textColor: '#1A1A2E',
            gridColor: 'rgba(0, 0, 0, 0.1)'
        };
    }
}

// ========================================
// إعدادات عامة للرسوم البيانية
// ========================================
function getCommonOptions() {
    const colors = getThemeColors();
    
    return {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                labels: {
                    font: {
                        family: 'Cairo',
                        size: 13,
                        weight: '600'
                    },
                    color: colors.textColor,
                    padding: 15,
                    usePointStyle: true
                }
            },
            tooltip: {
                rtl: true,
                textDirection: 'rtl',
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                titleFont: {
                    family: 'Cairo',
                    size: 14,
                    weight: 'bold'
                },
                bodyFont: {
                    family: 'Cairo',
                    size: 13
                },
                padding: 12,
                cornerRadius: 8
            }
        },
        scales: {
            y: {
                ticks: {
                    font: {
                        family: 'Cairo',
                        size: 12
                    },
                    color: colors.textColor
                },
                grid: {
                    color: colors.gridColor
                }
            },
            x: {
                ticks: {
                    font: {
                        family: 'Cairo',
                        size: 12
                    },
                    color: colors.textColor
                },
                grid: {
                    color: colors.gridColor
                }
            }
        }
    };
}

// ========================================
// دالة لإنشاء تدرج لوني
// ========================================
function createGradient(ctx, colors, vertical = true) {
    const gradient = vertical 
        ? ctx.createLinearGradient(0, 0, 0, 400)
        : ctx.createLinearGradient(0, 0, 400, 0);
    
    gradient.addColorStop(0, colors[0]);
    gradient.addColorStop(1, colors[1]);
    return gradient;
}

// ========================================
// مخطط خطي (الحج والعمرة)
// ========================================
function createHajjLineChart() {
    const ctx = document.getElementById('hajj-line-chart').getContext('2d');
    const colors = getThemeColors();
    const data = dashboardData.hajj.lineChart;

    if (chartInstances.hajjLine) {
        chartInstances.hajjLine.destroy();
    }

    chartInstances.hajjLine = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.labels,
            datasets: [{
                label: 'عدد المعتمرين',
                data: data.data,
                borderColor: colors.gradient1[0],
                backgroundColor: createGradient(ctx, [...colors.gradient1, 'transparent']),
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: colors.gradient1[0],
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 5,
                pointHoverRadius: 7
            }]
        },
        options: getCommonOptions()
    });
}

// ========================================
// مخطط دائري (الحج والعمرة)
// ========================================
function createHajjPieChart() {
    const ctx = document.getElementById('hajj-pie-chart').getContext('2d');
    const colors = getThemeColors();
    const data = dashboardData.hajj.pieChart;

    if (chartInstances.hajjPie) {
        chartInstances.hajjPie.destroy();
    }

    chartInstances.hajjPie = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: data.labels,
            datasets: [{
                data: data.data,
                backgroundColor: colors.multiColor,
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        font: {
                            family: 'Cairo',
                            size: 12,
                            weight: '600'
                        },
                        color: colors.textColor,
                        padding: 10,
                        usePointStyle: true
                    }
                },
                tooltip: {
                    rtl: true,
                    textDirection: 'rtl',
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleFont: {
                        family: 'Cairo',
                        size: 14
                    },
                    bodyFont: {
                        family: 'Cairo',
                        size: 13
                    },
                    callbacks: {
                        label: function(context) {
                            return context.label + ': ' + context.parsed + '%';
                        }
                    }
                }
            }
        }
    });
}

// ========================================
// مخطط مساحي (الشؤون الأمنية)
// ========================================
function createSecurityAreaChart() {
    const ctx = document.getElementById('security-area-chart').getContext('2d');
    const colors = getThemeColors();
    const data = dashboardData.security.areaChart;

    if (chartInstances.securityArea) {
        chartInstances.securityArea.destroy();
    }

    chartInstances.securityArea = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.labels,
            datasets: [{
                label: 'البلاغات اليومية',
                data: data.data,
                borderColor: colors.success,
                backgroundColor: createGradient(ctx, [colors.success, 'transparent']),
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: colors.success,
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 5,
                pointHoverRadius: 7
            }]
        },
        options: getCommonOptions()
    });
}

// ========================================
// مخطط دائري مفرغ (الشؤون الأمنية)
// ========================================
function createSecurityDoughnutChart() {
    const ctx = document.getElementById('security-doughnut-chart').getContext('2d');
    const colors = getThemeColors();
    const data = dashboardData.security.doughnutChart;

    if (chartInstances.securityDoughnut) {
        chartInstances.securityDoughnut.destroy();
    }

    chartInstances.securityDoughnut = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: data.labels,
            datasets: [{
                data: data.data,
                backgroundColor: colors.multiColor,
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        font: {
                            family: 'Cairo',
                            size: 12,
                            weight: '600'
                        },
                        color: colors.textColor,
                        padding: 10,
                        usePointStyle: true
                    }
                },
                tooltip: {
                    rtl: true,
                    textDirection: 'rtl',
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleFont: {
                        family: 'Cairo',
                        size: 14
                    },
                    bodyFont: {
                        family: 'Cairo',
                        size: 13
                    },
                    callbacks: {
                        label: function(context) {
                            return context.label + ': ' + context.parsed + '%';
                        }
                    }
                }
            }
        }
    });
}

// ========================================
// مخطط أعمدة (الشؤون التنموية)
// ========================================
function createHealthBarChart() {
    const ctx = document.getElementById('health-bar-chart').getContext('2d');
    const colors = getThemeColors();
    const data = dashboardData.health.barChart;

    if (chartInstances.healthBar) {
        chartInstances.healthBar.destroy();
    }

    chartInstances.healthBar = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.labels,
            datasets: [
                {
                    label: 'أسرّة مشغولة',
                    data: data.occupied,
                    backgroundColor: colors.gradient1[0],
                    borderRadius: 6
                },
                {
                    label: 'أسرّة متاحة',
                    data: data.available,
                    backgroundColor: colors.gradient2[0],
                    borderRadius: 6
                }
            ]
        },
        options: getCommonOptions()
    });
}

// ========================================
// مخطط خطي (الشؤون التنموية)
// ========================================
function createHealthLineChart() {
    const ctx = document.getElementById('health-line-chart').getContext('2d');
    const colors = getThemeColors();
    const data = dashboardData.health.lineChart;

    if (chartInstances.healthLine) {
        chartInstances.healthLine.destroy();
    }

    chartInstances.healthLine = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.labels,
            datasets: [{
                label: 'عدد المراجعين',
                data: data.data,
                borderColor: colors.gradient3[0],
                backgroundColor: createGradient(ctx, [...colors.gradient3, 'transparent']),
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: colors.gradient3[0],
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 5,
                pointHoverRadius: 7
            }]
        },
        options: getCommonOptions()
    });
}

// ========================================
// مخطط دائري (وكالة الحقوق)
// ========================================
function createRightsPieChart() {
    const ctx = document.getElementById('rights-pie-chart').getContext('2d');
    const colors = getThemeColors();
    const data = dashboardData.rights.pieChart;

    if (chartInstances.rightsPie) {
        chartInstances.rightsPie.destroy();
    }

    chartInstances.rightsPie = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: data.labels,
            datasets: [{
                data: data.data,
                backgroundColor: colors.multiColor,
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        font: {
                            family: 'Cairo',
                            size: 12,
                            weight: '600'
                        },
                        color: colors.textColor,
                        padding: 10,
                        usePointStyle: true
                    }
                },
                tooltip: {
                    rtl: true,
                    textDirection: 'rtl',
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleFont: {
                        family: 'Cairo',
                        size: 14
                    },
                    bodyFont: {
                        family: 'Cairo',
                        size: 13
                    },
                    callbacks: {
                        label: function(context) {
                            return context.label + ': ' + context.parsed + '%';
                        }
                    }
                }
            }
        }
    });
}

// ========================================
// مخطط أعمدة (وكالة الحقوق)
// ========================================
function createRightsBarChart() {
    const ctx = document.getElementById('rights-bar-chart').getContext('2d');
    const colors = getThemeColors();
    const data = dashboardData.rights.barChart;

    if (chartInstances.rightsBar) {
        chartInstances.rightsBar.destroy();
    }

    chartInstances.rightsBar = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.labels,
            datasets: [{
                label: 'نسبة الإنجاز %',
                data: data.data,
                backgroundColor: colors.gradient2[0],
                borderRadius: 6
            }]
        },
        options: getCommonOptions()
    });
}

// ========================================
// دالة لإنشاء جميع الرسوم البيانية
// ========================================
function initializeCharts() {
    createHajjLineChart();
    createHajjPieChart();
    createSecurityAreaChart();
    createSecurityDoughnutChart();
    createHealthBarChart();
    createHealthLineChart();
    createRightsPieChart();
    createRightsBarChart();
}

// ========================================
// دالة لتحديث الرسوم عند تغيير النسخة
// ========================================
function updateChartsTheme() {
    initializeCharts();
}
