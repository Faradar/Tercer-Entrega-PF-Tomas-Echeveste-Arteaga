import ProductService from "./product.services.js";
const service = new ProductService();
import CartService from "./cart.services.js";
const cartService = new CartService();
import UserService from "./user.services.js";
const userService = new UserService();

export default class ViewService {
  async getAllProducts() {
    try {
      return await service.getAllProducts();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getProducts(page, limit, sort, query) {
    try {
      return await service.getProducts(page, limit, sort, query);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getCategories() {
    try {
      const categories = await service.getCategories();
      return categories;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getProductById(id) {
    try {
      return await service.getProductById(id);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getCartById(id) {
    try {
      return await cartService.getCartById(id);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getUsers() {
    try {
      return await userService.getDtoUsers();
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
