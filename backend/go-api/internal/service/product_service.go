package service

import (
	"github.com/jardelbordignon/fullcycle-i17/go-api/internal/database"
	"github.com/jardelbordignon/fullcycle-i17/go-api/internal/entity"
)

type ProductService struct {
	ProductDB database.ProductDB
}

func NewProductService(productDB database.ProductDB) *ProductService {
	return &ProductService{ProductDB: productDB}
}

func (ps *ProductService) GetProducts() ([]*entity.Product, error) {
	products, err := ps.ProductDB.GetProducts()

	if err != nil {
		return nil, err
	}

	return products, nil
}

func (ps *ProductService) GetProduct(id string) (*entity.Product, error) {
	product, err := ps.ProductDB.GetProduct(id)

	if err != nil {
		return nil, err
	}

	return product, nil
}

func (ps *ProductService) GetProductByCategoryID(categoryID string) ([]*entity.Product, error) {
	products, err := ps.ProductDB.GetProductByCategoryID(categoryID)

	if err != nil {
		return nil, err
	}

	return products, nil
}

func (ps *ProductService) CreateProduct(name, description, category_id, image_url string, price float64) (*entity.Product, error) {
	product := entity.NewProduct(name, description, category_id, image_url, price)
	_, err := ps.ProductDB.CreateProduct(product)

	if err != nil {
		return nil, err
	}

	return product, nil
}

func (ps *ProductService) UpdateProduct(id, name, description, category_id, image_url string, price float64) (*entity.Product, error) {
	product := entity.NewProduct(name, description, category_id, image_url, price)
	product.ID = id

	_, err := ps.ProductDB.UpdateProduct(product)

	if err != nil {
		return nil, err
	}

	return product, nil
}

func (ps *ProductService) DeleteProduct(id string) error {
	err := ps.ProductDB.DeleteProduct(id)

	if err != nil {
		return err
	}

	return nil
}
