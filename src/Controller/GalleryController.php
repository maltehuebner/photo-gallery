<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Finder\Finder;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class GalleryController extends AbstractController
{
    private const PHOTO_EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp', 'gif'];

    #[Route('/{slug}', name: 'gallery_show', requirements: ['slug' => '.+'])]
    public function show(string $slug): Response
    {
        $photosDir = $this->getParameter('kernel.project_dir') . '/public/photos/' . $slug;

        if (!is_dir($photosDir)) {
            throw $this->createNotFoundException('Galerie nicht gefunden.');
        }

        $finder = new Finder();
        $finder->files()
            ->in($photosDir)
            ->depth(0)
            ->sortByName();

        foreach (self::PHOTO_EXTENSIONS as $ext) {
            $finder->name('*.' . $ext);
        }

        $photos = [];
        foreach ($finder as $file) {
            $photos[] = [
                'filename' => $file->getFilename(),
                'path' => '/photos/' . $slug . '/' . $file->getFilename(),
            ];
        }

        return $this->render('gallery/show.html.twig', [
            'slug' => $slug,
            'photos' => $photos,
        ]);
    }
}
