<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    public function login(Request $request): JsonResponse
    {
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            $token = JWTAuth::fromUser($user);
            return response()->json(['user' => $user, 'token' => $token], 200);
        } else {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
    }

    public function signup(Request $request): JsonResponse
    {
        $credentials = $request->only('name', 'email', 'password');
        $credentials['password'] = bcrypt($credentials['password']);
        $user = User::create($credentials);

        $user->assignRole('user');

        $token = JWTAuth::fromUser($user);
        return response()->json(['user' => $user, 'token' => $token], 200);
    }

    public function logout(Request $request): JsonResponse
    {
        JWTAuth::parseToken()->invalidate();
        return response()->json(['message' => 'Successfully logged out'], 200);
    }

    public function user(Request $request): JsonResponse
    {
        $user = JWTAuth::parseToken()->authenticate();
        return response()->json($user, 200);
    }

    public function refresh(Request $request): JsonResponse
    {
        $token = JWTAuth::getToken();
        $newToken = JWTAuth::refresh($token);
        return response()->json(['token' => $newToken], 200);
    }

    public function checkLoggedInUser(): JsonResponse
    {
        try {
            if (JWTAuth::parseToken()->check()) {
                $user = JWTAuth::parseToken()->authenticate();
                return response()->json(['user' => $user], 200);
            } else {
                return response()->json(['message' => 'No user logged in'], 401);
            }
        } catch (\Throwable $e) {
            return response()->json(['message' => 'No user logged in'], 401);
        }
    }
}
