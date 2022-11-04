import './bootstrap';
import axios from "axios";
import Swal from 'sweetalert2'

const dom = {
    new: document.getElementById('new-task'),
    add: document.getElementById('add-task'),
    tasks: document.getElementById('tasks')
}

// Отслеживаем клик по кнопке добавления задачи
dom.add.onclick = () => {
    const title = dom.new.value;

    if (title) {
        addTask(title)
    }
}

dom.tasks.onclick = (event) => {
    const target = event.target;
    const isCheckboxElement = target.classList.contains('todo__checkbox-div');
    const isEditElement = target.classList.contains('todo__task-title');
    const isDeleteElement = target.classList.contains('todo__task-del');
    const isEditButton = target.classList.contains('todo__task-edit');

    if (isCheckboxElement) {
        const status = target.previousElementSibling.checked;
        const taskId = target.parentElement.parentElement.getAttribute('id');

        toggleStatus(taskId, !status);
    }

    if (isEditElement) {
        const status = target.previousElementSibling.previousElementSibling.firstElementChild.checked;
        if (!status) {
            const title = target;
            const editTitle = target.nextElementSibling;
            const editButton = target.previousElementSibling

            title.classList.add('hide');
            editTitle.classList.remove('hide');
            editButton.classList.remove('hide');
        }
    }

    if (isEditButton) {
        const editButton = target;
        const title = target.nextElementSibling;
        const editTitle = title.nextElementSibling;

        const taskId = target.parentElement.getAttribute('id');
        const titleText = editTitle.value;
        const oldText = title.textContent;
        const status = target.previousElementSibling.firstElementChild.checked;

        editButton.classList.add('hide');
        editTitle.classList.add('hide');
        title.classList.remove('hide');
        editTitle.value = '';

        if (titleText && titleText !== oldText) {
            editTask(taskId, titleText, status);
        }
    }

    if (isDeleteElement) {
        Swal.fire({
            title: 'Вы хотите удалить задачу?',
            showCancelButton: true,
            confirmButtonText: 'Удалить',
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                const taskId = target.parentElement.getAttribute('id');
                deleteTask(taskId)
                Swal.fire('Удалено!', '', 'success').then((result) => {
                    if (result.isConfirmed) {
                        location.reload();
                    }
                })
            }
        })
    }
}

// Функция добавления задачи
function addTask(title) {
    axios.post('/api/add', {
        title: title,
        status: false,
    }).then(respond => {
        location.reload()
    });
}

// Функция смены статуса
function toggleStatus(id, status) {
    axios.patch(`/api/${id}`, {
        status: status
    }).then(respond => {
        location.reload()
    });
}

// Функция обновления записи
function editTask(id, title, status) {
    axios.patch(`/api/${id}`, {
        title: title,
        status: status
    }).then(respond => {
        location.reload()
    });
}

// Функция удаления задачи
function deleteTask(id) {
    axios.delete(`/api/${id}`);
}
