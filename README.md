<img width="1360" alt="Screenshot 2023-11-20 at 15 43 15" src="https://github.com/rominamarmontel/impermanence-next/assets/69083631/1be6fa18-9fee-4fad-a11e-43b5df37994c">

## impermanence films with Next.js Project
I recreated a web application ["impermanence films"](https://www.impermanencefilms.org/) that I previously built using React for the front end and Express for the back end, this time using Next.js 13 and TypeScript. It was my first attempt with Next.js and TypeScript, and I found it to be a very user-friendly framework, especially for front-end development. I could easily perform operations on the database, opting for MongoDB this time, and for the next iteration, I plan to take on the challenge using Prisma.

Please visit my site;
[impermanence films with Next.js 13](https://impermanencefilms-next.vercel.app/)


## Technology
NodeJS, NextJS 13, MongoDB, HTML, CSS, Mongoose, Postman, Cloudinary, Tailwind CSS

## CI/CD
Vercel

## Challenges faced during development:
1. Utilizing Context for state management to switch and retrieve data in both French and English.

2. Wrestling with an error in the @api/auth/[...nextauth]/route during build time. However, overcoming it by creating a new file (auth.ts) and separating it into @api/auth/auth ultimately led to success.
