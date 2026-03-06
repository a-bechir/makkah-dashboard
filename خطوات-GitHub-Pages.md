# 🚀 دليل نشر لوحة المعلومات على GitHub Pages
## خطوة بخطوة بالتفصيل

---

## 📋 المتطلبات الأولية

قبل البدء، تأكد من توفر:
- [ ] حساب على GitHub.com (مجاني)
- [ ] Git مثبت على جهازك

---

## الجزء الأول: التحقق من Git وتثبيته (إذا لزم)

### الخطوة 1️⃣: التحقق من Git

افتح PowerShell واكتب:

```powershell
git --version
```

**✅ إذا ظهر رقم الإصدار:** Git مثبت، انتقل للجزء الثاني

**❌ إذا ظهرت رسالة خطأ:** قم بتثبيت Git من الرابط التالي:
- 🔗 https://git-scm.com/download/win
- حمّل النسخة وثبتها بالإعدادات الافتراضية
- أعد تشغيل PowerShell بعد التثبيت

---

## الجزء الثاني: إنشاء حساب GitHub

### الخطوة 2️⃣: التسجيل في GitHub

1. افتح: https://github.com/signup
2. أدخل البريد الإلكتروني
3. اختر كلمة مرور قوية
4. اختر اسم مستخدم (مثال: `makkah-emirate`)
5. أكمل التحقق وفعّل الحساب من البريد

**⚠️ ملاحظة:** احفظ اسم المستخدم، ستحتاجه لاحقاً

---

## الجزء الثالث: إنشاء المستودع (Repository)

### الخطوة 3️⃣: إنشاء مستودع جديد

1. بعد تسجيل الدخول، انقر على زر **+** في الأعلى
2. اختر **New repository**

3. املأ المعلومات:
   ```
   Repository name: makkah-dashboard
   Description: لوحة معلومات إمارة منطقة مكة المكرمة
   ✅ Public (عام)
   ⬜ لا تضع علامة على Add README
   ```

4. انقر **Create repository**

**📝 سيظهر لك رابط المستودع مثل:**
```
https://github.com/YOUR-USERNAME/makkah-dashboard
```

---

## الجزء الرابع: ربط المشروع مع Git

### الخطوة 4️⃣: فتح PowerShell في مجلد المشروع

```powershell
# الانتقال إلى مجلد المشروع
cd C:\Users\hp\Desktop\MakkahRegion
```

### الخطوة 5️⃣: تهيئة Git

```powershell
# بدء مستودع Git محلي
git init
```

**✅ يجب أن ترى:** `Initialized empty Git repository`

### الخطوة 6️⃣: إضافة جميع الملفات

```powershell
# إضافة جميع الملفات للتتبع
git add .
```

### الخطوة 7️⃣: إنشاء أول Commit

```powershell
# حفظ التغييرات مع رسالة
git commit -m "Initial commit: Dashboard v1.0"
```

**✅ يجب أن ترى:** رسائل تأكيد بإنشاء الملفات

### الخطوة 8️⃣: تغيير اسم الفرع إلى main

```powershell
# تسمية الفرع الرئيسي
git branch -M main
```

---

## الجزء الخامس: رفع المشروع إلى GitHub

### الخطوة 9️⃣: ربط المستودع المحلي بـ GitHub

**⚠️ استبدل YOUR-USERNAME باسم المستخدم الخاص بك:**

```powershell
# ربط المستودع البعيد
git remote add origin https://github.com/YOUR-USERNAME/makkah-dashboard.git
```

**مثال:**
```powershell
git remote add origin https://github.com/makkah-emirate/makkah-dashboard.git
```

### الخطوة 🔟: رفع الملفات إلى GitHub

```powershell
# رفع الملفات
git push -u origin main
```

**📝 ملاحظة:** 
- سيُطلب منك تسجيل الدخول
- قد تحتاج إلى إنشاء Personal Access Token بدلاً من كلمة المرور
- سأشرح كيفية إنشاء Token في القسم التالي إذا احتجته

**✅ إذا نجح:** ستظهر رسالة `Branch 'main' set up to track remote branch`

---

## الجزء السادس: تفعيل GitHub Pages

### الخطوة 1️⃣1️⃣: الذهاب إلى إعدادات المستودع

