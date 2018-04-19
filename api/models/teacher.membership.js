module.exports = function (sequelize, DataTypes) {
    var Membership = sequelize.define('teacher_membership', {
        teacher_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        student_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Suspended: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    });


    return Membership;
};