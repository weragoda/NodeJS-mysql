module.exports = (function () {

  const Sequelize = require('sequelize');

  const sequelize = new Sequelize('techmahindra', 'root', '1qaz2wsx', {
    host: "mydbserverinstance.cail6i8phwli.us-east-1.rds.amazonaws.com",
    port: 3306
  });

  sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  }).catch(err => {
    console.error('Unable to connect to the database:', err);
  });

  const User = sequelize.define('user', {
    email: {type: Sequelize.STRING},
    role:{type: Sequelize.STRING},
    suspend: {type: Sequelize.BOOLEAN}
  });

  const Membership = sequelize.define('teacher_membership', {
    teacher_id: {type: Sequelize.INTEGER},
    student_id: {type: Sequelize.INTEGER}
  });

  commonStudents = function(teacher){
    return User
    .findAll({ attributes: ['email']}).then(userList => {
      if (userList) {
        console.log(userList);
        return userList;
      }
      return userList;
    })
    .catch((err)=>{
      return console.error(err);
    });
  };

  // get students by id
  studentsbyIds = function(studentids){
    sudentidarray = [];
    studentids = studentids;
    return User
    .findAll({ where: { id: studentids } }).then(userList => {
      if (userList) {
        return userList;
      }
      return userList;
    })
    .catch((err)=>{
      return console.error(err);
    });
  };

  userExists = function(useremail){
    return User
    .findOne({ where: {email: useremail} }).then(user => {
      if (user) {
        return user;
      }
      return user;
    })
    .catch((err)=>{
      return console.error(err);
    });
  };

  userlistExists = function(useremail){
    return User
    .findAll({ where: {email: useremail} }).then(user => {
      if (user) {
        return user;
      }
      return user;
    })
    .catch((err)=>{
      return console.error(err);
    });
  };

  membershipExists = function(teacherid, studentid){
    return Membership
    .findOne({ where: {teacher_id: teacherid, student_id: studentid} }).then(member => {
      if (member) {
        return member;
      }
      return member;
    })
    .catch((err)=>{
      return console.error(err);
    });
  };

  registerUser = function(teacher,role){
    return User
    .sync({force: false}).then(() => {
      return User.create({
        email: teacher,
        role: role,
        suspend: false
      });
    });
  };

  teacherMembership = function(teacherid, studentid){
    return Membership
    .sync({force: false}).then(() => {
      return Membership.create({
        teacher_id: teacherid,
        student_id: studentid
      });
    });
  };

  

  studentsSuspend = function(req,res){
    return User
    .update({suspend: true },{where: {email: req.body.student, role:'student' }}).then(user => {
      if (user >= 1) {
        return user;
      }else
        return;
    })
  };

  retrieveNotifications = function(req, res){
      return Persistence.retrieveNotifications(req,res);
  };

  studentListforTeacher = function(teacherid){
    return Membership
    .findAll({ where: { teacher_id: teacherid } }).then(memberlist => {
      if (memberlist) {
        return memberlist;
      }else{
        return memberlist;
      }

    })
    .catch((err)=>{
      return console.error(err);
    });
  };

  registerBulkStudents = function(req,res){

  };

  return {
    registerUser: registerUser,
    teacherMembership: teacherMembership,
    commonStudents: commonStudents,
    userExists: userExists,
    registerBulkStudents: registerBulkStudents,
    membershipExists: membershipExists,
    studentsSuspend: studentsSuspend,
    retrieveNotifications: retrieveNotifications,
    studentListforTeacher: studentListforTeacher,
    studentsbyIds: studentsbyIds,
    userlistExists: userlistExists
  };

})();
