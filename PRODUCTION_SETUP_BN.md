# SBA Automobile — Production Setup (বাংলা)

এই project এখন **Firebase cloud-first** architecture-এ প্রস্তুত করা হয়েছে। পুরোনো demo admin password bypass রাখা হয়নি।

## 1. Firebase Project তৈরি

Firebase Console-এ নতুন project তৈরি করুন এবং একটি Web App যোগ করুন।

## 2. Authentication

Build → Authentication → Sign-in method → Email/Password চালু করুন।

তারপর admin user তৈরি করুন:

- Email: `admin@sba-automobile.jp`
- একটি শক্তিশালী আলাদা password ব্যবহার করুন
- Email verification সম্পন্ন করুন

> এই email-টাই বর্তমানে Firestore/Storage security rules-এ admin হিসেবে অনুমোদিত। অন্য email ব্যবহার করতে চাইলে rules file-এও email পরিবর্তন করতে হবে।

## 3. Firestore

Build → Firestore Database → Create Database → Production Mode.

Project-এর `firestore.rules` Firebase-এ deploy করুন।

## 4. Storage

Build → Storage → Get Started.

Project-এর `storage.rules` deploy করুন। Rules শুধু verified admin-কে vehicle image upload/delete করতে দেয় এবং image upload-এ size/type validation আছে।

## 5. Web App Config

Firebase Project Settings → General → Your apps → Web App থেকে configuration নিয়ে `.env.example` কপি করে `.env.local` বানান:

```bash
cp .env.example .env.local
```

তারপর Firebase-এর Web App values বসান। `.env.local` কখনও GitHub-এ upload করবেন না।

## 6. Firebase CLI

যদি Firebase CLI আগে থেকে না থাকে:

```bash
npm install -g firebase-tools
firebase login
```

Project folder-এর ভিতরে:

```bash
firebase use YOUR_FIREBASE_PROJECT_ID
firebase deploy --only firestore:rules,storage
```

## 7. Local test

```bash
npm install
npm run dev
```

তারপর:

- Public site: `http://localhost:3000`
- Admin: `http://localhost:3000/admin/login`

Firebase config না থাকলে public site demo vehicles দেখাবে, কিন্তু admin login ইচ্ছাকৃতভাবে বন্ধ থাকবে। Firebase config যোগ করার পর cloud inventory চালু হবে।

## 8. Real vehicle add করার আগে

প্রথম real listing দেওয়ার সময় অবশ্যই:

- নিজের vehicle photos দিন
- auction sheet / inspection documents থাকলে যোগ করুন
- exact mileage, year, chassis code লিখুন
- actual price/FOB terms দিন
- Available / Reserved / Sold status ঠিক রাখুন
- demo vehicle আর real vehicle আলাদা করে যাচাই করুন

## 9. গুরুত্বপূর্ণ security rule

Firebase Web config সাধারণত client application-এ ব্যবহৃত হয়; কিন্তু আসল access control Firestore/Storage Security Rules এবং Authentication দিয়ে করতে হবে। কোনো Firebase service-account private key এই project-এ রাখবেন না।
