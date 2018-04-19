module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define('user', {
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });


    return User;
};