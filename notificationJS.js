class NotificationJS {
    constructor(notification_user) {
        if (!notification_user) {
            console.error(
                'NotificationJS: You need to set a JSON with at least a title property like this:\n\tnewNotification({"title":"Your title goes here."})'
            );
            return 0;
        }
        this.notification = null;
        this.info = {
            ...this.getDefaultInfo(),
            ...notification_user
        }
        this.styles = {
            ...this.getDefaultStyles(),
            ...this.info.styles
        }
        this.checkErrors()
        this.createNotification()
    }

    createNotification() {
        this.notification = document.createElement('div');

        Object.assign(this.notification.style, this.styles.general);
        if (this.info.status === 'error')
            this.notification.style.borderTop = '5px solid #c0392b';
        else if (this.info.status === 'ok')
            this.notification.style.borderTop = '5px solid #27ae60';

        this.notification.appendChild(this.setContent())
        if (this.info.showCloseIcon)
            this.notification.appendChild(this.setCloseIcon())
        this.a(this.notification)
    }

    setContent() {
        let content = document.createElement('div');
        let title = document.createElement('div');
        content.innerHTML = this.info.title;
        Object.assign(title.style, this.styles.title);
        content.appendChild(title);

        let link = null;
        if (this.info.link) {
            if (this.info.link.href) {
                link = document.createElement('a');
                link.setAttribute('href', this.info.link.href);
                link.innerHTML = this.info.link.text === undefined ?
                    this.info.link.href : this.info.link.text;
            }
        }

        if (this.info.description) {
            let description;
            description = document.createElement('div');
            description.innerHTML = this.info.description;
            if (link !== null) {
                Object.assign(link.style, this.styles.link);
                description.append(link);
            }

            Object.assign(description.style, this.styles.description);
            content.append(description)
        } else if (link != null) content.append(link);

        return content;
    }

    setCloseIcon() {
        let close_icon = document.createElement('div');
        for (let i = -45; i <= 45; i += 90) {
            let bar = document.createElement('div');
            Object.assign(bar.style, this.styles.close_icon);
            bar.style.transform = `rotate(${i}deg)`;
            close_icon.append(bar);
        }

        close_icon.addEventListener('click', () => {
            let notification = this.notification;
            notification.style.opacity = 0;
            setTimeout(function () {
                notification.outerHTML = "";;
            }, this.info.animation_duration * 1000 + 100);
        });

        Object.assign(close_icon.style, {
            margin: '0 0 0 15px',
            cursor: 'pointer'
        });
        return close_icon
    }

    a(notificationContainer) {
        let notification_panel;
        if (document.querySelector('.notification-panel') == null) {
            notification_panel = document.createElement('div');
            notification_panel.classList.add('notification-panel');
            let body = document.getElementsByTagName('body')[0];
            body.append(notification_panel);
        } else notification_panel = document.querySelector('.notification-panel');

        let anim_t = this.info.animation_duration * 1000;
        this.info.newestOnTop ?
            notification_panel.prepend(notificationContainer) :
            notification_panel.append(notificationContainer);

        if (this.info.hide) {
            let display_t = this.info.time * 1000;
            //Hide
            setTimeout(function () {
                notificationContainer.style.opacity = 0;
            }, display_t);

            //destroy
            setTimeout(function () {
                notificationContainer.remove();
            }, display_t + anim_t + 100);
        }
    }

    checkErrors() {
        if (!this.info.debug) this.info.debug = true;

        if (!this.info.title) {
            this.info.title = 'TITLE UNDEFINED';
            if (this.info.debug)
                console.warn('NotificationJS: You need to set a title.');
        }

        if (this.info.link) {
            if (!this.info.link.href)
                if (this.info.debug)
                    console.error(
                        'NotificationJS: You need to set a link with href property'
                    );
        }
    };

    getDefaultInfo() {
        return {
            status: 'info',
            time: 5,
            hide: true,
            animation_duration: 0.2,
            showCloseIcon: true,
            newestOnTop: true,
            debug: true
        };
    };

    getDefaultStyles() {
        return {
            general: {
                maxWidth: '375px',
                backgroundColor: '#F1F5F6',
                color: '#242424',
                border: 'none',
                padding: '10px 15px',
                borderRadius: '5px',
                boxShadow: 'rgba(36, 36, 36, 0.23) 0px 1px 9px 4px',
                marginTop: '15px',
                width: 'calc(100vw - 80px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                transition: '.3s all ease'
            },
            title: {
                fontSize: '14px',
                fontWeight: '600',
                textTransform: 'uppercase'
            },
            description: {
                fontSize: '14px',
                margin: '5px 0 0 0'
            },
            link: {
                fontWeight: '600',
                textDecoration: 'none',
                color: 'inherit'
            },
            close_icon: {
                position: 'absolute',
                height: '3px',
                width: '15px',
                background: '#242424',
                borderRadius: '3px',
                right: '10px',
            }
        };
    };
}
