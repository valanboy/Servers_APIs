const fs = require("fs");
const path = require("path");

const inventoryDB = path.join(__dirname, "../db", "inventory.json");

const delMethod = (req, res) => {
  fs.readFile(inventoryDB, "utf8", (err, data) => {
    const getId = req.new_body.id;

    if (err) {
      res.writeHead(404);
      res.write(err);
      res.end("An error occurred");
    }

    const dataObj = JSON.parse(data);

    const dataIndex = dataObj.findIndex((info) => info.id === getId);

    if (dataIndex === -1) {
      res.writeHead(404);
      res.end("Inventory with the specific id is not found");
      return;
    }

    dataObj.splice(dataIndex, 1);

    fs.writeFile(inventoryDB, JSON.stringify(dataObj), (err) => {
      if (err) {
        res.writeHead(500);
        res.end(
          JSON.stringify({
            message: "Internal Server Error. could not find the inventory data",
          })
        );
      }

      res.writeHead(200);
      res.end("Deleted Successfully");
    });
  });
};

module.exports = {
    delMethod,
};
