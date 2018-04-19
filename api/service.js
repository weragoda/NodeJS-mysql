'use strict';

module.exports = (function () {

    const Persistence = require('./persistence');
    const UserModel = require('./models/user.model');

    registerUser = function(req,res){
      console.log('registerUser - service method invoked');
      var teacherId = -1;
      Persistence.userExists(req.body.teacher)
      .then((user) => {
        if (user) {
          return registerBulkStudents(user.id, req, res);
        }
        else{
          Persistence.registerUser(req.body.teacher,'teacher')
            .then((user) => {
              return registerBulkStudents(user.id, req, res);
          });
        }
      });
    };

    registerBulkStudents = function(teacherid, req, res){
      console.log('registerBulkStudents - service method invoked');
      var users = [];
      users = req.body.students;

      users.forEach(function(user) {
        Persistence.userExists(user)
        .then((student) => {
            if (student) {
              Persistence.membershipExists(teacherid, student.id)
              .then((member) => {
                if (member){
                  res.status(500).json({status:'membership already exists'});
                }
                else{
                  Persistence.teacherMembership(teacherid, student.id)
                  .then((member) => {
                    if (member){
                      res.status(204).json({status:'success'});
                    }
                    else{
                      res.status(500).json({status:'Bad request'});
                    }
                  });
                }
              });
            }
            else{
          Persistence.registerUser(user,'student')
          .then((student) => {
            if(student){
                  Persistence.teacherMembership(teacherid, student.id)
                  .then((member) => {
                    if (member){
                      res.status(204).json({status:'success'});
                    }
                    else{
                      res.status(500).json({status:'Bad request'});
                    }
                  });
                }
              });
            }
        });
      });
    };

    studentsSuspend = function(req, res){
      console.log('studentsSuspend - service method invoked');
       Persistence.studentsSuspend(req, res)
       .then((success) => {
          if (success){
            res.status(204).json({status:'success'});
          }
          else{
            res.status(500).json({status:'Bad request'});
          }
       });
    };

    commonStudents = function(teacher, req, res){
      console.log('commonStudents - service method invoked');
      console.log(teacher);

      var studentlistarray = [];
      var studentemailarray = [];
      var teacherlistarray = [];

      Persistence.userlistExists(teacher)
        .then((teacherlist) => {
          if(teacherlist)
          {
            teacherlist.forEach(function(currentteacher) {
            teacherlistarray.push(currentteacher.id);
            });
            Persistence.studentListforTeacher(teacherlistarray)
            .then((studentlist) => {
              if (studentlist) {
                studentlist.forEach(function(currentuser) {
                  studentlistarray.push(currentuser.student_id);
                });
                var studentmergelist = arrayUnique(studentlistarray);
                Persistence.studentsbyIds(studentmergelist)
                .then((userlist) => {
                  if (userlist){
                    userlist.forEach(function(user){
                      studentemailarray.push(user.email);
                    });
                    res.send(JSON.stringify({ recipients : studentemailarray }));
                    }
                  });
                }
            });
          }
          else{
            res.status(500).json({status:'Bad request'});
          }        
      });
    };

    retrieveNotifications = function(req, res){
      var studentlistarray = [];
      var studentemailarray = [];
      Persistence.userExists(req.body.teacher)
        .then((teacher) => {
          if(teacher)
          {
            Persistence.studentListforTeacher(teacher.id)
            .then((studentlist) => {
              if (studentlist) {
                  studentlist.forEach(function(currentuser) {
                  studentlistarray.push(currentuser.student_id);
                });

                  console.log(studentlistarray);

                Persistence.studentsbyIds(studentlistarray)
                .then((userlist) => {
                  if (userlist){
                    userlist.forEach(function(user){
                      studentemailarray.push(user.email);
                    });

                    var emails = getMail(req.body.notification);
                    var mergelist =   arrayUnique(emails.concat(studentemailarray));
                    res.send(JSON.stringify({ recipients : mergelist }));
                  }
                });
              }
            });
          }
          else{
            var emails = getMail(req.body.notification);
            res.send(JSON.stringify({ recipients : emails }));
          }        
      });
    };

    function getMail ( text ){
      return text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
    }

    function arrayUnique(array) {
      var a = array.concat();
      for(var i=0; i<a.length; ++i) {
          for(var j=i+1; j<a.length; ++j) {
              if(a[i] === a[j])
                  a.splice(j--, 1);
          }
      }

      return a;
    }

    return {
        registerUser: registerUser,
        commonStudents: commonStudents,
        teacherMembership: teacherMembership,
        registerBulkStudents: registerBulkStudents,
        membershipExists: membershipExists,
        studentsSuspend: studentsSuspend,
        retrieveNotifications: retrieveNotifications
    };
})();
