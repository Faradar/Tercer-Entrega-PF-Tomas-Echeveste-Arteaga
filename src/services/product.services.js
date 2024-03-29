import Services from "./class.services.js";
import { prodDao } from "../persistence/factory.js";
import { generateMockProduct } from "../utils/faker.js";
import ProductRepository from "../persistence/repository/product.repository.js";
const prodRepository = new ProductRepository();

export default class ProductService extends Services {
  constructor() {
    super(prodDao);
  }

  // getAllProducts is for the product.websocket
  async getAllProducts() {
    try {
      return await prodDao.getAllProducts();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getProducts(page, limit, sort, query) {
    try {
      return await prodDao.getProducts(page, limit, sort, query);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getCategories() {
    try {
      const categories = await prodDao.getCategories();
      return categories;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getProductById(id) {
    try {
      const prod = await prodDao.getProductById(id);
      if (!prod) throw new Error("Product not found");
      else return prod;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getDtoProductById(id) {
    try {
      const prod = await prodRepository.getDtoProductById(id);
      if (!prod) throw new Error("Product not found");
      else return prod;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateProductStock(productId, newStock) {
    try {
      // Perform validation or other business logic if needed
      if (newStock < 0) {
        throw new Error("Invalid stock value");
      }

      // Use the DAO to update the product stock
      const updatedProduct = await prodDao.updateProductStock(
        productId,
        newStock
      );

      return updatedProduct;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async generateMockProduct(amount = 100) {
    try {
      const products = [];
      for (let i = 0; i < amount; i++) {
        const product = generateMockProduct();
        products.push(product);
      }
      // const mock = await prodDao.create(products); // Uncomment if you want to store products in DB
      return products;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
