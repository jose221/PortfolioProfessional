<?php

namespace App\Providers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

trait PortfolioApiProvider
{
    private function getApiUrl(): string
    {
        return config('services.api.url', 'http://localhost:8080');
    }

    protected function loginApi(Request $request)
    {
        $client = Http::withoutVerifying()->post($this->getApiUrl()."/api/admin/login", [
            'email' => $request->email,
            'password' => $request->password,
        ]);
        $response = json_decode($client->body());
        return $response;
    }

    protected function logoutApi($token)
    {
        $client = Http::withoutVerifying()->withHeaders([
            'auth-token' => $token
        ])->post($this->getApiUrl()."/api/admin/logout");
        $response = json_decode($client->body());
        return (isset($response->data)) ? $response->data : [];
    }
}
