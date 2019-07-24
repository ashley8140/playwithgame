import toast from './toast'
export default {
    install(Vue) {
        const Toast = Vue.extend(toast);
        const instance = new Toast();
        instance.$mount(document.createElement('div'));
        document.body.appendChild(instance.$el);
        let timer;
        Vue.prototype.$toast = {
            message(msg, type, duration) {
                clearTimeout(timer);
                timer = setTimeout(() => {
                    instance.visible = false;
                }, duration);
                instance.message = msg;
                instance.visible = true;
                instance.type = type;
            },
            success(msg, duration = 2000) {
                this.message(msg, 1, duration)
            },
            error(msg, duration = 2000) {
                this.message(msg, 2, duration)
            }
        }
    }
}
