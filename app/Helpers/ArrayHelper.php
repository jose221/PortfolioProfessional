<?php

namespace App\Helpers;

class ArrayHelper
{
    /**
     * Agrupa items por una propiedad y devuelve solo los valores agrupados (no las claves).
     *
     * @param iterable|array|object $items
     * @param string $property
     * @return array
     */
    public static function groupByAsMatrix($items, string $property): array
    {
        // Si es stdClass lo convertimos a array
        if (is_object($items) && $items instanceof \stdClass) {
            $items = (array)$items;
        }

        // Si es objeto tipo Collection soportado por Laravel
        if (is_object($items) && method_exists($items, 'toArray')) {
            $items = $items->toArray();
        }

        // Si no es iterable ni array, retornamos vacío
        if (!is_array($items) && !($items instanceof \Traversable)) {
            return [];
        }

        $grouped = [];

        foreach ($items as $item) {
            // Permite trabajar tanto con arrays como con objetos
            $value = is_array($item) ? ($item[$property] ?? null) : ($item->$property ?? null);
            if ($value === null) continue;

            $grouped[$value][] = $item;
        }

        return array_values($grouped);
    }

    public static function groupBy($items, string $property): array
    {
        // Si es stdClass lo convertimos a array
        if (is_object($items) && $items instanceof \stdClass) {
            $items = (array)$items;
        }

        // Si es objeto tipo Collection soportado por Laravel
        if (is_object($items) && method_exists($items, 'toArray')) {
            $items = $items->toArray();
        }

        // Si no es iterable ni array, retornamos vacío
        if (!is_array($items) && !($items instanceof \Traversable)) {
            return [];
        }

        $result = [];
        $keys = explode('.', $property);

        foreach ($items as $obj) {
            $value = $obj;

            foreach ($keys as $key) {
                // Compatible con objetos y arrays anidados
                if (is_array($value) && isset($value[$key])) {
                    $value = $value[$key];
                } elseif (is_object($value) && isset($value->$key)) {
                    $value = $value->$key;
                } else {
                    $value = null;
                    break;
                }
            }

            if ($value !== null) {
                if (!isset($result[$value])) {
                    $result[$value] = [];
                }
                $result[$value][] = $obj;
            }
        }

        return $result;
    }

    /**
     * Filtra los items usando una condición callback que debe devolver true o false.
     *
     * @param iterable|array|object $items
     * @param callable $condition
     * @return array
     */
    public static function filter($items, callable $condition): array
    {
        // Si es stdClass lo convertimos a array
        if (is_object($items) && $items instanceof \stdClass) {
            $items = (array)$items;
        }
        // Si es objeto tipo Collection soportado por Laravel
        if (is_object($items) && method_exists($items, 'toArray')) {
            $items = $items->toArray();
        }
        // Si no es iterable ni array, retornamos vacío
        if (!is_array($items) && !($items instanceof \Traversable)) {
            return [];
        }

        $result = [];
        foreach ($items as $key => $item) {
            if ($condition($item, $key)) {
                $result[$key] = $item;
            }
        }
        return $result;
    }
}
