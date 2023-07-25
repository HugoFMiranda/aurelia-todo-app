# Stage 1: Node.js for npm install and Git for Composer
FROM node:latest as node

# Install Git
RUN apt-get update && apt-get install -y git

WORKDIR /app

COPY package*.json ./

RUN npm install

# Stage 2: PHP image with the built Node.js files and Git
FROM php:8.2

# Install Git, libzip, zip, and unzip
RUN apt-get update && apt-get install -y git libzip-dev zip unzip

# Install the zip PHP extension
RUN docker-php-ext-configure zip && docker-php-ext-install zip pdo pdo_mysql

WORKDIR /app

# Install Composer
RUN curl -sS https://getcomposer.org/installer -o composer-setup.php && \
    php composer-setup.php --install-dir=/usr/local/bin --filename=composer

# Copy built Node.js files and Git from the node stage
COPY --from=node /usr/local/bin/node /usr/local/bin/
COPY --from=node /usr/local/lib/node_modules /usr/local/lib/node_modules
COPY --from=node /app/node_modules ./node_modules
COPY . .

# Continue with the rest of the setup
RUN composer install

RUN php artisan key:generate && php artisan jwt:secret

EXPOSE 8000

CMD ["php", "artisan", "serve", "--host", "0.0.0.0", "--port", "8000"]
