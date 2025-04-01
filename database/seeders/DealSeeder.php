<?php

namespace Database\Seeders;

use App\Models\Deal;
use App\Models\Review;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;

class DealSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ini_set('memory_limit', '512M'); // Augmente temporairement la mémoire

        $maxDeals = config('app.env') === 'local' ? 100 : 5000;
        $this->seedDeals('artist_data.json', 'artist', $maxDeals);
        $this->seedDeals('track_data.json', 'track', $maxDeals);
        $this->attachReviews();
    }

    private function seedDeals(string $file, string $category, int $maxDeals)
    {
        $jsonData = Storage::disk('local')->get($file);
        $items = collect(json_decode($jsonData, true))->take($maxDeals);

        // Diviser en lots de 500
        $items->chunk(500)->each(function ($chunk) use ($category) {
            $data = [];
            foreach ($chunk as $item) {
                $data[] = [
                    'unique_id' => $item->id,
                    'name' => $item->name,
                    'category' => $category,
                    'spotify_url' => $item->spotify_url,
                    'images' => json_encode($item->images), // Convertir en JSON
                    'tags' => json_encode($category === 'artist' ? $item->genres : $item->available_markets), // JSON
                    'popularity' => $item->popularity,
                    'img_url' => $item->images[0]->url ?? null,
                    'metadata' => json_encode($item->metadata),
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }

            // Insérer en un seul batch (plus rapide)
            DB::table('deals')->insert($data);
        });
    }

    private function attachReviews()
    {
        // Récupérer les deals en lots de 500 pour ne pas tout charger en mémoire
        Deal::query()->chunk(500, function ($deals) {
            $max_reviews = config('app.env') === 'local' ? 3 : 10;

            foreach ($deals as $deal) {
                $reviews = [];
                for ($i = 0; $i < random_int(2, $max_reviews); $i++) {
                    $reviews[] = [
                        'rating' => random_int(1, 5),
                        'created_at' => now(),
                        'updated_at' => now(),
                    ];
                }
                Review::insert($reviews);
                $reviewIds = Review::latest('id')->limit(count($reviews))->pluck('id');
                $deal->reviews()->attach($reviewIds); // Attacher les reviews
            }
        });
    }
}
