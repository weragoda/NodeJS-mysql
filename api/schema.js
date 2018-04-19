module.exports = (function () {
    global.registerSchema =  {
      "$id": "http://example.com/example.json",
      "type": "object",
      "definitions": {},
      "$schema": "http://json-schema.org/draft-07/schema#",
      "properties": {
        "teacher": {
          "$id": "/properties/teacher",
          "type": "string",
          "title": "The Teacher Schema ",
          "default": "",
          "examples": [
            "teacherken@gmail.com"
          ]
        },
        "students": {
          "$id": "/properties/students",
          "type": "array",
          "items": {
            "$id": "/properties/students/items",
            "type": "string",
            "title": "The 0th Schema ",
            "default": "",
            "examples": [
              "studentjon@example.com"
            ]
          }
        }
      }
    };

    global.suspendSchema = {
      "$id": "http://example.com/example.json",
      "type": "object",
      "definitions": {},
      "$schema": "http://json-schema.org/draft-07/schema#",
      "properties": {
        "student": {
          "$id": "/properties/student",
          "type": "string",
          "title": "The Student Schema ",
          "default": "",
          "examples": [
            "dulsus@example.com"
          ]
        }
      }
    };

    global.notificationSchema = {
      "$id": "http://example.com/example.json",
      "type": "object",
      "definitions": {},
      "$schema": "http://json-schema.org/draft-07/schema#",
      "properties": {
        "teacher": {
          "$id": "/properties/teacher",
          "type": "string",
          "title": "The Teacher Schema ",
          "default": "",
          "examples": [
            "namal123www@gmail.com"
          ]
        },
        "notification": {
          "$id": "/properties/notification",
          "type": "string",
          "title": "The Notification Schema ",
          "default": "",
          "examples": [
            "Hello students! sassfdfkfdf dskf sdkf  @studentagnes@example.com @studentmiche@example.com @40@example.com @60@example.com"
          ]
        }
      }
    };
    
    return;
})();
