Travel Trucks

🌐 Опис проєкту

Travel Trucks — це веб-додаток для оренди кемперів, який дозволяє користувачам переглядати доступні кемпери, фільтрувати їх за різними параметрами, переглядати детальну інформацію та залишати бронювання.

Проєкт розроблено з використанням React, Redux, React Router та Axios. В якості бекенду використовується MockAPI.

✨ Основні функціональності

Домашня сторінка з банером та CTA-кнопкою "View Now"

Каталог кемперів з фільтрацією за:

Локацією

Типом кузова

Додатковими зручностями (AC, кухня, TV тощо)

Додавання кемпера до списку обраних (збереження в локальному сховищі)

Детальна сторінка кемпера з:

Характеристиками

Галереєю зображень

Відгуками користувачів

Формою для бронювання

Логіка пагінації (кнопка "Load More")

⚡ Технології

Frontend: React, Redux, React Router, Axios

CSS: CSS Modules / Styled Components

Deployment: Vercel / Netlify

🛠️ API-ендпоінти

Проєкт використовує готовий бекенд API: MockAPI

GET /campers - отримати всі кемпери (фільтрація виконується на бекенді)

GET /campers/:id - отримати інформацію про конкретний кемпер

Встановлення та запуск

1. Склонуйте репозиторій

git clone https://github.com/chasov-artem/TravelTrucks
cd travel-trucks

2. Встановіть залежності

npm install

3. Запустіть локальний сервер

npm run dev

4. Відкрийте в браузері

http://localhost:5173

Author:
Chasov Artem
Email: chasov90@gmail.com
GitHub: https://github.com/chasov-artem
LinkedIn: www.linkedin.com/in/artem-chasov-504a351aa
