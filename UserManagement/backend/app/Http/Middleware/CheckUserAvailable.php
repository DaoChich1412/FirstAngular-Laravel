<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use phpDocumentor\Reflection\Types\Array_;

class CheckUserAvailable
{
    /**
     * Handle an incoming request.
     *
     * @param  Request  $request
     * @param  Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $email = $request->input('email');
        $checkEmail = User::where('email',$email)->where('deleted',0)->get();
        if(count($checkEmail)==0){
            return false;
        }
        return $next($request);
    }
}
