<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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

        $this->guard()->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();
        //abort(403, "¡No tienes edad para ver este video! le diremos a tus padres.");
        return redirect('admin/login');
        return $next($request);
    }

    protected function guard()
    {
        return Auth::guard();
    }
    protected function verifyToken(){
        $client = new \GuzzleHttp\Client();
    }
}
