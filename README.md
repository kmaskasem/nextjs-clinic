This is a [Next.js](https://nextjs.org) project bootstrapped with [`pnpm dlx create-next-app@latest`] which uses [pnpm](https://pnpm.io/) for managing Dependencies.

โปรเจกต์นี้ใช้ [pnpm](https://pnpm.io/) สำหรับจัดการ Dependencies.

[Youtube - CRUD in Next.js Using Zod, Shadcn, Prisma, Mongodb and SWR - Simplified.](https://www.youtube.com/watch?v=dgw029Bm0wQ&ab_channel=AdityaSingh)


## วิธีการติดตั้งและรันโปรเจกต์
### 1. ติดตั้ง pnpm
ถ้ายังไม่มี `pnpm` ให้ติดตั้งผ่าน `npm` หรือ `yarn`:
```bash
npm install -g pnpm
# หรือ
yarn global add pnpm
```

### 2. ติดตั้ง Dependencies
รันคำสั่ง โดยใช้ `pnpm`:
```bash
pnpm install
```
รันคำสั่ง `pnpm dlx prisma db push` เพื่อสร้างไฟล์ Prisma Client ไว้ซิงค์โครงสร้างฐานข้อมูล ทำให้สามารถเรียกใช้คำสั่งกับฐานข้อมูลได้
```bash
pnpm dlx prisma db push
```

### 3. รันโปรเจกต์
สำหรับโหมด Development:
```bash
pnpm dev
```
สำหรับการ Build:
```bash
pnpm build
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
