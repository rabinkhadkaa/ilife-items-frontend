FROM php:8.2-apache

# Enable required Apache features
RUN docker-php-ext-install mysqli pdo pdo_mysql
RUN a2enmod rewrite

WORKDIR /var/www/html

# Copy full backend folder
COPY . .

# Make Apache serve Slim from /public
RUN sed -i "s|DocumentRoot /var/www/html|DocumentRoot /var/www/html/public|g" /etc/apache2/sites-available/000-default.conf
RUN sed -i "s|<Directory /var/www/>|<Directory /var/www/html/public/>|g" /etc/apache2/apache2.conf

# Allow URL rewriting for Slim routes
RUN echo '<Directory "/var/www/html/public">\n    AllowOverride All\n    Require all granted\n</Directory>' >> /etc/apache2/apache2.conf

EXPOSE 80
CMD ["apache2-foreground"]
