<?php

namespace App\Http\Middleware;

use Closure;

class CacheControl
{
  public function handle($request, Closure $next)
  {
    $response = $next($request);

    $response->header('Cache-Control', 'no-cache, max-age=100');
    // Or whatever you want it to be:
    // $response->header('Cache-Control', 'max-age=100');

    return $response;
  }
}
