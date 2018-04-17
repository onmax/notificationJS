# notificationJS
1º You need to import jQuery. You can do it [here](https://code.jquery.com/jquery-3.3.1.min.js) <br />
2º Import JS script <br />
3º You can try with: <br />
```
  newNotification({
    "title":"NotificationJS test!"
  })
```

## You can add more parameters
```
newNotification({
    "title":"Another NotificationJS test!",                     //Mandatory
    "status":["info" | "error" | "ok" ],                        //Optional. Info by default.
    "description":"Small description about the notification",   //Optional. None by default.    
    "link":{                                                    //Optional. None by default.
        "href":"http://google.es",                              //Mandatory if you use link parameter. None by default. 
        "text":"I'm a link"                                     //Optional. href link by default.
    },
    "time":5,                                                   //Optional. In seconds. 5 seconds by default.
    "hide":true,                                                //Optional. True by default
    "animation_duration":0.2,                                   //Optional. 0.2 seconds by default
    "showCloseIcon": false,                                     //Optional. True by default
    "debug": true                                               //Optional. True by default
})
```

#### time
How long your notification will last?<br />
Values: Positives integers or doubles


#### hide
Will your notification last forever? <br />
Values: [ true | false ]

#### showCloseIcon
Will your notification close? <br />
Values: [ true | false ]

#### debug
Do you want to see logs, errors, info in the console of the browser? <br />
Values: [ true | false ]

