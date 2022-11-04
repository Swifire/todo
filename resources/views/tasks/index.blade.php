<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Laravel ToDo</title>
    <!-- Fonts -->
    <style>
        body {
            font-family: 'Nunito', sans-serif;
        }
    </style>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body>
<div class="todo">
    <div class="todo__content">
        <h1 class="todo__title">Все задачи</h1>
        <div class="todo__new">
            <input id="new-task" type="text" placeholder="Новая задача">
            <div id="add-task" class="todo__add">+</div>
        </div>
        <div id="tasks" class="todo__list">
            @foreach($tasks as $task)
                <div id="{{ $task->id }}" class="todo__task @if($task->status) todo__task_complete @endif">
                    <label class="todo__checkbox">
                        <input type="checkbox" @if($task->status) checked @endif>
                        <div class="todo__checkbox-div"></div>
                    </label>
                    <div id="edit-task" class="todo__task-edit hide">*</div>
                    <div id="task-title" class="todo__task-title">{{ $task->title }}</div>
                    <input class="todo__task-edit-title hide" type="text" placeholder="{{ $task->title }}">
                    <div id="delete-task" class="todo__task-del">-</div>
                </div>
            @endforeach
        </div>
    </div>
</div>
</body>
</html>
