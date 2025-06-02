import { prisma } from "../utils/prismaClient";

// Criar um documento referente aquela loja que irá alimentar com alguns padrões de product_id e seu product_name referente. 
// fazer uma validacao entre o documento recebido com o documento com os valores alimentados, 
// caso n exista algum valor do documento recebido nele, adiciona-lo, caso tenha verificar se o product_id e o product_name é igual. 
// caso o product_name ou product_id já exista, retorne uma sugestão para o usuário altera-lo para o nome e id já existente.

export class ProductsService {
    private static instance: ProductsService;
    private readonly prisma: typeof prisma;

    private constructor() { 
        this.prisma = prisma;
    }

    static getInstance(): ProductsService {
        if (!ProductsService.instance) {
            ProductsService.instance = new ProductsService();
        }
        return ProductsService.instance;
    }

    async getProducts(): Promise<{
        id: string;
        name: string;
        storeId: string;
    }[]> {
        const products = await this.prisma.product.findMany();
        return products;
    };

    async createProduct(product: { 
        id: string,
        name: string, 
        storeId: string 
    }) {
        const newProduct = await this.prisma.product.create({
            data: {
                id: product.id,
                name: product.name,
                store: {
                    connect: { id: product.storeId }
                }
            }
        });
        return newProduct;
    };

    async updateProducts(
        product_id: string,
        product_name: string,
        storeId: string
    ) {
        const existingProduct = await this.existingProduct(product_id, storeId);

        if (existingProduct) {
            return existingProduct;
        }

        // Load products from products.json
        const products = await this.getProducts();

        console.log(products);

        // Match products from products.json with products from the receipt
        // If dont exist the product, add it to the list with the product_id and product_name
    };

    async existingProduct(
        product_id: string,
        storeId: string
    ) {
        const existingProduct = await this.prisma.product.findUnique({
            where: {
                id: product_id,
                storeId: storeId
            },
        });

        return existingProduct;
    };

    async findByIdOrName(product_id: string, product_name: string, storeId: string) {
        const product = await this.prisma.product.findFirst({
            where: {
                OR: [
                    { id: product_id },
                    { name: product_name }
                ],
                storeId: storeId
            }
        })

        return !!product; // Return a boolean value
    }
};

export const productsService = ProductsService.getInstance();