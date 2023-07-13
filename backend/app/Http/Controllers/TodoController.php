<?php

namespace App\Http\Controllers;

use App\Http\Requests\todos\DestroyRequest;
use App\Http\Requests\todos\GetAll;
use App\Http\Requests\todos\StoreRequest;
use App\Http\Requests\todos\UpdateRequest;
use App\Models\Todo;
use App\Models\TodoStatuses;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class TodoController extends Controller
{
    public function index(GetAll $request): JsonResponse
    {
        $todos = Todo::where('user_id', Auth::user()->id)
            ->orderBy('updated_at', 'desc')
            ->get()
            ->map(function ($todo) {
                return [
                    'id' => $todo->id,
                    'text' => $todo->text,
                    'status' => $todo->status->name,
                    'created_at' => $todo->created_at->format('d-m-Y'),
                    'updated_at' => $todo->updated_at->format('d-m-Y'),
                ];
            });

        return response()->json($todos);
    }


    public function store(StoreRequest $request)
    {
        $user = Auth::user();
        $todo = Todo::create([
            'text' => $request->get('text'),
            'status_id' => TodoStatuses::firstWhere('name', $request->get('status'))->id,
            'user_id' => $user->id,
        ]);

        return response()->json([
            'message' => 'Todo created successfully',
            'todo' => [
                'id' => $todo->id,
                'text' => $todo->text,
                'status' => $todo->status->name,
                'created_at' => $todo->created_at->format('d-m-Y'),
                'updated_at' => $todo->updated_at->format('d-m-Y'),
            ],
        ]);
    }

    public function show()
    {
        //
    }

    public function update(UpdateRequest $request, Todo $todo)
    {
        $user = Auth::user();
        $todo->update([
            'text' => $request->get('text'),
            'status_id' => TodoStatuses::firstWhere('name', $request->get('status'))->id,
            'user_id' => $user->id,
        ]);

        return response()->json([
            'message' => 'Todo updated successfully',
        ]);
    }

    public function destroy(DestroyRequest $request, Todo $todo): JsonResponse
    {
        $todo->delete();

        return response()->json([
            'message' => 'Todo deleted successfully',
        ]);
    }
}
