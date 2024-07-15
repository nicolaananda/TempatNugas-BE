FROM node:16

# Bekerja di dalam direktori /app
WORKDIR /app

# Menyalin package.json dan package-lock.json
COPY package*.json ./

# Menginstal dependensi
RUN pnpm install

# Menyalin seluruh proyek ke dalam kontainer
COPY . .

EXPOSE 7001

# Menjalankan perintah default
CMD ["pnpm", "run", "dev"]
