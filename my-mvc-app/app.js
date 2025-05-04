const Routes = require("./routes/userRoutes");

console.log("All users:");
console.log(Routes.showAllUsers());

console.log("\nSingle user:");
console.log(Routes.showUserById(2));
