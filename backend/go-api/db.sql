-- postgres table categories
CREATE TABLE categories (
  id varchar(36) NOT NULL,
  name varchar(100) NOT NULL,
  primary key (id)
)

CREATE TABLE products (
  id varchar(36) NOT NULL,
  name varchar(100) NOT NULL,
  description varchar(255) NOT NULL,
  price numeric(10,2) NOT NULL,
  category_id varchar(36) NOT NULL,
  primary key (id),
  foreign key (category_id) references categories(id)
)