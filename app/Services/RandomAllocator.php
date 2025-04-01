<?php

namespace App\Services;

class RandomAllocator
{
    protected $totalAmount; // Montant total à répartir
    protected $iterations; // Nombre d'itérations
    protected $results;

    public function __construct(float $totalAmount, int $iterations)
    {
        $this->totalAmount = $totalAmount;
        $this->iterations = $iterations;
    }

    /**
     * Générer des montants aléatoires dont la somme ne dépasse pas le montant total.
     *
     * @return array Liste des montants générés
     */
    public function allocate(): array
    {
        $remainingAmount = $this->totalAmount;
        $allocatedAmounts = [];

        for ($i = 0; $i < $this->iterations; $i++) {
            // Si c'est la dernière itération, allouer tout le montant restant
            if ($i === $this->iterations - 1) {
                $allocatedAmounts[] = round($remainingAmount, 2);
                break;
            }

            // Générer un montant aléatoire entre 1 et le montant restant divisé par les itérations restantes
            $maxAmount = $remainingAmount / ($this->iterations - $i);
            $randomAmount = mt_rand(1, (int) ($maxAmount * 100)) / 100;

            // Ajouter le montant généré à la liste
            $allocatedAmounts[] = round($randomAmount, 2);

            // Mettre à jour le montant restant
            $remainingAmount -= $randomAmount;
        }

        $this->results = $allocatedAmounts;

        return $allocatedAmounts;
    }
}
