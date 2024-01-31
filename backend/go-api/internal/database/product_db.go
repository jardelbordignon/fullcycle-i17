package database

import (
	"database/sql"

	"github.com/jardelbordignon/fullcycle-i17/go-api/internal/entity"
)

type ProductDB struct {
	db *sql.DB
}

func NewProductDB(db *sql.DB) *ProductDB {
	return &ProductDB{db}
}

func (pd *ProductDB) GetProducts() ([]*entity.Product, error) {
	rows, err := pd.db.Query("SELECT id, name, description, price, category_id, image_url FROM products")

	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var products []*entity.Product

	for rows.Next() {
		var product entity.Product
		if err := rows.Scan(&product.ID, &product.Name, &product.Description, &product.Price, &product.CategoryID, &product.ImageURL); err != nil {
			return nil, err
		}
		products = append(products, &product)
	}

	return products, nil
}

func (pd *ProductDB) GetProduct(id string) (*entity.Product, error) {
	var product entity.Product

	err := pd.db.QueryRow("SELECT id, name, description, price, category_id, image_url FROM products WHERE id = $1", id).
		Scan(&product.ID, &product.Name, &product.Description, &product.Price, &product.CategoryID, &product.ImageURL)

	if err != nil {
		return nil, err
	}

	return &product, nil
}

func (pd *ProductDB) GetProductByCategoryID(categoryID string) ([]*entity.Product, error) {
	rows, err := pd.db.Query("SELECT id, name, description, price, category_id, image_url FROM products WHERE category_id = $1", categoryID)
	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var products []*entity.Product

	for rows.Next() {
		var product entity.Product

		if err := rows.Scan(&product.ID, &product.Name, &product.Description, &product.Price, &product.CategoryID, &product.ImageURL); err != nil {
			return nil, err
		}

		products = append(products, &product)
	}

	return products, nil
}

func (pd *ProductDB) CreateProduct(product *entity.Product) (*entity.Product, error) {
	_, err := pd.db.Exec(
		"INSERT INTO products (id, name, description, price, category_id, image_url) VALUES ($1, $2, $3, $4, $5, $6)",
		product.ID, product.Name, product.Description, product.Price, product.CategoryID, product.ImageURL)

	if err != nil {
		return nil, err
	}

	return product, nil
}

func (pd *ProductDB) UpdateProduct(product *entity.Product) (*entity.Product, error) {
	_, err := pd.db.Exec(
		"UPDATE products SET name = $1, description = $2, price = $3, category_id = $4, image_url = $5 WHERE id = $6",
		product.Name, product.Description, product.Price, product.CategoryID, product.ImageURL, product.ID)

	if err != nil {
		return nil, err
	}

	return product, nil
}

func (pd *ProductDB) DeleteProduct(id string) error {
	_, err := pd.db.Exec("DELETE FROM products WHERE id = $1", id)

	if err != nil {
		return err
	}

	return nil
}
