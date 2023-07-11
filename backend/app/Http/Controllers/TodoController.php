<?php

namespace App\Http\Controllers;

use App\Http\Requests\todos\DestroyRequest;
use App\Http\Requests\todos\GetAll;
use App\Http\Requests\todos\StoreRequest;
use App\Http\Requests\todos\UpdateRequest;
use App\Models\Todo;
use App\Models\TodoStatuses;
use Illuminate\Http\JsonResponse;

class TodoController extends Controller
{
    public function index(GetAll $request): JsonResponse
    {
        $todos = Todo::orderBy('updated_at', 'desc')->get()->map(function ($todo) {
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
        $todo = Todo::create([
            'text' => $request->get('text'),
            'status_id' => TodoStatuses::firstWhere('name', $request->get('status'))->id,
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
        $todo->update([
            'text' => $request->get('text'),
            'status_id' => TodoStatuses::firstWhere('name', $request->get('status'))->id,
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
