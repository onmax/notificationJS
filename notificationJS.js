checkErrors = function (notification) {
    if (!notification.debug) notification.debug = true;

    if (!notification.title) {
        notification.title = 'TITLE UNDEFINED';
        if (notification.debug)
            console.warn('NotificationJS: You need to set a title.');
    }

    if (notification.link) {
        if (!notification.link.href)
            if (notification.debug)
                console.error(
                    'NotificationJS: You need to set a link with href property'
                );
    }
    return notification;
};

notficationJS_getDefaults = function () {
    return {
        status: 'info',
        time: 5,
        hide: false,
        animation_duration: 0.2,
        showCloseIcon: true,
        newestOnTop: true,
        debug: true
    };
};

notficationJS_getDefaultsStyles = function () {
    return {
        maxWidth: '375px',
        backgroundColor: '#F1F5F6',
        color: '#242424',
        border: 'none',
        padding: '10px 15px',
        borderRadius: '5px',
        boxShadow: '0px 1px 9px 4px #242424',
        marginTop: '15px',
        width: 'calc(100vw - 80px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        transition: '.3s all ease'
    };
};

notficationJS_getDefaultsStylesTitle = function () {
    return {
        fontSize: '14px',
        fontWeight: '600',
        margin: '',
        padding: '',
        width: '',
        textDecoration: '',
        textTransform: 'uppercase',
        textAlign: '',
        background: '',
        color: ''
    };
};

notficationJS_getDefaultsStylesDescription = function () {
    return {
        fontSize: '14px',
        fontWeight: '',
        margin: '5px 0 0 0',
        padding: '0 0 0 0',
        width: '',
        textDecoration: '',
        textTransform: '',
        textAlign: '',
        background: '',
        color: ''
    };
};

notficationJS_getDefaultsStylesLink = function () {
    return {
        fontSize: '',
        fontWeight: '600',
        margin: '',
        padding: '',
        width: '',
        textDecoration: 'none',
        textTransform: '',
        textAlign: '',
        background: '',
        color: 'inherit'
    };
};

notficationJS_getDefaultsStylesCloseIcon = function () {
    return {
        position: 'absolute',
        height: '3px',
        width: '15px',
        background: '#242424',
        borderRadius: '3px',
        margin: '',
        padding: '',
        right: '10px',
        left: '',
        top: '',
        bottom: ''
    };
};

newNotification = function (notification_user) {
    if (!notification_user) {
        console.error(
            'NotificationJS: You need to set a map with at least a title property like this: '
        );
        console.error(
            'NotificationJS: newNotification({"title":"Your title goes here."})'
        );
        return 0;
    }
    checkErrors(notification_user);

    let notificationStyles = {
        ...notficationJS_getDefaultsStyles(),
        ...notification_user.styles
    };

    let notification = {
        ...notficationJS_getDefaults(),
        ...notification_user
    };
    console.log(notification);


    let div_father = document.createElement('div');


    Object.assign(div_father.style, notificationStyles);
    if (notification.status === 'error')
        div_father.style.borderTop = '5px solid #c0392b';
    if (notification.status === 'ok')
        div_father.style.borderTop = '5px solid #27ae60';

    //left part
    let div_left = document.createElement('div');
    let div_title = document.createElement('div');
    div_left.innerHTML = notification.title;
    let notificationStylesTitle = {
        ...notficationJS_getDefaultsStylesTitle(),
        ...notification_user.titleStyles
    };

    Object.assign(div_title.style, notificationStylesTitle);
    div_left.appendChild(div_title);

    let link = null;
    if (notification.link) {
        if (notification.link.href) {
            link = document.createElement('a');
            link.setAttribute('href', notification.link.href);
            if (notification.link.text == undefined) {
                link.innerHTML = notification.link.href;
                link.text(notification.link.href);
            } else link.innerHTML = notification.link.text;
        }
    }

    if (notification.description) {
        let description;
        if (link != null) {
            let notificationStylesLink = {
                ...notficationJS_getDefaultsStylesLink,
                ...notification_user.linkStyles
            };
            Object.assign(link.style, notificationStylesLink);
            description = document.createElement('div');
            description.innerHTML = notification.description;
            description.append(link);
        } else {
            description = document.createElement('div');
            description.innerHTML = notification.description;
        }
        let notificationStylesDescription = {
            ...notficationJS_getDefaultsStylesDescription(),
            ...notification_user.descriptionStyles
        };
        Object.assign(description.style, notificationStylesDescription);
        div_left.append(description)
    } else if (link != null) div_left.append(link);

    div_father.append(div_left);

    //right part
    if (notification.showCloseIcon) {
        let div_right = document.createElement('div');
        let close_icon_css = {
            ...notficationJS_getDefaultsStylesCloseIcon(),
            ...notification_user.closeIconStyles
        };
        let close_icon = document.createElement('div');
        let close_icon_bar1 = document.createElement('div');
        let close_icon_bar2 = document.createElement('div');
        Object.assign(close_icon_bar1.style, close_icon_css);
        Object.assign(close_icon_bar2.style, close_icon_css);
        close_icon_bar1.style.transform = 'rotate(45deg)';
        close_icon_bar2.style.transform = 'rotate(-45deg)';
        close_icon.append(close_icon_bar1);
        close_icon.append(close_icon_bar2);

        close_icon.addEventListener('click', () => {
            div_father.style.opacity = 0;
            setTimeout(function () {
                div_father.remove();
            }, anim_t + 100);
        });
        div_right.append(close_icon);
        Object.assign(div_right.style, {
            margin: '0 0 0 15px',
            cursor: 'pointer'
        });
        div_father.append(div_right);
    }

    //Show
    let notification_panel;
    if (document.querySelector('.notification-panel') == null) {
        notification_panel = document.createElement('div');
        notification_panel.classList.add('notification-panel');
        let body = document.getElementsByTagName('body')[0];
        body.append(notification_panel);
    } else notification_panel = document.querySelector('.notification-panel');

    let anim_t = notification.animation_duration * 1000;
    notification.newestOnTop ?
        notification_panel.prepend(div_father) :
        notification_panel.append(div_father);

    if (notification.hide) {
        let display_t = notification.time * 1000;
        //Hide
        setTimeout(function () {
            div_father.style.opacity = 0;
            div_father.style.transform = 'scale(0)';
        }, display_t);

        //destroy
        setTimeout(function () {
            div_father.remove();
        }, display_t + anim_t + 100);
    }
};