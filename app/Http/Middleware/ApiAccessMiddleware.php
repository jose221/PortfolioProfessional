<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;

class ApiAccessMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next, ...$types)
    {
        //$token = Auth::user()->remember_token;
        $token = $request->session()->get('auth-token');
        $verifyToken = $this->verifyToken($token);

        if(!$verifyToken){
            $this->guard()->logout();//cierro sesion a proposito

            $request->session()->invalidate();
            $request->session()->regenerateToken();
            //abort(403, "¡No tienes edad para ver este video! le diremos a tus padres.");
            return redirect('admin/login');
        }

        return $next($request);
    }

    protected function guard()
    {
        return Auth::guard();
    }

    protected function verifyToken($token){
        $URL = env('API_HOST', 'http://localhost:8080');
        $client = Http::post($URL."/api/admin/verify-token", [
            'token' => $token
        ]);
        $response = json_decode($client->body());
        return (isset($response->data->access)) ? $response->data->access : false;
    }
}
