module.exports = (sequelize, DataTypes) => {
    const Posts = sequelize.define("Posts", {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  
    Posts.associate = (models) => {
        Posts.hasMany(models.Comments, {
          //foreignKey: "PostId",
          onDelete: "cascade"
        });

        Posts.hasMany(models.Likes, {
          //foreignKey: "PostId",
          onDelete: "cascade"
        });
      };

    return Posts;
  };
  