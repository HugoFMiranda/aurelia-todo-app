import {Todo} from './todo';
import {PLATFORM} from 'aurelia-pal';

export class MyApp {

    configureRouter(config, router){
        config.title = 'Todo-App';
        config.options.pushState = true;
        config.options.root = '/';
        config.map([
            { route: '',              moduleId: PLATFORM.moduleName('home'),   title: 'Select' },
           /* { route: 'contacts/:id',  moduleId: PLATFORM.moduleName('contact-detail'), name:'contacts' }*/
        ]);

        this.router = router;
    }

    constructor() {
        this.todos = [];
        this.todos.push(new Todo('Learn Aurelia'));
        this.todos.push(new Todo('Build an app'));
        this.todos.push(new Todo('Deploy it'));
        this.newTodo = '';
    }

    addTodo() {
        if (this.newTodo) {
            this.todos.push(new Todo(this.newTodo));
            this.newTodo = '';
        }
    }

    rmTodo(todo) {
        this.todos.splice(this.todos.indexOf(todo), 1)
    }
}
