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
    "canClose": false                                           //Optional. True by default
})
```

#### time
how long your notification will last?.
Values: Positives integers or doubles


#### hide
It is your notification will last forever?. 
Values: [ true | false ]

#### canClose
Will your notification close?. 
Values: [ true | false ]
