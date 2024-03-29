import config from "../config/config.js";
import { __dirname } from "../utils/utils.js";
import logger from "../utils/logger.js";

// MongoDB
import CartDaoMongoDB from "./daos/mongodb/cart/cart.dao.js";
import ChatDaoMongoDB from "./daos/mongodb/chat/chat.dao.js";
import ProductDaoMongoDB from "./daos/mongodb/product/product.dao.js";
import TicketDaoMongoDB from "./daos/mongodb/ticket/ticket.dao.js";
import UserDaoMongoDB from "./daos/mongodb/user/user.dao.js";
import { ConnectMongoDB } from "../config/connection.js";

// Filesystem
import CartDaoFS from "./daos/filesystem/cart.dao.js";
import ProductDaoFS from "./daos/filesystem/product.dao.js";

let cartDao;
let chatDao;
let prodDao;
let ticketDao;
let userDao;
// let persistence = process.argv[2];
const persistence = config.PERSISTENCE;

switch (persistence) {
  case "FS":
    cartDao = new CartDaoFS(__dirname + "/daos/filesystem/data/carts.json");
    prodDao = new ProductDaoFS(
      __dirname + "/daos/filesystem/data/products.json"
    );
    logger.info(`Persistence is : ${persistence}`);
    break;
  case "MONGO":
    ConnectMongoDB.getInstance();
    cartDao = new CartDaoMongoDB();
    chatDao = new ChatDaoMongoDB();
    prodDao = new ProductDaoMongoDB();
    ticketDao = new TicketDaoMongoDB();
    userDao = new UserDaoMongoDB();
    logger.info(`Persistence is : ${persistence}`);
    break;
  default:
    ConnectMongoDB.getInstance();
    cartDao = new CartDaoMongoDB();
    chatDao = new ChatDaoMongoDB();
    prodDao = new ProductDaoMongoDB();
    ticketDao = new TicketDaoMongoDB();
    userDao = new UserDaoMongoDB();
    logger.info("Persistence is : MONGO");
    break;
}

export { cartDao, chatDao, prodDao, ticketDao, userDao };
