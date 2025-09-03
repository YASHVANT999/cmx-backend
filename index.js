const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const { mongoDb } = require("./config/mongodb");
dotenv.config();
const authToken = require("./middleware/authTokenCkeck");
const http = require("http"); // Require HTTP module
const socketIo = require("socket.io"); // Require Socket.io
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const YAML = require('yaml');

mongoDb();

const app = express();
const server = http.createServer(app); // Create an HTTP server using Express app
const io = socketIo(server, {
  cors: {
    origin: "*", // Allow requests from this origin
    // origin: process.env.FRONT_LINK, // Allow requests from this origin
    // methods: ["GET", "POST"], // Allow only GET and POST methods
  },
}); // Initialize Socket.io and pass the HTTP server
app.use(cors({ origin: process.env.FRONT_LINK }));
app.use(express.static("public"));
app.use(express.json());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.post("/api/auth/check", authToken);

app.use("/user", require("./routes/userRouter"));
app.use("/shop", require("./routes/shopRouter"));
app.use("/customer", require("./routes/customerRouter"));
app.use("/customerVehical", require("./routes/customerVehicalRouter"));
app.use("/estimateProfile", require("./routes/estimateProfileRouter"));
app.use("/shopRates", require("./routes/shopRateRouter"));
app.use("/customerSettings", require("./routes/customerSettingsRoutes"));
app.use("/customerComments", require("./routes/customerCommentsRouter"));
app.use("/customerChatLink", require("./routes/customerChatLinkRouter"));
app.use("/customerSignature", require("./routes/customerSignatureRouter"));
app.use("/estimateChatLink", require("./routes/estimateChatLinkRouter"));
app.use("/staff", require("./routes/staffRouter"));
app.use("/insurance", require("./routes/insuranceRouter"));
app.use("/production", require("./routes/productionRouter"));
app.use("/folderxDates", require("./routes/folderxDatesRouter"));
app.use("/payment", require("./routes/paymentRouter"));
app.use("/document", require("./routes/documentsRouter"));
app.use("/vendor", require("./routes/vendorRouter"));
app.use("/repairOrder", require("./routes/repairOrderRouter"));
app.use("/shopDefaultComments", require("./routes/defaultShopCommentsRouter"));
app.use("/estimateStage", require("./routes/estimateStageRouter"));
app.use("/api", require("./routes/docsToPdfRouter"));
app.use(
  "/repairOrderProduction",
  require("./routes/repairOrderProductionRouter")
);
app.use("/estimateAppoinment", require("./routes/estimateAppoinmentRouter"));
app.use("/staff-permissions", require("./routes/staffPermissionRouter"));

// Serve swagger.yaml at /swagger.yaml
app.use('/swagger.yaml', express.static(path.join(__dirname, 'swagger.yaml')));

// Read and parse the swagger.yaml file
const swaggerFile = fs.readFileSync(path.join(__dirname, 'swagger.yaml'), 'utf8');
const swaggerDocument = YAML.parse(swaggerFile);

// Serve Swagger UI at /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Create maps to store the association between socket IDs and user IDs
const customerSockets = new Map();
const shopSockets = new Map();

// Socket.io event handling
io.on("connection", (socket) => {
  console.log("A user connected with socket id:", socket.id);

  // Handle customer connection
  socket.on("customerConnect", (customerId) => {
    console.log("Customer connected with ID:", customerId);
    customerSockets.set(customerId, socket.id);
  });

  // Handle shop connection
  socket.on("shopConnect", (shopId) => {
    console.log("Shop connected with ID:", shopId);
    shopSockets.set(shopId, socket.id);
  });

  // Handle messages sent from customer to shop
  socket.on("customerMessage", (data) => {
    const { recieverId, message, estimateToken } = data;
    const shopSocketId = shopSockets.get(recieverId);
    if (shopSocketId) {
      io.to(shopSocketId).emit("customerMessage", { message, estimateToken });
    } else {
      console.log("Shop is not connected.");
    }
  });

  // Handle messages sent from shop to customer
  socket.on("shopMessage", (data) => {
    const { recieverId, message } = data;
    const customerSocketId = customerSockets.get(recieverId);
    if (customerSocketId) {
      io.to(customerSocketId).emit("shopMessage", message);
    } else {
      console.log("Customer is not connected.");
    }
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected with socket id:", socket.id);

    // Remove customer ID if disconnected
    for (const [customerId, socketId] of customerSockets.entries()) {
      if (socketId === socket.id) {
        console.log("Customer disconnected with ID:", customerId);
        customerSockets.delete(customerId);
        break;
      }
    }

    // Remove shop ID if disconnected
    for (const [shopId, socketId] of shopSockets.entries()) {
      if (socketId === socket.id) {
        console.log("Shop disconnected with ID:", shopId);
        shopSockets.delete(shopId);
        break;
      }
    }
  });
});

const PORT = 8001 || process.env.PORT;
// listen server
server.listen(PORT, '0.0.0.0', () => {
  console.log(`server is running on ${PORT}`);
});
