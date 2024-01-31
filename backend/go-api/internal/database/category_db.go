package database

import (
	"database/sql"

	"github.com/jardelbordignon/fullcycle-i17/go-api/internal/entity"
)

type CategoryDB struct {
	db *sql.DB
}

func NewCategoryDB(db *sql.DB) *CategoryDB {
	return &CategoryDB{db}
}

func (cd *CategoryDB) GetCategories() ([]*entity.Category, error) {
	rows, err := cd.db.Query("SELECT id, name FROM categories")

	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var categories []*entity.Category

	for rows.Next() {
		var category entity.Category
		if err := rows.Scan(&category.ID, &category.Name); err != nil {
			return nil, err
		}
		categories = append(categories, &category)
	}

	return categories, nil
}

func (cd *CategoryDB) GetCategory(id string) (*entity.Category, error) {
	var category entity.Category

	query := cd.db.QueryRow("SELECT id, name FROM categories WHERE id = $1", id)

	err := query.Scan(&category.ID, &category.Name)

	if err != nil {
		return nil, err
	}

	return &category, nil
}

func (cd *CategoryDB) CreateCategory(category *entity.Category) (string, error) {
	_, err := cd.db.Exec("INSERT INTO categories (id, name) VALUES ($1, $2)", category.ID, category.Name)

	if err != nil {
		return "", err
	}

	return category.ID, nil
}

func (cd *CategoryDB) UpdateCategory(category *entity.Category) (string, error) {
	_, err := cd.db.Exec("UPDATE categories SET name = $1 WHERE id = $2", category.Name, category.ID)

	if err != nil {
		return "", err
	}

	return category.ID, nil
}

func (cd *CategoryDB) DeleteCategory(id string) error {
	_, err := cd.db.Exec("DELETE FROM categories WHERE id = $1", id)

	if err != nil {
		return err
	}

	return nil
}
