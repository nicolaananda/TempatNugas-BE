FROM node:16

# Bekerja di dalam direktori /app
WORKDIR /app

# Menyalin package.json dan package-lock.json
COPY package*.json ./

# Menginstal dependensi
RUN npm install

# Menyalin seluruh proyek ke dalam kontainer
COPY . .

EXPOSE 8009

# Menjalankan perintah default
CMD ["npm", "run", "dev"]
