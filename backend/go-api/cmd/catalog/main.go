package main

import (
	"database/sql"
	"fmt"
	"net/http"

	"github.com/go-chi/chi/middleware"
	"github.com/go-chi/chi/v5"
	"github.com/jardelbordignon/fullcycle-i17/go-api/internal/database"
	"github.com/jardelbordignon/fullcycle-i17/go-api/internal/service"
	"github.com/jardelbordignon/fullcycle-i17/go-api/internal/webserver"
	_ "github.com/lib/pq"
)

func main() {
	db, err := sql.Open("postgres", "postgres://postgres:docker@localhost:5432/fullcycle_i17?sslmode=disable")
	if err != nil {
		panic(err.Error())
	}

	err = db.Ping()
	if err != nil {
		panic(err.Error())
	}

	defer db.Close()

	fmt.Println("Connected to the PostgreSQL database!")

	categoryDB := database.NewCategoryDB(db)
	categoryService := service.NewCategoryService(*categoryDB)

	productDB := database.NewProductDB(db)
	productService := service.NewProductService(*productDB)

	webCategoryHandler := webserver.NewWebCategoryHandler(categoryService)
	webProductHandler := webserver.NewWebProductHandler(productService)

	// // category routes
	// http.HandleFunc("/categories", webCategoryHandler.GetCategories)
	// http.HandleFunc("/category", webCategoryHandler.GetCategory)
	// http.HandleFunc("/category", webCategoryHandler.CreateCategory)

	r := chi.NewRouter()

	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)

	r.Get("/categories", webCategoryHandler.GetCategories)
	r.Get("/category/{id}", webCategoryHandler.GetCategory)
	r.Post("/category", webCategoryHandler.CreateCategory)
	r.Put("/category/{id}", webCategoryHandler.UpdateCategory)
	r.Delete("/category/{id}", webCategoryHandler.DeleteCategory)

	r.Get("/products", webProductHandler.GetProducts)
	r.Get("/product/{id}", webProductHandler.GetProduct)
	r.Get("/product/category/{category_id}", webProductHandler.GetProductsByCategoryID)
	r.Post("/product", webProductHandler.CreateProduct)
	r.Put("/product/{id}", webProductHandler.UpdateProduct)
	r.Delete("/product/{id}", webProductHandler.DeleteProduct)

	port := ":8080"

	fmt.Println("🚀 Server is running at port", port)
	http.ListenAndServe(port, r)
}
