if (!window.jQuery) {
    var jQuery = document.createElement('script')
    jQuery.src = "https://code.jquery.com/jquery-latest.min.js"
    document.head.appendChild(jQuery)
}



checkErrors = function(notification) {
    if (!notification.debug)
        notification.debug = true

    if (!notification.title) {
        notification.title = 'TITLE UNDEFINED'
        if (notification.debug) {
            console.warn("NotificationJS: You need to set a title.")
        }
    }

    if (notification.link) {
        if (!notification.link.href)
            if (notification.debug) {
                console.error("NotificationJS: You need to set a link with href property")
            }
    }


    return notification

}
notficationJS_getDefaults = function(){
    return {                   
        status:"info",   
        time:5,                                                 
        hide:true,                                                
        animation_duration:0.2,                                   
        showCloseIcon: true,                                     
        newestOnTop: true,                                       
        debug: true                                    
    }
}
notficationJS_getDefaultsStyles = function(){
    return {
        maxWidth:"375px",
        backgroundColor:"#F1F5F6",
        color:"#242424",
        border:"none",
        padding:"10px 15px",
        borderRadius:"5px",
        boxShadow:"0px 1px 9px 4px #242424",
        marginTop:"15px",
        width:"calc(100vw - 80px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
    }
}
notficationJS_getDefaultsStylesTitle = function(){
    return {
        fontSize: "14px",
        fontWeight: "600",
        margin: "",
        padding: "",
        width: "",
        textDecoration: "",
        textTransform: "uppercase",
        textAlign: "",
        background: "",
        color: ""
    }
}
notficationJS_getDefaultsStylesDescription = function(){
    return {
        fontSize: "14px",
        fontWeight: "",
        margin: "5px 0 0 0",
        padding: "0 0 0 0",
        width: "",
        textDecoration: "",
        textTransform: "",
        textAlign: "",
        background: "",
        color: ""
    }
}
notficationJS_getDefaultsStylesLink = function(){
    return {
        fontSize: "",
        fontWeight: "600",
        margin: "",
        padding: "",
        width: "",
        textDecoration: "none",
        textTransform: "",
        textAlign: "",
        background: "",
        color: "inherit"
    }
}

notficationJS_getDefaultsStylesCloseIcon = function(){
    return({
        position: "absolute",
        height: "3px",
        width: "15px",
        background: "#242424",
        borderRadius: "3px",
        margin: "",
        padding: "",
        right: "10px",
        left: "",
        top: "",
        bottom: ""
    })
}


newNotification = function(notification_user){
    if(!notification_user){
        console.error("NotificationJS: You need to set a map with at least a title property like this: ")
        console.error("NotificationJS: newNotification({\"title\":\"Your title goes here.\"})")
        return 0
    }
    checkErrors(notification_user)
    
    let notificationStyles = $.extend({},notficationJS_getDefaultsStyles(),notification_user.styles)
    let notification = $.extend({},notficationJS_getDefaults(),notification_user)
    let div_father = $(`<div class="notification-panel__item notification__${notification.status}"></div>`)

    div_father.css(notificationStyles)

    if(notification.status == "error")
        div_father.css("borderTop","5px solid #c0392b")
    if(notification.status == "ok")
        div_father.css("borderTop","5px solid #27ae60")

    //left part
    let div_left = $('<div class="notification-left"></div>')
    let div_title = $(`<div class="notification__title">${notification.title}</div>`)
    let notificationStylesTitle = $.extend({},notficationJS_getDefaultsStylesTitle(),notification_user.titleStyles)
    div_title.css(notificationStylesTitle)
    div_title.appendTo(div_left)


    let link = null
    if (notification.link) {
        if (notification.link.href) {
            link = $(`<a class="notification__link" href="${notification.link.href}"></a>`)
            if (notification.link.text == undefined) {
                link.text(notification.link.href)
            }
            else {
                link.text(notification.link.text)
            }
        }
    }

    if (notification.description) {
        let description
        if (link != null) {
            let notificationStylesLink = $.extend({},notficationJS_getDefaultsStylesLink(),notification_user.linkStyles)
            link.css(notificationStylesLink)
            description = $(`<div class="notification__description">${notification.description} </div>`)
            link.appendTo(description)
        }
        else {
            description = $(`<div class="notification__description">${notification.description}</div>`)
        }
        let notificationStylesDescription = $.extend({},notficationJS_getDefaultsStylesDescription(),notification_user.descriptionStyles)
        description.css(notificationStylesDescription)
        description.appendTo(div_left)
    }
    else {
        if (link != null)
            link.appendTo(div_left)
    }


    div_father.append(div_left)

    //right part
    if (notification.showCloseIcon) {
        let div_right = $('<div class="notification-right"></div>')
        let close_icon_css = $.extend({},notficationJS_getDefaultsStylesCloseIcon(),notification_user.closeIconStyles)
        let close_icon = $('<div></div>')
        let close_icon_bar1 = $('<div></div>').css(close_icon_css)
        let close_icon_bar2 = $('<div></div>').css(close_icon_css)
        close_icon
            .append(close_icon_bar1.css("transform","rotate(45deg)"))
            .append(close_icon_bar2.css("transform","rotate(-45deg)"))

        close_icon.click(function() {
            div_father.fadeOut(anim_t)
            setTimeout(function() {
                div_father.remove()
            }, anim_t + 100)
        })
        close_icon.appendTo(div_right)
        div_right.css({
            "margin": "0 0 0 15px",
            "cursor": "pointer"
        })
        div_father.append(div_right)
    }

    //Show

    if (!($('.notification-panel').length)) {
        let notification_panel = $('<div class="notification-panel"></div>')
        $('body').append(notification_panel)
    }

    let anim_t = notification.animation_duration * 1000
    if (notification.newestOnTop) {
        $('.notification-panel').prepend(div_father).fadeOut(0).fadeIn(anim_t)
    }
    else {
        $('.notification-panel').append(div_father).fadeOut(0).fadeIn(anim_t)
    }

    if (notification.hide) {
        let display_t = notification.time * 1000
        //Hide            
        setTimeout(function() {
            div_father.fadeOut(anim_t)
        }, display_t)

        //destroy
        setTimeout(function() {
            div_father.remove()
        }, display_t + anim_t + 100)
    }

}
