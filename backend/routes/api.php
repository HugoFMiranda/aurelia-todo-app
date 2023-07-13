<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\TodoController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('api')->get('/test', function (Request $request) {
    return response()->json(['message' => 'Hello World, hehehe!']);
});

Route::middleware('api')->get('/test-database', function (Request $request) {
    $results = DB::select('SHOW TABLES');
    return response()->json($results);
});

Route::middleware('api')->group(function () {

    Route::post('/auth/login', [AuthController::class, 'login']);
    Route::post('/auth/signup', [AuthController::class, 'signup']);
    Route::resource('todos', TodoController::class);

    Route::middleware('auth:api')->group(function () {
        Route::post('/auth/logout', [AuthController::class, 'logout']);
        Route::get('/auth/user', function (Request $request) {
            return $request->user();
        });
        Route::get('/auth/refresh', [AuthController::class, 'refresh']);
        Route::get('/auth/check-logged-in-user', [AuthController::class, 'checkLoggedInUser']);
    });
});
