<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;
    protected function jsonResponse($message, $data = null, $errors = null, $status = 200) {
        return response()->json([
            'message'=>$message,
            'data'=>$data,
            'errors'=>$errors
        ], $status);
    }
}
