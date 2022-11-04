<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;

class ToDoController extends Controller {
    public function index() {
        $tasks = Task::orderById()->get();

        return view('tasks.index', [
            'tasks' => $tasks,
        ]);
    }

    public function store(Request $request) {
        $this->validate($request, [
            'title' => 'required'
        ]);

        Task::create($request->all());

        return response('Success!');
    }

    public function update(Request $request, $id)
    {
        $task = Task::find($id);

        $task->update($request->all());

        return response('Success!');
    }

    public function destroy($id)
    {
        Task::find($id)->delete();

        return response('Success!');
    }
}
