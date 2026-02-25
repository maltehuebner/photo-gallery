# Tegtmeier Fotogalerie

Symfony-8-Anwendung zur Bereitstellung von Event-Fotos mit quadratischen Thumbnails und Lightbox.

## Voraussetzungen

- PHP 8.5
- Composer
- GD- oder Imagick-Extension fuer PHP

## Installation

```bash
composer install
```

## Fotos bereitstellen

Fotos in den Ordner `public/photos/{slug}/` kopieren. Der Slug wird als URL-Pfad verwendet:

```
public/photos/2026-02-25/         -> photos.maltehuebner.de/2026-02-25
public/photos/sommerfest-2026/    -> photos.maltehuebner.de/sommerfest-2026
```

Unterstuetzte Formate: JPG, JPEG, PNG, WebP, GIF.

## Thumbnails generieren

Nach dem Hochladen der Fotos die Thumbnails vorberechnen:

```bash
php bin/console liip:imagine:cache:resolve $(ls public/photos/{slug}/) --filter=square_thumb
```

Alternativ werden Thumbnails beim ersten Seitenaufruf automatisch generiert.

## Entwicklungsserver

```bash
php -S localhost:8000 -t public/
```

Dann im Browser oeffnen: `http://localhost:8000/{slug}`
