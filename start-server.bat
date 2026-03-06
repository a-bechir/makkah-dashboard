@echo off
echo ====================================
echo   تشغيل خادم لوحة المعلومات
echo ====================================
echo.
echo الخادم يعمل على: http://localhost:8000
echo.
echo اضغط Ctrl+C لإيقاف الخادم
echo ====================================
echo.

cd /d "%~dp0"
python -m http.server 8000

pause
