let users = [
  {
    id: "1",
    createdAt: "2021-05-31T10:59:02.663Z",
    name: "Don Hessel",
    avatar: "https://cdn.fakercloud.com/avatars/id835559_128.jpg",
  },
  {
    id: "2",
    createdAt: "2021-06-01T02:09:32.743Z",
    name: "Rudy McLaughlin",
    avatar: "https://cdn.fakercloud.com/avatars/naitanamoreno_128.jpg",
  },
  {
    id: "3",
    createdAt: "2021-05-31T07:10:14.018Z",
    name: "Dianne Beier",
    avatar: "https://cdn.fakercloud.com/avatars/theonlyzeke_128.jpg",
  },
  {
    id: "4",
    createdAt: "2021-05-31T23:52:35.521Z",
    name: "Natasha Schaden",
    avatar: "https://cdn.fakercloud.com/avatars/uxward_128.jpg",
  },
  {
    id: "5",
    createdAt: "2021-05-31T11:55:49.052Z",
    name: "Debbie Russel MD",
    avatar: "https://cdn.fakercloud.com/avatars/malgordon_128.jpg",
  },
  {
    id: "6",
    createdAt: "2021-05-31T16:23:08.597Z",
    name: "Gloria Douglas",
    avatar: "https://cdn.fakercloud.com/avatars/marcobarbosa_128.jpg",
  },
];
const http = require("http");
const server = http.createServer((req, res) => {
  console.log("Request received");
  if (req.url === "/users" && req.method === "GET") {
    res.setHeader("Content-Type", "application/json");
    res.write(JSON.stringify(users));
    res.statusCode = 200;
      res.end();
      return;
  }
  if (req.url === "/users" && req.method === "POST") {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
    });
    req.on("end", () => {
      let itemToAdd = JSON.parse(data);
      if (!itemToAdd.name || !itemToAdd.avatar) {
        res.statusCode = 400;
          res.end("invalid name or avatar");
          return;
      }
      itemToAdd.id = new Date().getTime();
      itemToAdd.createdAt = new Date();
      users.push(itemToAdd);
      res.end(
        `Data ${data} is successfully created at ${itemToAdd.createdAt} with ID: ${itemToAdd.id}`
      );
        res.statusCode = 203;
    });
    return;
  }
  if (req.url.substring(0, 6) === "/user/" && req.method === "DELETE") {
    console.log("delete request called");
    let itemToDelete = Number(req.url.substring(6));
    let users1 = users.filter((el) => Number(el.id) !== itemToDelete);
    if (users1.length === users.length) {
      res.statusCode = 403;
      res.end("There is no such user. Please check the id");
    } else {
      res.statusCode = 204;
      res.end("User successfully deleted");
    }
    }
    if (req.url === "/user" && req.method === "PUT") {
      let data = "";
      req.on("data", (chunk) => {
        data += chunk;
      });
      req.on("end", () => {
        let itemToAdd = JSON.parse(data);
        if (!itemToAdd.name || !itemToAdd.avatar) {
          res.statusCode = 400;
            res.end("invalid name or avatar");
            return;
        }
        itemToAdd.id = new Date().getTime();
        itemToAdd.createdAt = new Date();
        users.push(itemToAdd);
        res.end(
          `Data ${data} is successfully created at ${itemToAdd.createdAt} with ID: ${itemToAdd.id}`
        );
          res.statusCode = 203;
      });
      return;
    }
    res.end("Invalid endpoint");
    return;
  //req.url.match(/\d+/)
});
server.listen(8000, "localhost", () => {
  console.log("server is listening on 8000");
});