1. افتح المستودع على GitHub
2. انقر على تبويب **Settings** (الإعدادات)
3. من القائمة الجانبية اليسرى، انقر على **Pages**

### الخطوة 1️⃣2️⃣: تفعيل GitHub Pages

في صفحة Pages:

```
Source (المصدر):
  Branch: main
  Folder: / (root)
```

انقر **Save**

### الخطوة 1️⃣3️⃣: انتظر النشر

- ستظهر رسالة: "Your site is being published at..."
- انتظر 1-2 دقيقة
- أعد تحميل الصفحة

**✅ عند النجاح، سيظهر:**
```
✅ Your site is live at https://YOUR-USERNAME.github.io/makkah-dashboard/
```

---

## 🎉 النتيجة النهائية

بعد اكتمال جميع الخطوات، سيكون لديك:

### 🔗 رابط اللوحة المباشر:
```
https://YOUR-USERNAME.github.io/makkah-dashboard/
```

### 🔗 رابط المستودع:
```
https://github.com/YOUR-USERNAME/makkah-dashboard
```

---

## 📝 ملاحظات مهمة

### إنشاء Personal Access Token (إذا طُلب منك)

إذا طُلب منك Token بدلاً من كلمة المرور:

1. اذهب إلى: https://github.com/settings/tokens
2. انقر **Generate new token** > **Generate new token (classic)**
3. أدخل اسم للتوكن: `MakkahDashboard`
4. اختر الصلاحيات:
   - ✅ repo (جميع الصلاحيات)
5. انقر **Generate token**
6. **⚠️ مهم:** انسخ التوكن فوراً (لن يظهر مرة أخرى!)
7. استخدمه بدلاً من كلمة المرور عند الرفع

### حفظ بيانات الدخول (اختياري)

لتجنب إدخال البيانات كل مرة:

```powershell
git config --global credential.helper wincred
```

---

## 🔄 تحديث اللوحة لاحقاً

عند تعديل أي ملف في المشروع:

```powershell
# 1. الانتقال للمجلد
cd C:\Users\hp\Desktop\MakkahRegion

# 2. إضافة التعديلات
git add .

# 3. حفظ التعديلات
git commit -m "تحديث: وصف التعديل"

# 4. رفع التحديثات
git push
```

**✅ سيتم تحديث الموقع تلقائياً خلال 1-2 دقيقة**

---

## ❓ حل المشاكل الشائعة

### المشكلة 1: Git غير موجود
```
الحل: ثبّت Git من https://git-scm.com/download/win
```

### المشكلة 2: رفض الوصول (Permission denied)
```
الحل: استخدم Personal Access Token بدلاً من كلمة المرور
```

### المشكلة 3: الموقع لا يعمل (404)
```
الحل: 
1. تأكد من اسم الملف: index.html (بحروف صغيرة)
2. انتظر 2-3 دقائق إضافية
3. امسح ذاكرة التخزين المؤقت (Ctrl + Shift + R)
```

### المشكلة 4: التنسيقات لا تعمل
```
الحل: تأكد من رفع مجلدات css و js كاملة
```

---

## 📞 الدعم

إذا واجهت أي مشكلة:
1. تحقق من رسائل الخطأ في PowerShell
2. تأكد من اتباع الخطوات بالترتيب
3. تحقق من صفحة Actions في GitHub للأخطاء

---

## ✅ قائمة التحقق النهائية

قبل المشاركة مع المستفيد، تأكد من:

- [ ] الرابط يعمل بشكل صحيح
- [ ] التبويبات الأربعة تعمل
- [ ] الرسوم البيانية تظهر
- [ ] زر التبديل بين النسختين يعمل
- [ ] الصفحة متجاوبة على الجوال

---

## 🎯 الخطوات التالية

بعد نشر اللوحة:

1. ✅ شارك الرابط مع المستفيد
2. ✅ اطلب تقييماً وملاحظات
3. ✅ قم بالتحديثات حسب الملاحظات
4. ✅ ادفع التحديثات بالأوامر أعلاه

---

**🎉 مبروك! لوحة معلوماتك الآن على الإنترنت!**

الرابط سيكون:
```
https://YOUR-USERNAME.github.io/makkah-dashboard/
```

استبدل `YOUR-USERNAME` باسم المستخدم الخاص بك على GitHub.

---

**صُنع بـ ❤️ للمملكة العربية السعودية**
