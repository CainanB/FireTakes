sequelize model:generate --name users --attributes username:string,password:string --force

sequelize model:generate --name reviews --attributes authorID:integer,stars:integer,text:string,albumID:string --force