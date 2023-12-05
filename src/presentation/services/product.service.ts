import { ProductModel } from "../../data";
import { CreateProductDto, CustomError, PaginationDto } from "../../domain";

export class ProductService {
  constructor() {}
  async createProduct(createProductDto: CreateProductDto) {
    const productExists = await ProductModel.findOne({
      name: createProductDto.name,
    });
    if (productExists)
      throw CustomError.badRequest("Product is already exists");

    try {
      const product = new ProductModel(createProductDto);
      await product.save();
      return product;
    } catch (error) {
      throw CustomError.internalServer(`Internal server ${error}`);
    }
  }

  async getProducts(paginationDto: PaginationDto) {
    const { limit, page } = paginationDto;
    try {
      const [total, products] = await Promise.all([
        ProductModel.countDocuments(),
        ProductModel.find()
          .skip((page - 1) * limit)
          .limit(limit)
          .populate("user")
          .populate("category"),
      ]);

      return {
        total,
        page,
        limit,
        products,
      };
    } catch (error) {
      throw CustomError.internalServer(`Internal server ${error}`);
    }
  }
}
