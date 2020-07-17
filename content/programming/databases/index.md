---
author: "gbmhunter"
categories: [ "Electronics", "Databases" ]
date: 2020-07-14
description: "Code examples for MariaDB."
draft: false
lastmod: 2020-07-14
tags: [ "electronics", "databases", "MariaDB", "SQL", "table", "PostgreSQL", "inheritance", "object-orientated databases" ]
title: "Databases"
type: "page"
---

{{% warning-is-notes %}}

## MariaDB

To change the position of a column:

```
ALTER TABLE tbl_name MODIFY COLUMN col_name column_definition AFTER col_name;
```

More info at <https://mariadb.com/kb/en/alter-table/>.

## PostgreSQL

PostgreSQL is a _object-orientated_ database. The main feature of a _object-orientated_ database is that tables can inherit from other tables, which means they automatically get all the data columns of the table they inherit from (similar to object inheritance in _object-orientated_ programming languages).

Inheritance is defined when creating tables with the `INHERITS` clause with the `CREATE TABLE` statement:

```sql
CREATE TABLE people (
    name            text,
    age             int
);

CREATE TABLE student (
    student_id      text,
) INHERITS (people);
```

If a table already exists, you can inheritance via the `INHERIT` variant of the `ALTER TABLE` statement.