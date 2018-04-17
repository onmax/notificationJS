function init(){
    if (!window.jQuery) {
        if(notification.debug){
            console.warn("NotificationJS: needs jQuery in order to work. It has been automatic loaded.")
            console.warn("You can import it here: https://code.jquery.com/jquery-latest.min.js")
        }
        var jQuery = document.createElement('script');

        jQuery.src = "https://code.jquery.com/jquery-latest.min.js";
        document.head.appendChild(jQuery);

        return 0
    }
}

checkErrors = function (notification){
    if(!notification.debug)
        notification.debug = true
    if (!window.jQuery) {
        if(notification.debug){
            console.warn("NotificationJS: needs jQuery in order to work. It has been automatic loaded.")
            console.warn("You can import it here: https://code.jquery.com/jquery-latest.min.js")
        }
        var jQuery = document.createElement('script');

        jQuery.src = "https://code.jquery.com/jquery-latest.min.js";
        document.head.appendChild(jQuery);

        return 0
    }
    if(!notification.title){
        notification.title = 'TITLE UNDEFINED'
        if(notification.debug){
            console.warn("NotificationJS: You need to set a title.")
        }
    }

    if(notification.link){
        if(!notification.link.href)
            if(notification.debug){
                console.error("NotificationJS: You need to set a link with href property")
            }
    }
    
    
    return notification

}
notficationJS_getDefaults = function(){
    return {                   
        "status":"info",   
        "time":5,                                                 
        "hide":true,                                                
        "animation_duration":0.2,                                   
        "showCloseIcon": true,                                     
        "newestOnTop": true,                                       
        "debug": true                                               
    }
}
newNotification = function(notification){
    if(!notification){
        console.error("NotificationJS: You need to set a map with at least a title property like this: ")
        console.error("NotificationJS: newNotification({\"title\":\"Your title goes here.\"})")
        return 0
    }
    console.log(2)
    checkErrors(notification)
    notification = $.extend({},notficationJS_getDefaults(),notification)
    console.log(notification)
    let div_father = $(`<div class="notification-panel__item notification__${notification.status}"></div>`)

    
    //left part
    let div_left = $('<div class="notification-left"></div>')
    let div_title = $(`<div class="notification__title">${notification.title}</div>`)
    div_title.appendTo(div_left)

    let link = null
    if(notification.link){
        if(notification.link.href){
            link = $(`<a class="notification__link" href="${notification.link.href}"></a>`)
            if(notification.link.text == undefined){
                link.text(notification.link.href)
            }else{
                link.text(notification.link.text)
            }
        }
    }
    
    if (notification.description){
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
    if(notification.showCloseIcon){
        let div_right = $('<div class="notification-right"></div>')
        let close_icon = $('<img class="notification_icon" src="examples/close.svg" alt="Close"/>')
        close_icon.click(function(){
            div_father.fadeOut(anim_t)
            setTimeout(function(){
                div_father.remove()
            },anim_t + 100)
        })
        close_icon.appendTo(div_right)
        div_father.append(div_right)
    }

    //Show
    
    if(!($('.notification-panel').length)){
        let notification_panel = $('<div class="notification-panel"></div>')
        $('body').append(notification_panel)
    }

    let anim_t = notification.animation_duration * 1000
    if(notification.newestOnTop){
        $('.notification-panel').prepend(div_father).fadeOut(0).fadeIn(anim_t)        
    }else{
        $('.notification-panel').append(div_father).fadeOut(0).fadeIn(anim_t)        
    }

    if(notification.hide){
        let display_t = notification.time * 1000
        //Hide            
        setTimeout(function(){
            div_father.fadeOut(anim_t)
        },display_t)

        //destroy
        setTimeout(function(){
            div_father.remove()
        },display_t + anim_t + 100)
    }

}
