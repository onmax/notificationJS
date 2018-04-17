checkErrors = function (notification){
    if (!window.jQuery) {
        console.error("NotificationJS: needs jQuery in order to work. You can import it here: https://code.jquery.com/jquery-3.3.1.min.js")
        return 0
    }

    if(notification.status == undefined){
        notification.status = 'info'
    }

    if(notification.title == undefined){
        notification.title = 'TITLE UNDEFINED'
        console.error("NotificationJS: You need to set a title.")
    }

    if(notification.link != undefined){
        if(notification.link.href == undefined)
            console.error("NotificationJS: You need to set a link with href property")
    }
    if(notification.hide == undefined)
        notification.hide = true

    if(notification.time == undefined)
        notification.time = 5

    if(notification.animation_duration == undefined)
        notification.animation_duration = 0.2

    if(notification.canClose == undefined)
        notification.canClose = true
    return notification

}
newNotification = function(notification){
    if(notification == undefined){
        console.error("NotificationJS: You need to set a dictionary with at least a title property like this: ")
        console.error("NotificationJS: newNotification({\"title\":\"Your title goes here.\"})")
        return 0
    }
    notification = checkErrors(notification)
    let div_father = $(`<div class="notification-panel__item notification__${notification.status}"></div>`)

    
    //left part
    let div_left = $('<div class="notification-left"></div>')
    let div_title = $(`<div class="notification__title">${notification.title}</div>`)
    div_title.appendTo(div_left)

    let link = null
    if(notification.link){
        if(notification.link.href != undefined){
            link = $(`<a class="notification__link" href="${notification.link.href}"></a>`)
            if(notification.link.text == undefined){
                link.text(notification.link.href)
            }else{
                link.text(notification.link.text)
            }
        }
    }
    
    if (notification.description != undefined){
        let description
        if(link != null){
            description = $(`<div class="notification__description">${notification.description} </div>`)
            link.appendTo(description)
        }else{
            description = $(`<div class="notification__description">${notification.description}</div>`)            
        }

        description.appendTo(div_left)        
    }else{
        if(link != null)
            link.appendTo(div_left)
    }
    
    div_father.append(div_left)

    //right part
    if(notification.canClose){
        let div_right = $('<div class="notification-right"></div>')
        let close_icon = $('<img class="icon" src="icons/close-dark.svg" alt="Cerrar notificación"/>')
        close_icon.click(function(){
            div_father.fadeOut(anim_t)
            setTimeout(function(){
                div_father.remove()
            },anim_t)
        })
        close_icon.appendTo(div_right)
        div_father.append(div_right)
    }

    //Show
    let anim_t = notification.animation_duration * 1000
    let display_t = notification.time * 1000
    $('.notification-panel').prepend(div_father).fadeOut(0).fadeIn(anim_t)

    if(notification.hide){
        //Hide            
        setTimeout(function(){
            div_father.fadeOut(anim_t)
        },display_t)

        //destroy
        setTimeout(function(){
            div_father.remove()
        },display_t + anim_t)
    }

}
