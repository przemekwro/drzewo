<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class AuthKey
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        $token = $request -> header('APP_KEY');
        if($token !='A6R9+vE5m2hvXE56fcKvycASwYby62/KEhYEKxi+b1g='){
            return response()-> json(['message'=>'APP_KEY not found'],401);
        }
        return $next($request);
    }
}
