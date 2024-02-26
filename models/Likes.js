module.exports = (sequelize, DataTypes) => {
    const Likes = sequelize.define("Likes");
    // Users.associate = (models) => {
    //     Users.hasMany(models.Posts, {
    //         onDelete: "cascade"
    //     })
    // };
  
    return Likes;
  };